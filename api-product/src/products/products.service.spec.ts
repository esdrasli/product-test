import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';
import sqlite3 from 'sqlite3';

describe('ProductsService', () => {
  let service: ProductsService;
  let db: sqlite3.Database;
  let module: TestingModule;

  beforeAll(async () => {
    db = new sqlite3.Database(':memory:');
    db.serialize(() => {
      db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, quantity INTEGER)');
      db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', ['Product 1', 10.99, 100]);
      db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', ['Product 2', 15.99, 50]);
    });

    const prismaServiceMock = {}; // Mock vazio para o PrismaService

    module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterAll(() => {
    db.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll();
      expect(products).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product = await service.findOne(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct = { id: 3, name: 'New Product', price: 20.99, quantity: 75 };
      const createdProduct = await service.create(newProduct);
      expect(createdProduct).toBeDefined();
      expect(createdProduct.id).toBeDefined();
      expect(createdProduct.name).toBe(newProduct.name);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updatedProduct = { id: 1, name: 'Updated Product', price: 30.99, quantity: 125 };
      const result = await service.update(updatedProduct.id, updatedProduct);
      expect(result).toBeDefined();
      expect(result.id).toBe(updatedProduct.id);
      expect(result.name).toBe(updatedProduct.name);
    });
  });

  describe('remove', () => {
    it('should delete an existing product', async () => {
      await service.remove(1);
      const product = await service.findOne(1);
      expect(product).toBeNull();
    });
  });
});

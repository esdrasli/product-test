import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '.prisma/client';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [{ id: 1, name: 'Product 1', price: 10, quantity: 5 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      expect(await controller.findAll()).toBe(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product: Product = { id: 1, name: 'Product 1', price: 10, quantity: 5 };
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      expect(await controller.findOne('1')).toBe(product);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct: Product = {
        name: 'New Product', price: 20, quantity: 10,
        id: 0
      };
      const createdProduct: Product = { id: 2, ...newProduct };
      jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

      expect(await controller.create(newProduct)).toBe(createdProduct);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updatedProduct: Product = { id: 1, name: 'Updated Product', price: 30, quantity: 15 };
      jest.spyOn(service, 'update').mockResolvedValue(updatedProduct);

      expect(await controller.update('1', updatedProduct)).toBe(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should delete an existing product', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await expect(controller.remove('1')).resolves.toBeUndefined();
    });
  });
});

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '.prisma/client';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, quantity INTEGER)');
  db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', ['Product 1', 10.99, 100]);
  db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', ['Product 2', 15.99, 50]);
});

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, pageSize: number = 100): Promise<Product[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return new Promise<Product[]>((resolve, reject) => {
      db.all('SELECT * FROM products LIMIT ?, ?', [offset, limit], (err, rows: Product[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  

  async findOne(id: number): Promise<Product> {
    return new Promise<Product>((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row: Product) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  }

  async create(data: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [data.name, data.price, data.quantity], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...data });
      });
    });
  }

  async update(id: number, data: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      db.run('UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [data.name, data.price, data.quantity, id], function(err) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

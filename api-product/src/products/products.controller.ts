import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors    } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '.prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productsService.update(Number(id), product);
  }

  @Delete(':id')
  
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(Number(id));
  }
}

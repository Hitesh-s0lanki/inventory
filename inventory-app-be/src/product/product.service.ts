import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: Products) {
    return this.prisma.products.create({ data: createProductDto });
  }

  findAll(search?: string) {
    return this.prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { products } from './seedData/products';
import { expenseSummary } from './seedData/expenseSummary';
import { sales } from './seedData/sales';
import { salesSummary } from './seedData/salesSummary';
import { purchases } from './seedData/purchases';
import { purchaseSummary } from './seedData/purchaseSummary';
import { users } from './seedData/users';
import { expenses } from './seedData/expenses';
import { expenseByCategory } from './seedData/expenseByCategory';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello() {
    return 'Hello World!';
  }

  async seedData() {
    const modelNames = [
      'products',
      'expenseSummary',
      'sales',
      'salesSummary',
      'purchases',
      'purchaseSummary',
      'users',
      'expenses',
      'expenseByCategory',
    ];

    await this.deleteAllData(modelNames);

    await this.prisma.products.createMany({ data: products });
    await this.prisma.expenseSummary.createMany({ data: expenseSummary });
    await this.prisma.sales.createMany({ data: sales });
    await this.prisma.salesSummary.createMany({ data: salesSummary });
    await this.prisma.purchases.createMany({ data: purchases });
    await this.prisma.purchaseSummary.createMany({ data: purchaseSummary });
    await this.prisma.users.createMany({ data: users });
    await this.prisma.expenses.createMany({ data: expenses });
    await this.prisma.expenseByCategory.createMany({ data: expenseByCategory });

    return 'Hello World!';
  }

  async deleteAllData(modelNames: string[]) {
    for (const modelName of modelNames) {
      const model: any = this.prisma[modelName as keyof typeof this.prisma];
      if (model) {
        await model.deleteMany({});
        console.log(`Cleared data from ${modelName}`);
      } else {
        console.error(
          `Model ${modelName} not found. Please ensure the model name is correctly specified.`,
        );
      }
    }
  }
}

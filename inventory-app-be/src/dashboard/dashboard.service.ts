import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const popularProducts = await this.prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: 'desc',
      },
    });
    const salesSummary = await this.prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });
    const purchaseSummary = await this.prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });
    const expenseSummary = await this.prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });
    const expenseByCategorySummaryRaw =
      await this.prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      }),
    );

    return {
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    };
  }
}

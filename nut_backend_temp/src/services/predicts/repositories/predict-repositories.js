import { prisma } from '../../../lib/prisma.js';

class PredictRepositories {
  constructor() {
    this.prisma = prisma;
  }

  buildDateFilter(filter) {
    const now = new Date();
    if (filter === 'today') {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return { gte: start, lt: end };
    }
    if (filter === 'week') {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
      return { gte: start };
    }
    if (filter === 'month') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { gte: start };
    }
    return undefined;
  }

  async getPredictLogs(userId, skip, take, filter = 'all') {
    const where = { userId };
    const dateFilter = this.buildDateFilter(filter);
    if (dateFilter) {
      where.createdAt = dateFilter;
    }

    return await this.prisma.predictLog.findMany({
      where,
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getDataNutrition(foodName) {
    return await this.prisma.foodDictionary.findFirst({
      where: {
        foodName: {
          equals: foodName,
          mode: 'insensitive',
        },
      },
    });
  }

  async countPredictLogs(userId, filter = 'all') {
    const where = { userId };
    const dateFilter = this.buildDateFilter(filter);
    if (dateFilter) {
      where.createdAt = dateFilter;
    }

    return await this.prisma.predictLog.count({
      where,
    });
  }

  async createLog(data) {
    return await this.prisma.predictLog.create({
      data: {
        userId: data.userId,
        foodName: data.foodName,
        imageUrl: data.imageUrl,
        confidentScore: data.confidentScore,
        portion: data.portion,

        // Gizi Per Serving
        calorie: data.calorie,
        protein: data.protein,
        carbohydrate: data.carbohydrate,
        fat: data.fat,
        water: data.water,
        fiber: data.fiber,

        // Gizi Total (Per Serving * Portion)
        totalCalorie: data.totalCalorie,
        totalProtein: data.totalProtein,
        totalCarbohydrate: data.totalCarbohydrate,
        totalFat: data.totalFat,
        totalWater: data.totalWater,
        totalFiber: data.totalFiber,

        labelCategory: data.labelCategory,
        originRegion: data.originRegion,
      },
    });
  }
}

export default new PredictRepositories();

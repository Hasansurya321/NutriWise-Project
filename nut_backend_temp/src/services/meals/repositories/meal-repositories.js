import { prisma } from '../../../lib/prisma.js';

class MealRepositories {
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

  async getMeals(userId, skip, take, filter = 'all') {
    const where = { userId };
    const dateFilter = this.buildDateFilter(filter);
    if (dateFilter) {
      where.createdAt = dateFilter;
    }

    return await this.prisma.meal.findMany({
      where,
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async countMeals(userId, filter = 'all') {
    const where = { userId };
    const dateFilter = this.buildDateFilter(filter);
    if (dateFilter) {
      where.createdAt = dateFilter;
    }

    return await this.prisma.meal.count({
      where,
    });
  }

  async findMealByPredictLogId(predictLogId) {
    return await this.prisma.meal.findFirst({
      where: { predictLogId },
    });
  }

  async createMeal({ userId, foodName, imageUrl, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, water, fiber, confidentScore }) {
    return await this.prisma.meal.create({
      data: {
        foodName,
        imageUrl,
        mealType,
        portion: Number(portion),
        fat: Number(fat),
        carbohydrate: Number(carbohydrate),
        protein: Number(protein),
        calorie: Number(calorie),
        water: water != null ? Number(water) : null,
        fiber: fiber != null ? Number(fiber) : null,
        confidentScore: confidentScore ? Number(confidentScore) : null,
        totalCalorie: Number(calorie) * Number(portion),
        totalCarbohydrate: Number(carbohydrate) * Number(portion),
        totalFat: Number(fat) * Number(portion),
        totalProtein: Number(protein) * Number(portion),
        totalWater: water != null ? Number(water) * Number(portion) : null,
        totalFiber: fiber != null ? Number(fiber) * Number(portion) : null,
        user: {
          connect: { id: userId },
        },

        ...(predictLogId
          ? {
              predictLog: {
                connect: { id: predictLogId },
              },
            }
          : {}),
      },
    });
  }

  async updateMeal({ userId, mealId, foodName, imageUrl, mealType, portion, predictLogId, fat, carbohydrate, protein, calorie, water, fiber, confidentScore }) {
    return await this.prisma.meal.update({
      where: {
        id: mealId,
        userId: userId,
      },
      data: {
        foodName,
        imageUrl,
        mealType,
        portion: Number(portion),
        fat: Number(fat),
        carbohydrate: Number(carbohydrate),
        protein: Number(protein),
        calorie: Number(calorie),
        water: water != null ? Number(water) : null,
        fiber: fiber != null ? Number(fiber) : null,
        confidentScore: confidentScore ? Number(confidentScore) : null,
        totalCalorie: Number(calorie) * Number(portion),
        totalCarbohydrate: Number(carbohydrate) * Number(portion),
        totalFat: Number(fat) * Number(portion),
        totalProtein: Number(protein) * Number(portion),
        totalWater: water != null ? Number(water) * Number(portion) : null,
        totalFiber: fiber != null ? Number(fiber) * Number(portion) : null,

        ...(predictLogId
          ? {
              predictLog: {
                connect: { id: predictLogId },
              },
            }
          : {}),
      },
    });
  }

  async deleteMeal({ userId, mealId }) {
    return await this.prisma.meal.delete({
      where: {
        id: mealId,
        userId: userId,
      },
    });
  }
}

export default new MealRepositories();

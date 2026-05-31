import { prisma } from '../../../lib/prisma.js';
import { supabase } from '../../../lib/supabase-client.js';
import { formatMealResponse } from '../../../utils/index.js';
import response from '../../../utils/response.js';
import MealRepositories from '../repositories/meal-repositories.js';

export const getMeals = async (req, res, next) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const filter = req.query.filter || 'all';
  const skip = (page - 1) * limit;

  try {
    const [meals, totalMeals] = await Promise.all([MealRepositories.getMeals(userId, skip, limit, filter), MealRepositories.countMeals(userId, filter)]);

    const formattedMeals = meals.map((meal) => formatMealResponse(meal));

    const totalPages = Math.ceil(totalMeals / limit);

    return response(res, 200, 'Meals berhasil ditampilkan', {
      pagination: {
        currentPage: page,
        limit: limit,
        totalPages,
        totalData: totalMeals,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      meals: formattedMeals,
    });
  } catch (error) {
    return next(error);
  }
};

// Endpoint untuk create meal from predict log (hanya kirim predictLogId)
export const createMealFromPredict = async (req, res, next) => {
  const userId = req.user.id;
  const { predictLogId } = req.body;

  if (!predictLogId) {
    return response(res, 400, 'predictLogId is required');
  }

  try {
    // 1. Cek duplikasi: 1 predict log maksimal 1 meal
    const existingMeal = await MealRepositories.findMealByPredictLogId(predictLogId);
    if (existingMeal) {
      return response(res, 409, 'Meal already exists for this predict log');
    }

    // 2. Ambil data predict log
    const predictLog = await prisma.predictLog.findUnique({
      where: { id: predictLogId },
    });

    if (!predictLog) {
      return response(res, 404, 'Predict log not found');
    }

    // 3. Buat meal dari data predict log
    const meal = await MealRepositories.createMeal({
      userId,
      foodName: predictLog.foodName,
      imageUrl: predictLog.imageUrl,
      portion: predictLog.portion,
      predictLogId: predictLog.id,
      calorie: predictLog.calorie,
      protein: predictLog.protein,
      carbohydrate: predictLog.carbohydrate,
      fat: predictLog.fat,
      water: predictLog.water,
      fiber: predictLog.fiber,
      confidentScore: predictLog.confidentScore,
      mealType: null,
    });

    return response(res, 201, 'Meal berhasil ditambahkan', meal);
  } catch (error) {
    return next(error);
  }
};

export const createMeal = async (req, res, next) => {
  const userId = req.user.id;
  const { foodName, mealType, portion, imageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId } = req.validated;
  const imageFile = req.file;

  try {
    let finalImageUrl = imageUrl || null;

    if (imageFile) {
      const fileName = `-${userId}-${Date.now()}`;
      const filePath = `food/${fileName}`;

      const { data, error } = await supabase.storage.from('food-images').upload(filePath, imageFile.buffer, {
        contentType: imageFile.mimetype,
      });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('food-images').getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const meal = await MealRepositories.createMeal({
      userId,
      foodName,
      mealType,
      portion,
      imageUrl: finalImageUrl,
      fat,
      carbohydrate,
      protein,
      calorie,
      water,
      fiber,
      confidentScore: null,
      predictLogId: null,
    });

    if (!meal) {
      return next(new InvariantError('Gagal menambahkan meal'));
    }

    return response(res, 201, 'Meal berhasil ditambahkan', meal);
  } catch (error) {
    return next(error);
  }
};

export const updateMeal = async (req, res, next) => {
  const userId = req.user.id;
  const mealId = req.params.id;
  const { foodName, mealType, portion, imageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId } = req.validated;

  try {
    const meal = await MealRepositories.updateMeal({ userId, mealId, foodName, mealType, portion, imageUrl, fat, carbohydrate, protein, calorie, water, fiber, confidentScore, predictLogId });

    if (!meal) {
      return next(new InvariantError('Gagal memperbarui meal'));
    }

    return response(res, 200, 'Meal berhasil diperbarui', meal);
  } catch (error) {
    return next(error);
  }
};

export const deleteMeal = async (req, res, next) => {
  const userId = req.user.id;
  const mealId = req.params.id;

  try {
    const meal = await MealRepositories.deleteMeal({ userId, mealId });

    if (!meal) {
      return next(new InvariantError('Gagal menghapus meal'));
    }

    if (meal.imageUrl) {
      const imagePath = meal.imageUrl.split('/storage/v1/object/public/food-images/')[1];
      if (imagePath) {
        const { error } = await supabase.storage.from('food-images').remove([imagePath]);
        if (error) {
          console.error('Gagal menghapus gambar dari Supabase Storage:', error);
        }
      }
    }

    return response(res, 200, 'Meal berhasil dihapus', meal);
  } catch (error) {
    return next(error);
  }
};

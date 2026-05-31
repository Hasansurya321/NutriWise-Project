import { useState, useMemo } from 'react';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileSummaryCard from '../../components/profile/ProfileSummaryCard';
import ProfileTabs from '../../components/profile/ProfileTabs';

import PersonalInfoTab from '../../components/profile/PersonalInfoTab';
import HealthDataTab from '../../components/profile/HealthDataTab';
import NutritionGoalsTab from '../../components/profile/NutritionGoalsTab';

import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../context/AuthContext';

function validateProfile(data) {
  const errors = {};

  if (data.age !== undefined && data.age !== '' && data.age !== null && Number(data.age) <= 0) {
    errors.age = 'Umur harus lebih dari 0';
  }
  if (data.height !== undefined && data.height !== '' && data.height !== null && Number(data.height) <= 0) {
    errors.height = 'Tinggi harus lebih dari 0';
  }
  if (data.weight !== undefined && data.weight !== '' && data.weight !== null && Number(data.weight) <= 0) {
    errors.weight = 'Berat harus lebih dari 0';
  }
  if (data.gender !== undefined && data.gender !== 'male' && data.gender !== 'female') {
    errors.gender = 'Pilih jenis kelamin (Laki-laki / Perempuan)';
  }

  return errors;
}

function extractProfileData(user) {
  if (!user) return null;

  return {
    profile: {
      fullName: user.fullname || user.fullName || '',
      email: user.email || '',
      age: user.age ?? '',
      gender: user.gender || '',
      initials: (user.fullname || user.fullName || 'UN').substring(0, 2).toUpperCase(),
      memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : String(new Date().getFullYear()),
      totalScans: user.totalScans ?? 0,
      healthScore: user.healthScore ?? 0,
    },
    healthData: {
      height: user.height ?? '',
      weight: user.weight ?? '',
      activityLevel: user.activityLevel || 'Moderate',
      bmi: user.bmi ?? 0,
    },
    nutritionGoals: {
      calories: user.calorieTarget ?? '',
      protein: user.proteinTarget ?? '',
      carbs: user.carbohydrateTarget ?? '',
      fats: user.fatTarget ?? '',
      macroDistribution: user.macroDistribution || [],
    },
  };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { updateProfile, fetchProfile, isLoading: profileLoading, error: profileError } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [draftProfile, setDraftProfile] = useState(null);
  const [errors, setErrors] = useState({});

  const savedProfile = useMemo(() => extractProfileData(user), [user]);

  if (!savedProfile) {
    return <div className="py-8 text-center text-textSecondary">Memuat profil...</div>;
  }

  const displayProfile = isEditing && draftProfile ? draftProfile : savedProfile;

  const handleEdit = () => {
    setDraftProfile(JSON.parse(JSON.stringify(savedProfile)));
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setDraftProfile(null);
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = async () => {
    const data = draftProfile || savedProfile;

    const validationErrors = validateProfile({
      age: data.profile.age,
      gender: data.profile.gender,
      height: data.healthData.height,
      weight: data.healthData.weight,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const safeNumber = (val) => {
      if (val === '' || val === null || val === undefined) return 0;
      return Number(val);
    };

    const payload = {
      age: safeNumber(data.profile.age),
      gender: data.profile.gender,
      height: safeNumber(data.healthData.height),
      weight: safeNumber(data.healthData.weight),
      calorieTarget: safeNumber(data.nutritionGoals.calories),
      proteinTarget: safeNumber(data.nutritionGoals.protein),
      carbohydrateTarget: safeNumber(data.nutritionGoals.carbs),
      fatTarget: safeNumber(data.nutritionGoals.fats),
    };

    const result = await updateProfile(payload);
    if (result.success) {
      await fetchProfile(); // refetch from DB to ensure state is synced
      setIsEditing(false);
      setDraftProfile(null);
    }
  };

  const updateSectionField = (section, field, value) => {
    setDraftProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  if (profileLoading && !user) {
    return <div className="py-8 text-center text-textSecondary">Memuat profil...</div>;
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHeader isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />

        {profileError && <div className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">{profileError}</div>}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
          <ProfileSummaryCard profile={displayProfile.profile} />

          <div className="rounded-3xl border border-borderPrimary bg-card p-6">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Profile Details</h2>
              <p className="mt-2 text-textSecondary">Your personal information and health settings</p>
              <p className="mt-2 text-sm text-textMuted">Identity information is system-controlled and locked to maintain account consistency.</p>
            </div>

            <div className="mt-8">
              <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="mt-8">
              {activeTab === 'Personal Info' && <PersonalInfoTab data={displayProfile.profile} isEditing={isEditing} onFieldChange={(field, value) => updateSectionField('profile', field, value)} errors={errors} />}

              {activeTab === 'Health Data' && <HealthDataTab data={displayProfile.healthData} isEditing={isEditing} onFieldChange={(field, value) => updateSectionField('healthData', field, value)} />}

              {activeTab === 'Nutrition Goals' && <NutritionGoalsTab data={displayProfile.nutritionGoals} isEditing={isEditing} onFieldChange={(field, value) => updateSectionField('nutritionGoals', field, value)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileSummaryCard from '../../components/profile/ProfileSummaryCard';
import ProfileTabs from '../../components/profile/ProfileTabs';

import PersonalInfoTab from '../../components/profile/PersonalInfoTab';
import HealthDataTab from '../../components/profile/HealthDataTab';
import NutritionGoalsTab from '../../components/profile/NutritionGoalsTab';

import { profileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [savedProfile, setSavedProfile] = useState(null);
  const [draftProfile, setDraftProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSavedProfile(null);
      setDraftProfile(null);
      setIsLoading(false);
      return;
    }

    const structuredData = {
      profile: {
        fullName: user.fullname || 'User Name',
        email: user.email || 'user@example.com',
        age: user.age || 0,
        gender: user.gender || 'Unspecified',
        initials: (user.fullname || 'UN').substring(0, 2).toUpperCase(),
        memberSince: user.createdAt 
          ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
          : new Date().getFullYear(),
        totalScans: user.totalScans || 0,
        healthScore: user.healthScore || 0,
      },
      healthData: {
        height: user.height || 0,
        weight: user.weight || 0,
        activityLevel: user.activityLevel || 'Moderate',
        bmi: user.bmi || 0
      },
      nutritionGoals: {
        calories: user.calorieTarget || 0,
        protein: user.proteinTarget || 0,
        carbs: user.carbohydrateTarget || 0,
        fats: user.fatTarget || 0,
        macroDistribution: user.macroDistribution || []
      }
    };

    setSavedProfile(structuredData);
    setDraftProfile(structuredData);
    setIsLoading(false);
  }, [user]); 

  const identityLockedFields = {
    fullName: true,
    email: true,
  };

  const displayProfile = isEditing ? draftProfile : savedProfile;

  const handleEdit = () => {
    setDraftProfile(savedProfile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftProfile(savedProfile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        age: Number(draftProfile.profile.age),
        gender: draftProfile.profile.gender,
        height: Number(draftProfile.healthData.height),
        weight: Number(draftProfile.healthData.weight),
        calorieTarget: Number(draftProfile.nutritionGoals.calories),
        proteinTarget: Number(draftProfile.nutritionGoals.protein),
        carbohydrateTarget: Number(draftProfile.nutritionGoals.carbs),
        fatTarget: Number(draftProfile.nutritionGoals.fats),
      };

      const response = await profileAPI.updateProfile(payload);
      console.log(response)



      const updatedData = response?.data?.user;

      if (!updatedData) return;

      setUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setIsEditing(false);
    }
  };

  const updateSectionField = (section, field, value) => {
    if (section === 'profile' && identityLockedFields[field]) {
      return;
    }

    setDraftProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (isLoading || !displayProfile) {
    return <div className="py-8 text-center text-textSecondary">Loading profile...</div>;
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHeader isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />

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
              {activeTab === 'Personal Info' && (
                <PersonalInfoTab data={displayProfile.profile} isEditing={isEditing} identityLockedFields={identityLockedFields} onFieldChange={(field, value) => updateSectionField('profile', field, value)} />
              )}

              {activeTab === 'Health Data' && <HealthDataTab data={displayProfile.healthData} isEditing={isEditing} onFieldChange={(field, value) => updateSectionField('healthData', field, value)} />}

              {activeTab === 'Nutrition Goals' && <NutritionGoalsTab data={displayProfile.nutritionGoals} isEditing={isEditing} onFieldChange={(field, value) => updateSectionField('nutritionGoals', field, value)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileSummaryCard from '../../components/profile/ProfileSummaryCard';
import ProfileTabs from '../../components/profile/ProfileTabs';

import PersonalInfoTab from '../../components/profile/PersonalInfoTab';
import HealthDataTab from '../../components/profile/HealthDataTab';
import NutritionGoalsTab from '../../components/profile/NutritionGoalsTab';

import { profileData } from '../../data/profileData';

export default function ProfilePage() {
  const [savedProfile, setSavedProfile] = useState(profileData);

  const [draftProfile, setDraftProfile] = useState(profileData);

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState('Personal Info');

  /*
    ========================================
    SYSTEM-CONTROLLED IDENTITY FIELDS
    ========================================

    Berlaku untuk:
    - dummy account
    - real account
    - database account
    - production environment

    Identity fields dikunci untuk menjaga:
    - data consistency
    - nutrition analytics integrity
    - stable user identity mapping
  */

  const identityLockedFields = {
    fullName: true,
    email: true,
    age: true,
    gender: true,
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

  const handleSave = () => {
    setSavedProfile(draftProfile);
    setIsEditing(false);
  };

  const updateSectionField = (section, field, value) => {
    /*
      Prevent editing locked identity fields
    */

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

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHeader isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />

        <div
          className="
            grid grid-cols-1
            gap-6
            xl:grid-cols-[360px_1fr]
          "
        >
          <ProfileSummaryCard profile={displayProfile.profile} />

          <div
            className="
              rounded-3xl
              border border-borderPrimary
              bg-card
              p-6
            "
          >
            <div>
              <h2
                className="
                  text-2xl font-semibold
                  text-textPrimary
                "
              >
                Profile Details
              </h2>

              <p
                className="
                  mt-2
                  text-textSecondary
                "
              >
                Your personal information and health settings
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-textMuted
                "
              >
                Identity information is system-controlled and locked to maintain account consistency.
              </p>
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

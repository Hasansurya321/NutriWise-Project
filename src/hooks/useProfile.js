import { dummyProfile } from '../data/dummyProfile';

export function useProfile() {
  // nanti bisa diganti fetch API/database

  const profile = dummyProfile;

  return {
    profile,

    identityLockedFields: {
      fullName: true,
      email: true,
      age: true,
      gender: true,
    },
  };
}

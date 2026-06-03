import ProfileField from './ProfileField';
import { Select } from '../ui/select';
import { Input } from '../ui/input';

const genderOptions = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
];

export default function PersonalInfoTab({ data, isEditing, onFieldChange, errors = {} }) {
  const handleNumericChange = (field, rawValue) => {
    if (rawValue === '') {
      onFieldChange(field, '');
      return;
    }
    const parsed = Number(rawValue);
    if (!isNaN(parsed)) {
      onFieldChange(field, parsed);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Full Name */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-textPrimary">Nama Lengkap</label>
        <Input
          type="text"
          value={data.fullName || ''}
          readOnly={!isEditing}
          onChange={(e) => onFieldChange('fullName', e.target.value)}
          className={!isEditing ? 'border-borderPrimary bg-inputReadonly text-textSecondary' : 'border-borderStrong bg-input text-textPrimary'}
        />
        {errors.fullName && <p className="mt-1.5 text-xs text-danger">{errors.fullName}</p>}
      </div>

      {/* Email – always locked, shown for reference */}
      <div className="md:col-span-2">
        <ProfileField label="Alamat Email" value={data.email} isLocked={true} />
      </div>

      {/* Age */}
      <div>
        <label className="mb-2 block text-sm font-medium text-textPrimary">Umur</label>
        <Input
          type="number"
          value={data.age ?? ''}
          readOnly={!isEditing}
          onChange={(e) => handleNumericChange('age', e.target.value)}
          className={!isEditing ? 'border-borderPrimary bg-inputReadonly text-textSecondary' : 'border-borderStrong bg-input text-textPrimary'}
        />
        {errors.age && <p className="mt-1.5 text-xs text-danger">{errors.age}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="mb-2 block text-sm font-medium text-textPrimary">Jenis Kelamin</label>
        {isEditing ? (
          <Select
            options={genderOptions}
            placeholder="Pilih jenis kelamin"
            value={data.gender || ''}
            onChange={(val) => onFieldChange('gender', val)}
            error={errors.gender}
          />
        ) : (
          <Input
            type="text"
            value={data.gender === 'male' ? 'Laki-laki' : data.gender === 'female' ? 'Perempuan' : data.gender || ''}
            readOnly
            className="border-borderPrimary bg-inputReadonly text-textSecondary"
          />
        )}
        {errors.gender && <p className="mt-1.5 text-xs text-danger">{errors.gender}</p>}
      </div>
    </div>
  );
}

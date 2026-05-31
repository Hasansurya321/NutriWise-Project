import ProfileField from './ProfileField';
import { Select } from '../ui/select';
import { Input } from '../ui/input';

const genderOptions = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
];

export default function PersonalInfoTab({ data, isEditing, onFieldChange, errors = {} }) {
  const lockedFields = [
    { label: 'Full Name', field: 'fullName', value: data.fullName },
    { label: 'Email Address', field: 'email', value: data.email },
  ];

  const handleNumericChange = (field, rawValue) => {
    // Jika input kosong, kirim empty string (bukan 0) agar user bisa hapus angka
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
      {lockedFields.map((item) => (
        <ProfileField key={item.field} label={item.label} value={item.value} isLocked={true} />
      ))}

      <div>
        <label className="mb-2 block text-sm font-medium text-textPrimary">Age</label>
        <Input
          type="number"
          value={data.age ?? ''}
          readOnly={!isEditing}
          onChange={(e) => handleNumericChange('age', e.target.value)}
          className={!isEditing ? 'border-borderPrimary bg-inputReadonly text-textSecondary' : 'border-borderStrong bg-input text-textPrimary'}
        />
        {errors.age && <p className="mt-1.5 text-xs text-danger">{errors.age}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-textPrimary">Gender</label>
        {isEditing ? (
          <Select options={genderOptions} placeholder="Pilih jenis kelamin" value={data.gender || ''} onChange={(val) => onFieldChange('gender', val)} error={errors.gender} />
        ) : (
          <Input type="text" value={data.gender === 'male' ? 'Laki-laki' : data.gender === 'female' ? 'Perempuan' : data.gender || ''} readOnly className="border-borderPrimary bg-inputReadonly text-textSecondary" />
        )}
        {errors.gender && <p className="mt-1.5 text-xs text-danger">{errors.gender}</p>}
      </div>
    </div>
  );
}

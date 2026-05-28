import ProfileField from './ProfileField';

export default function PersonalInfoTab({ data, isEditing, onFieldChange }) {
  const lockedFields = [
    { label: 'Full Name', field: 'fullName', value: data.fullName },
    { label: 'Email Address', field: 'email', value: data.email },
  ];

  const editableFields = [
    { label: 'Age', field: 'age', value: data.age, type: 'number' },
    { label: 'Gender', field: 'gender', value: data.gender, type: 'text' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {lockedFields.map((item) => (
        <ProfileField
          key={item.field}
          label={item.label}
          value={item.value}
          isLocked={true}
        />
      ))}

      {editableFields.map((item) => (
        <ProfileField
          key={item.field}
          label={item.label}
          value={item.value}
          type={item.type}
          isEditing={isEditing}
          onChange={(val) => onFieldChange(item.field, val)}
        />
      ))}
    </div>
  );
}

import { Check, Pencil, X } from 'lucide-react';
import { Button } from '../ui/button';

export default function EditProfileButton({ isEditing, onEdit, onSave, onCancel }) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-3">
        <Button variant="destructive" size="default" onClick={onCancel}>
          <X size={16} />
          Batal
        </Button>

        <Button variant="outline" size="default" onClick={onSave}>
          <Check size={16} />
          Simpan
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="default" onClick={onEdit}>
      <Pencil size={16} />
      Edit Profil
    </Button>
  );
}

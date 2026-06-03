import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

export function DeleteConfirmDialog({ open, onClose, onConfirm, mealName }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      // error handled upstream
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isDeleting && onClose()}>
      <DialogContent className="w-[92%] max-w-sm rounded-3xl border border-borderPrimary bg-card p-6">
        <DialogTitle className="sr-only">Konfirmasi Hapus</DialogTitle>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <Trash2 size={24} />
          </div>
          <div>
            <p className="text-base font-semibold text-textPrimary">Hapus Makanan?</p>
            <p className="mt-1.5 text-sm text-textSecondary">
              <span className="font-medium text-textPrimary">{mealName}</span> akan dihapus secara permanen dari riwayatmu.
            </p>
          </div>
          <div className="flex w-full gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-danger hover:bg-danger/90 text-white border-danger"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <><Loader2 size={14} className="animate-spin" /> Menghapus…</>
              ) : (
                <><Trash2 size={14} /> Hapus</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

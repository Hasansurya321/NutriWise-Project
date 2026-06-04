import { useState, useEffect } from 'react';
import {
  Camera, Upload, Pencil, Loader2, CheckCircle2, X,
  Flame, Beef, Wheat, Droplets,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';
import { mealAPI } from '../../services/api';
import { useImagePredict } from '../../hooks/useImagePredict';
import { UploadSection } from '../predict/UploadSection';
import { CameraSection } from '../predict/CameraSection';
import PredictionResult from '../predict/PredictionResult';

const MEAL_TYPES = [
  { value: 'BREAKFAST', label: 'Sarapan' },
  { value: 'LUNCH', label: 'Makan Siang' },
  { value: 'DINNER', label: 'Makan Malam' },
  { value: 'SNACK', label: 'Camilan' },
];



function Field({ label, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
        {label}{required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function NumInput({ id, value, onChange, placeholder }) {
  return (
    <input
      id={id}
      type="number"
      min="0"
      step="any"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-borderPrimary bg-input px-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
    />
  );
}

const DEFAULT_FORM = {
  foodName: '',
  mealType: 'BREAKFAST',
  portion: '1',
  calorie: '',
  protein: '',
  carbohydrate: '',
  fat: '',
  servingSizeG: '',
  servingDescription: '',
};

export function MealFormModal({ open, onClose, onSuccess, editMeal = null, initialData = null }) {
  const isEdit = Boolean(editMeal);
  const [tab, setTab] = useState('upload');
  const [form, setForm] = useState(DEFAULT_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [predictionUsed, setPredictionUsed] = useState(false);

  const predict = useImagePredict();

  const availableTabs = [
    { id: 'upload', label: 'Upload Foto', icon: Upload },
    { id: 'camera', label: 'Kamera', icon: Camera },
    ...((predictionUsed || initialData) ? [{ id: 'manual', label: 'Preview Data', icon: Pencil }] : []),
  ];

  // EFFECT 1: Sinkronisasi data awal saat modal dibuka/ganti props
  useEffect(() => {
    if (open && editMeal) {
      const n = editMeal.nutrition || {};
      setForm({
        foodName: editMeal.foodName || '',
        mealType: editMeal.mealType || 'BREAKFAST',
        portion: String(editMeal.portion ?? 1),
        calorie: String(Math.round(n.calorie ?? 0)),
        protein: String(Number(n.protein ?? 0).toFixed(2)),
        carbohydrate: String(Number(n.carbohydrate ?? 0).toFixed(2)),
        fat: String(Number(n.fat ?? 0).toFixed(2)),
        servingSizeG: String(n.servingSizeG ?? ''),
        servingDescription: n.servingDescription || '',
      });
      setTab('manual');
      setImageFile(editMeal.imageUrl || null);
    } else if (open && initialData) {
      const n = initialData.nutrition || {};
      setForm({
        foodName: initialData.foodName?.replace(/_/g, ' ') || '',
        mealType: 'BREAKFAST',
        portion: String(initialData.portion ?? 1),
        calorie: String(Math.round(n.calorie ?? 0)),
        protein: String(Number(n.protein ?? 0).toFixed(2)),
        carbohydrate: String(Number(n.carbohydrate ?? 0).toFixed(2)),
        fat: String(Number(n.fat ?? 0).toFixed(2)),
        servingSizeG: String(n.servingSizeG ?? ''),
        servingDescription: n.servingDescription || '',
      });
      setTab('manual');
      setImageFile(initialData.imageUrl || null);
      setPredictionUsed(false);
      predict.handleReset();
    } else if (open && !editMeal && !initialData) {
      setForm(DEFAULT_FORM);
      setImageFile(null);
      setSubmitError('');
      setPredictionUsed(false);
      predict.handleReset();
      setTab('upload');
    }
  }, [open, editMeal, initialData]);

  // EFFECT 2: Auto-fill form ketika hasil prediksi AI berhasil didapatkan
  useEffect(() => {
    // Jika tidak ada hasil baru, atau data prediksi sudah pernah dimasukkan, hentikan!
    if (!predict.predictionResult || predictionUsed) return;

    const d = predict.predictionResult?.predict || predict.predictionResult;
    if (!d?.foodName) return;

    const n = d.nutrition || {};

    setForm((prev) => ({
      ...prev,
      foodName: d.foodName?.replace(/_/g, ' ') || prev.foodName,
      portion: String(d.portion ?? 1),
      calorie: String(Math.round(n.calorie ?? 0)),
      protein: String((n.protein ?? 0).toFixed(2)),
      carbohydrate: String((n.carbohydrate ?? 0).toFixed(2)),
      fat: String((n.fat ?? 0).toFixed(2)),
      servingSizeG: String(n.servingSizeG ?? ''),
      servingDescription: n.servingDescription || '',
    }));

    setImageFile(d.imageUrl || predict.file);
    setPredictionUsed(true); // Tandai bahwa form sudah auto-fill via AI
    setTab('manual');

  }, [predict.predictionResult, predictionUsed]);

  function setField(key) {
    return (val) => setForm((p) => ({ ...p, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');

    if (!form.foodName.trim()) {
      setSubmitError('Nama makanan wajib diisi.');
      return;
    }
    if (!form.calorie) {
      setSubmitError('Kalori wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('foodName', form.foodName.trim());
      fd.append('mealType', form.mealType);
      fd.append('portion', form.portion || '1');
      fd.append('calorie', form.calorie);
      fd.append('protein', form.protein || '0');
      fd.append('carbohydrate', form.carbohydrate || '0');
      fd.append('fat', form.fat || '0');
      if (form.servingSizeG) fd.append('servingSizeG', form.servingSizeG);
      if (form.servingDescription) fd.append('servingDescription', form.servingDescription);

      if (!isEdit && initialData?.id) {
        fd.append('predictLogId', initialData.id);
      } else if (!isEdit && predict.predictionResult) {
        const d = predict.predictionResult?.predict || predict.predictionResult;
        if (d?.id) {
          fd.append('predictLogId', d.id);
        }
      }

      if (imageFile instanceof File) {
        fd.append('image', imageFile);
      } else if (typeof imageFile === 'string') {
        fd.append('imageUrl', imageFile);
      } else if (predict.file) {
        fd.append('image', predict.file);
      }

      if (isEdit) {
        await mealAPI.updateMeal(editMeal.id, fd);
      } else {
        await mealAPI.createMeal(fd);
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan, coba lagi.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (isSubmitting) return;
    predict.handleReset();
    setPredictionUsed(false);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="w-[94%] sm:w-[680px] md:w-[720px] lg:w-[780px] max-w-none max-h-[90vh] overflow-y-auto rounded-3xl border border-borderPrimary bg-card p-0">
        <DialogTitle className="sr-only">{isEdit ? 'Edit Meal' : 'Tambah Meal'}</DialogTitle>

        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-borderPrimary sticky top-0 bg-card z-10">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-primary">
              {isEdit ? 'Edit' : 'Tambah'} Makanan
            </p>
            <h2 className="text-xl font-bold text-textPrimary mt-0.5">
              {isEdit ? editMeal?.foodName : 'Catat Konsumsi Baru'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-borderPrimary text-textSecondary hover:bg-background hover:text-textPrimary transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {!isEdit && (
          <div className="flex gap-2 px-6 pt-4">
            {availableTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                  tab === id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-background border border-borderPrimary text-textSecondary hover:text-textPrimary'
                )}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="px-6 pb-6 pt-4 flex flex-col gap-6">
          {!isEdit && tab === 'upload' && (
            <div>
              <UploadSection {...predict} />
              {predict.predictionResult && (
                <div className="mt-4">
                  <PredictionResult predictionResult={predict.predictionResult} />
                  {/* Perbaikan tombol pemicu infinite loop di bawah ini */}
                  {!predictionUsed && predict.predictionResult?.predict?.foodName && (
                    <Button
                      type="button"
                      className="w-full mt-4"
                      onClick={() => {
                        setPredictionUsed(true); // Set true agar banner info hijau tetap menyala di tab manual
                        setTab('manual');      // Pindah ke tab form manual
                      }}
                    >
                      <CheckCircle2 size={16} />
                      Gunakan Hasil Ini
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {!isEdit && tab === 'camera' && (
            <div>
              <CameraSection {...predict} />
              {predict.predictionResult && (
                <div className="mt-4">
                  <PredictionResult predictionResult={predict.predictionResult} />
                </div>
              )}
            </div>
          )}

          {(tab === 'manual' || isEdit) && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {predictionUsed && (
                <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-4 py-3 text-sm text-primary">
                  <CheckCircle2 size={16} className="shrink-0" />
                  Form diisi otomatis dari hasil scan AI. Koreksi jika perlu.
                </div>
              )}

              {(imageFile || predict.previewUrl) && (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-borderPrimary group">
                  <img
                    src={predict.previewUrl || (imageFile instanceof File ? URL.createObjectURL(imageFile) : imageFile)}
                    alt="preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      predict.handleReset(); // Reset hook agar sinkron saat gambar dihapus
                    }}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {!imageFile && !predict.previewUrl && (
                <Field label="Foto Makanan (Opsional)">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full rounded-xl border border-borderPrimary bg-input px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                  />
                </Field>
              )}

              <Field label="Nama Makanan" required>
                <input
                  type="text"
                  value={form.foodName}
                  onChange={(e) => setField('foodName')(e.target.value)}
                  placeholder="contoh: Nasi Goreng Ayam"
                  className="w-full rounded-xl border border-borderPrimary bg-input px-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Waktu Makan" required>
                  <select
                    value={form.mealType}
                    onChange={(e) => setField('mealType')(e.target.value)}
                    className="w-full rounded-xl border border-borderPrimary bg-input px-3 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {MEAL_TYPES.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Porsi">
                  <NumInput id="portion" value={form.portion} onChange={setField('portion')} placeholder="1" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Takaran Saji (Opsional)">
                  <input
                    type="text"
                    value={form.servingDescription}
                    onChange={(e) => setField('servingDescription')(e.target.value)}
                    placeholder="contoh: 1 piring / 1 mangkuk"
                    className="w-full rounded-xl border border-borderPrimary bg-input px-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </Field>
                <Field label="Berat (g) (Opsional)">
                  <NumInput id="servingSizeG" value={form.servingSizeG} onChange={setField('servingSizeG')} placeholder="200" />
                </Field>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary mb-3">
                  Kandungan Nutrisi (per porsi)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Kalori (kcal)" required>
                    <div className="relative">
                      <Flame size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                      <input
                        type="number" min="0" step="any"
                        value={form.calorie}
                        onChange={(e) => setField('calorie')(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-borderPrimary bg-input pl-8 pr-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </Field>
                  <Field label="Protein (g)">
                    <div className="relative">
                      <Beef size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        type="number" min="0" step="any"
                        value={form.protein}
                        onChange={(e) => setField('protein')(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-borderPrimary bg-input pl-8 pr-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </Field>
                  <Field label="Karbohidrat (g)">
                    <div className="relative">
                      <Wheat size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
                      <input
                        type="number" min="0" step="any"
                        value={form.carbohydrate}
                        onChange={(e) => setField('carbohydrate')(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-borderPrimary bg-input pl-8 pr-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </Field>
                  <Field label="Lemak (g)">
                    <div className="relative">
                      <Droplets size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" />
                      <input
                        type="number" min="0" step="any"
                        value={form.fat}
                        onChange={(e) => setField('fat')(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-borderPrimary bg-input pl-8 pr-3 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-danger bg-danger/8 border border-danger/20 rounded-xl px-4 py-2.5">
                  {submitError}
                </p>
              )}

              <Button type="submit" className="w-full mt-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Menyimpan…</>
                ) : isEdit ? (
                  <><CheckCircle2 size={16} /> Simpan Perubahan</>
                ) : (
                  <><CheckCircle2 size={16} /> Tambah Meal</>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
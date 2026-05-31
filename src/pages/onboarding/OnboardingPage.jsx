import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

const genderOptions = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
];

const pregnancyOptions = [
  { value: 'no', label: 'Tidak' },
  { value: 'yes', label: 'Ya' },
];

const trimesterOptions = [
  { value: '1', label: 'Trimester 1' },
  { value: '2', label: 'Trimester 2' },
  { value: '3', label: 'Trimester 3' },
];

function calculateBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  if (!weight || !heightM || heightM <= 0) return null;
  const bmi = weight / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

function getBMICategory(bmi) {
  if (bmi === null) return '';
  if (bmi < 18.5) return 'Kurus';
  if (bmi >= 18.5 && bmi < 25) return 'Normal';
  if (bmi >= 25 && bmi < 30) return 'Gemuk (Overweight)';
  return 'Obesitas';
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    isPregnant: '',
    trimester: '',
    calorieTarget: '',
    proteinTarget: '',
    carbohydrateTarget: '',
    fatTarget: '',
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const bmi = useMemo(() => calculateBMI(Number(form.weight), Number(form.height)), [form.weight, form.height]);
  const bmiCategory = useMemo(() => getBMICategory(bmi), [bmi]);

  const handleNext = () => {
    setError('');

    // Step 1 validation
    if (step === 1) {
      if (!form.age || !form.gender || !form.height || !form.weight) {
        setError('Harap lengkapi semua data diri.');
        return;
      }
      if (Number(form.age) < 1) {
        setError('Umur minimal 1 tahun.');
        return;
      }
      if (Number(form.height) < 1 || Number(form.weight) < 1) {
        setError('Tinggi dan berat badan harus lebih dari 0.');
        return;
      }
    }

    // Step 2 validation (hanya untuk perempuan)
    if (step === 2) {
      if (!form.isPregnant) {
        setError('Harap pilih apakah Anda sedang hamil atau tidak.');
        return;
      }
      if (form.isPregnant === 'yes' && !form.trimester) {
        setError('Harap pilih trimester kehamilan.');
        return;
      }
    }

    // Step 3 validation
    if (step === 3) {
      if (!form.calorieTarget || !form.proteinTarget || !form.carbohydrateTarget || !form.fatTarget) {
        setError('Harap lengkapi semua target nutrisi.');
        return;
      }
      if (Number(form.calorieTarget) < 1 || Number(form.proteinTarget) < 1 || Number(form.carbohydrateTarget) < 1 || Number(form.fatTarget) < 1) {
        setError('Target nutrisi harus lebih dari 0.');
        return;
      }
    }

    if (step === 1 && form.gender === 'male') {
      // Laki-laki: skip step 2 langsung ke step 3
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 3 && form.gender === 'male') {
      // Laki-laki: back dari step 3 ke step 1
      setStep(1);
    } else if (step === 3 && form.gender === 'female' && form.isPregnant === 'no') {
      // Perempuan tidak hamil: back dari step 3 ke step 2
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    setError('');

    // Simpan ke localStorage
    const onboardingData = {
      age: Number(form.age),
      gender: form.gender,
      height: Number(form.height),
      weight: Number(form.weight),
      isPregnant: form.gender === 'female' ? form.isPregnant === 'yes' : false,
      trimester: form.gender === 'female' && form.isPregnant === 'yes' ? Number(form.trimester) : null,
      calorieTarget: Number(form.calorieTarget),
      proteinTarget: Number(form.proteinTarget),
      carbohydrateTarget: Number(form.carbohydrateTarget),
      fatTarget: Number(form.fatTarget),
      bmi: bmi,
      bmiCategory: bmiCategory,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('onboarding_data', JSON.stringify(onboardingData));
    setSaved(true);

    // Redirect ke dashboard setelah 1 detik
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-borderPrimary bg-card p-8 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-textPrimary">Selamat Datang! 🎉</h1>
          <p className="mt-2 text-textSecondary">Lengkapi profilmu untuk memulai perjalanan nutrisimu</p>
          <p className="mt-1 text-sm text-textMuted">
            Langkah {step} dari {form.gender === 'male' ? 3 : 4}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 flex gap-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-borderPrimary'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 && (form.gender === 'male' ? step >= 3 : true) ? 'bg-primary' : 'bg-borderPrimary'}`} />
          {form.gender !== 'male' && <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-borderPrimary'}`} />}
          <div className={`h-2 flex-1 rounded-full ${step >= (form.gender === 'male' ? 3 : 4) ? 'bg-primary' : 'bg-borderPrimary'}`} />
        </div>

        {/* Error */}
        {error && <div className="mt-4 rounded-2xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{error}</div>}

        {/* Success Message */}
        {saved && (
          <div className="mt-4 rounded-2xl border border-success/30 bg-success/10 p-4 text-center">
            <p className="text-sm font-semibold text-success">✓ Data berhasil disimpan! Mengarahkan ke dashboard...</p>
          </div>
        )}

        {/* Step 1: Data Diri */}
        {step === 1 && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Data Diri</h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Umur (tahun)</label>
              <Input type="number" min="1" value={form.age} onChange={(e) => updateField('age', e.target.value)} placeholder="Contoh: 25" className="border-borderStrong bg-input text-textPrimary" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Jenis Kelamin</label>
              <Select
                options={genderOptions}
                placeholder="Pilih jenis kelamin"
                value={form.gender}
                onChange={(val) => {
                  updateField('gender', val);
                  // Reset field kehamilan jika ganti gender
                  if (val === 'male') {
                    updateField('isPregnant', '');
                    updateField('trimester', '');
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Tinggi Badan (cm)</label>
                <Input type="number" min="1" step="0.1" value={form.height} onChange={(e) => updateField('height', e.target.value)} placeholder="Contoh: 170" className="border-borderStrong bg-input text-textPrimary" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Berat Badan (kg)</label>
                <Input type="number" min="1" step="0.1" value={form.weight} onChange={(e) => updateField('weight', e.target.value)} placeholder="Contoh: 65" className="border-borderStrong bg-input text-textPrimary" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} className="w-full rounded-2xl py-3">
                Lanjut
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Kondisi Kehamilan (hanya untuk Perempuan) */}
        {step === 2 && form.gender === 'female' && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Kondisi Kehamilan</h2>
            <p className="text-sm text-textMuted">Informasi ini membantu kami memberikan rekomendasi nutrisi yang sesuai.</p>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Apakah Anda sedang hamil?</label>
              <Select
                options={pregnancyOptions}
                placeholder="Pilih jawaban"
                value={form.isPregnant}
                onChange={(val) => {
                  updateField('isPregnant', val);
                  if (val === 'no') updateField('trimester', '');
                }}
              />
            </div>

            {form.isPregnant === 'yes' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Trimester ke berapa?</label>
                <Select options={trimesterOptions} placeholder="Pilih trimester" value={form.trimester} onChange={(val) => updateField('trimester', val)} />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleNext} className="flex-1 rounded-2xl py-3">
                Lanjut
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Target Nutrisi Harian */}
        {step === 3 && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Target Nutrisi Harian</h2>
            <p className="text-sm text-textMuted">Atur target nutrisi harianmu. Bisa diubah nanti di halaman profil.</p>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Target Kalori (kcal)</label>
              <Input type="number" min="1" value={form.calorieTarget} onChange={(e) => updateField('calorieTarget', e.target.value)} placeholder="Contoh: 2000" className="border-borderStrong bg-input text-textPrimary" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Protein (g)</label>
                <Input type="number" min="1" value={form.proteinTarget} onChange={(e) => updateField('proteinTarget', e.target.value)} placeholder="65" className="border-borderStrong bg-input text-textPrimary" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Karbohidrat (g)</label>
                <Input type="number" min="1" value={form.carbohydrateTarget} onChange={(e) => updateField('carbohydrateTarget', e.target.value)} placeholder="260" className="border-borderStrong bg-input text-textPrimary" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Lemak (g)</label>
                <Input type="number" min="1" value={form.fatTarget} onChange={(e) => updateField('fatTarget', e.target.value)} placeholder="80" className="border-borderStrong bg-input text-textPrimary" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleNext} className="flex-1 rounded-2xl py-3">
                Lihat Ringkasan
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Ringkasan & BMI */}
        {step === (form.gender === 'male' ? 3 : 4) && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Ringkasan Profil</h2>
            <p className="text-sm text-textMuted">Periksa kembali data yang kamu isi sebelum menyimpan.</p>

            {/* Data Diri Summary */}
            <div className="rounded-2xl border border-borderPrimary bg-surface2/50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Data Diri</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-textMuted">Umur</p>
                  <p className="font-semibold text-textPrimary">{form.age} tahun</p>
                </div>
                <div>
                  <p className="text-textMuted">Jenis Kelamin</p>
                  <p className="font-semibold text-textPrimary capitalize">{form.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>
                <div>
                  <p className="text-textMuted">Tinggi Badan</p>
                  <p className="font-semibold text-textPrimary">{form.height} cm</p>
                </div>
                <div>
                  <p className="text-textMuted">Berat Badan</p>
                  <p className="font-semibold text-textPrimary">{form.weight} kg</p>
                </div>
              </div>

              {form.gender === 'female' && (
                <div className="pt-2 border-t border-borderPrimary">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-textMuted">Sedang Hamil</p>
                      <p className="font-semibold text-textPrimary">{form.isPregnant === 'yes' ? 'Ya' : 'Tidak'}</p>
                    </div>
                    {form.isPregnant === 'yes' && (
                      <div>
                        <p className="text-textMuted">Trimester</p>
                        <p className="font-semibold text-textPrimary">{form.trimester}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* BMI Summary */}
            <div className="rounded-2xl border border-borderPrimary bg-primary/5 p-5 text-center">
              <p className="text-sm text-textMuted mb-1">Indeks Massa Tubuh (BMI)</p>
              <p className="text-3xl font-bold text-primary">{bmi}</p>
              <p className={`mt-1 text-sm font-semibold ${bmiCategory === 'Normal' ? 'text-success' : bmiCategory === 'Kurus' ? 'text-warning' : 'text-danger'}`}>{bmiCategory}</p>
            </div>

            {/* Target Nutrisi Summary */}
            <div className="rounded-2xl border border-borderPrimary bg-surface2/50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Target Nutrisi Harian</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Kalori</p>
                  <p className="text-lg font-bold text-primary">{form.calorieTarget}</p>
                  <p className="text-xs text-textMuted">kcal</p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Protein</p>
                  <p className="text-lg font-bold text-info">{form.proteinTarget}</p>
                  <p className="text-xs text-textMuted">g</p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Karbohidrat</p>
                  <p className="text-lg font-bold text-warning">{form.carbohydrateTarget}</p>
                  <p className="text-xs text-textMuted">g</p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Lemak</p>
                  <p className="text-lg font-bold text-danger">{form.fatTarget}</p>
                  <p className="text-xs text-textMuted">g</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleSave} className="flex-1 rounded-2xl py-3">
                Simpan & Mulai
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

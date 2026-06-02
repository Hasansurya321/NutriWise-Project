import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { profileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const genderOptions = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
];

const femaleConditionOptions = [
  { value: 'normal', label: 'Tidak Hamil & Tidak Menyusui' },
  { value: 'pregnant', label: 'Sedang Hamil' },
  { value: 'breastfeeding', label: 'Sedang Menyusui' },
];

const trimesterOptions = [
  { value: '1', label: 'Trimester 1' },
  { value: '2', label: 'Trimester 2' },
  { value: '3', label: 'Trimester 3' },
];

const breastfeedingOptions = [
  { value: '1', label: '0 - 6 Bulan Pertama' },
  { value: '2', label: '7 - 12 Bulan Kedua' },
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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingAkg, setFetchingAkg] = useState(false);
  const { hasProfile, setUser } = useAuth();

  // Pengaman rute: tendang ke dashboard kalau terdeteksi sudah bikin profil
  useEffect(() => {
    if (hasProfile) {
      navigate('/dashboard', { replace: true });
    }
  }, [hasProfile, navigate]);

  const [form, setForm] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    femaleCondition: 'normal',
    trimester: '',
    breastfeedingStage: '',
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

  // Hitung target AKG otomatis lewat backend
  const fetchDefaultAKG = async () => {
    const age = Number(form.age);
    const gender = form.gender;

    const pregnancyTrimester = gender === 'female' && form.femaleCondition === 'pregnant' ? Number(form.trimester) : 0;
    const breastfeedingStage = gender === 'female' && form.femaleCondition === 'breastfeeding' ? Number(form.breastfeedingStage) : 0;

    setFetchingAkg(true);
    setError('');
    try {
      const res = await profileAPI.getAKGReferences(age, gender, pregnancyTrimester, breastfeedingStage);

      if (res?.status === 'success' && res?.data?.akg) {
        const { calories, protein, fat, carbohydrate } = res.data.akg;

        setForm((prev) => ({
          ...prev,
          calorieTarget: calories || '',
          proteinTarget: protein || '',
          fatTarget: fat || '',
          carbohydrateTarget: carbohydrate || '',
        }));
      }
    } catch (err) {
      console.error("Gagal fetch AKG:", err);
      setError("Gagal memuat rekomendasi gizi otomatis. Target bisa diisi manual.");
    } finally {
      setFetchingAkg(false);
    }
  };

  const handleNext = () => {
    setError('');

    // Validasi Step 1: Data Utama
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

      if (form.gender === 'male') {
        setStep(3);
      } else {
        setStep(2);
      }
      return;
    }

    // Validasi Step 2: Kondisi Spesifik Perempuan
    if (step === 2) {
      if (form.femaleCondition === 'pregnant' && !form.trimester) {
        setError('Harap tentukan trimester kehamilan Anda.');
        return;
      }
      if (form.femaleCondition === 'breastfeeding' && !form.breastfeedingStage) {
        setError('Harap tentukan tahap menyusui Anda.');
        return;
      }

      setStep(3);
      return;
    }

    // Validasi Step 3: Angka Gizi
    if (step === 3) {
      if (!form.calorieTarget || !form.proteinTarget || !form.carbohydrateTarget || !form.fatTarget) {
        setError('Harap tentukan semua target capaian nutrisi.');
        return;
      }
      if (Number(form.calorieTarget) < 1 || Number(form.proteinTarget) < 1 || Number(form.carbohydrateTarget) < 1 || Number(form.fatTarget) < 1) {
        setError('Target angka nutrisi harus bernilai positif.');
        return;
      }

      setStep(4);
      return;
    }
  };

  const handleBack = () => {
    setError('');

    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      if (form.gender === 'male') {
        setStep(1);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(1);
    }
  };

  useEffect(() => {
    if (step === 3) {
      fetchDefaultAKG();
    }
  }, [step]);

  const handleSave = async () => {
    setError('');
    setIsLoading(true);
    
    const onboardingPayload = {
      age: Number(form.age),
      gender: form.gender,
      height: Number(form.height),
      weight: Number(form.weight),
      calorieTarget: Number(form.calorieTarget),
      proteinTarget: Number(form.proteinTarget),
      carbohydrateTarget: Number(form.carbohydrateTarget),
      fatTarget: Number(form.fatTarget),
      pregnancyTrimester: form.gender === 'female' && form.femaleCondition === 'pregnant' ? Number(form.trimester) : 0,
      breastfeedingStage: form.gender === 'female' && form.femaleCondition === 'breastfeeding' ? Number(form.breastfeedingStage) : 0,
    };

    try {
      const responseData = await profileAPI.createProfile(onboardingPayload);

      if (responseData.status === 'success') {
        setSaved(true);

        // 🟢 Hapus baris localStorage lama. Cukup panggil global state context:
        setUser(responseData.data.user);
        
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Error submit onboarding:", err);
      const backendMessage = err.response?.data?.message || 'Gagal menyimpan profil ke server database.';
      setError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-borderPrimary bg-card p-8 shadow-xl">

        {/* Progress Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-textPrimary">Selamat Datang!</h1>
          <p className="mt-2 text-textSecondary">Lengkapi profilmu untuk memulai perjalanan nutrisimu</p>
          <p className="mt-1 text-sm text-textMuted">
            Langkah {step} dari {form.gender === 'male' ? 3 : 4}
          </p>
        </div>

        {/* Indikator Bar Progress */}
        <div className="mt-6 flex gap-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-borderPrimary'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 && (form.gender === 'male' ? step >= 3 : true) ? 'bg-primary' : 'bg-borderPrimary'}`} />
          {form.gender !== 'male' && <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-borderPrimary'}`} />}
          <div className={`h-2 flex-1 rounded-full ${step >= (form.gender === 'male' ? 3 : 4) ? 'bg-primary' : 'bg-borderPrimary'}`} />
        </div>

        {/* Status Alert */}
        {error && <div className="mt-4 rounded-2xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{error}</div>}
        {saved && (
          <div className="mt-4 rounded-2xl border border-success/30 bg-success/10 p-4 text-center">
            <p className="text-sm font-semibold text-success">✓ Profil disimpan! Mengarahkan ke dashboard...</p>
          </div>
        )}

        {/* STEP 1: DATA UTAMA */}
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
                  if (val === 'male') {
                    updateField('femaleCondition', 'normal');
                    updateField('trimester', '');
                    updateField('breastfeedingStage', '');
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

        {/* STEP 2: KONDISI WANITA */}
        {step === 2 && form.gender === 'female' && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Kondisi Khusus Wanita</h2>
            <p className="text-sm text-textMuted">Data ini dipakai untuk mencocokkan target tambahan kalori AKG harian.</p>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Apakah saat ini Anda sedang hamil atau menyusui?</label>
              <Select
                options={femaleConditionOptions}
                placeholder="Pilih kondisi"
                value={form.femaleCondition}
                onChange={(val) => {
                  updateField('femaleCondition', val);
                  updateField('trimester', '');
                  updateField('breastfeedingStage', '');
                }}
              />
            </div>

            {form.femaleCondition === 'pregnant' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Trimester Kehamilan</label>
                <Select options={trimesterOptions} placeholder="Pilih fase trimester" value={form.trimester} onChange={(val) => updateField('trimester', val)} />
              </div>
            )}

            {form.femaleCondition === 'breastfeeding' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Tahap Menyusui</label>
                <Select options={breastfeedingOptions} placeholder="Pilih durasi bayi" value={form.breastfeedingStage} onChange={(val) => updateField('breastfeedingStage', val)} />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleNext} className="flex-1 rounded-2xl py-3">
                Lanjut
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: TARGET GIZI AUTOMATIC */}
        {step === 3 && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Target Gizi Harian</h2>
            <p className="text-sm text-textMuted">
              {fetchingAkg ? '⏳ Menghitung acuan tabel AKG Kemenkes...' : '✨ Data otomatis terisi. Nilainya masih bisa diubah manual jika punya target khusus.'}
            </p>

            <div>
              <label className="mb-2 block text-sm font-medium text-textPrimary">Target Energi Kalori (kcal)</label>
              <Input type="number" min="1" step="0.1" disabled={fetchingAkg} value={form.calorieTarget} onChange={(e) => updateField('calorieTarget', e.target.value)} placeholder="Menghitung gizi..." className="border-borderStrong bg-input text-textPrimary" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Protein (g)</label>
                <Input type="number" min="1" step="0.1" disabled={fetchingAkg} value={form.proteinTarget} onChange={(e) => updateField('proteinTarget', e.target.value)} placeholder=".." className="border-borderStrong bg-input text-textPrimary" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Karbohidrat (g)</label>
                <Input type="number" min="1" step="0.1" disabled={fetchingAkg} value={form.carbohydrateTarget} onChange={(e) => updateField('carbohydrateTarget', e.target.value)} placeholder=".." className="border-borderStrong bg-input text-textPrimary" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">Lemak (g)</label>
                <Input type="number" min="1" step="0.1" disabled={fetchingAkg} value={form.fatTarget} onChange={(e) => updateField('fatTarget', e.target.value)} placeholder=".." className="border-borderStrong bg-input text-textPrimary" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} disabled={fetchingAkg} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleNext} disabled={fetchingAkg} className="flex-1 rounded-2xl py-3">
                Ringkasan
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: RINGKASAN DATA */}
        {step === 4 && !saved && (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold text-textPrimary">Ringkasan Profil</h2>
            <p className="text-sm text-textMuted">Cek ulang data sebelum disimpan permanen ke server.</p>

            <div className="rounded-2xl border border-borderPrimary bg-surface2/50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Identitas</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-textMuted">Umur</p>
                  <p className="font-semibold text-textPrimary">{form.age} tahun</p>
                </div>
                <div>
                  <p className="text-textMuted">Gender</p>
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
                <div className="pt-2 border-t border-borderPrimary text-sm space-y-1">
                  <p>
                    <span className="text-textMuted">Kondisi Fisik: </span>
                    <span className="font-semibold text-textPrimary">
                      {form.femaleCondition === 'pregnant' ? `Hamil (Trimester ${form.trimester})` :
                        form.femaleCondition === 'breastfeeding' ? `Menyusui (Fase ${form.breastfeedingStage === '1' ? '0-6M' : '7-12M'})` :
                          'Normal'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-borderPrimary bg-primary/5 p-5 text-center">
              <p className="text-sm text-textMuted mb-1">Status Massa Tubuh (BMI)</p>
              <p className="text-3xl font-bold text-primary">{bmi}</p>
              <p className={`mt-1 text-sm font-semibold ${bmiCategory === 'Normal' ? 'text-success' : bmiCategory === 'Kurus' ? 'text-warning' : 'text-danger'}`}>{bmiCategory}</p>
            </div>

            <div className="rounded-2xl border border-borderPrimary bg-surface2/50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Target Capaian Gizi</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Kalori</p>
                  <p className="text-sm font-bold text-primary">{form.calorieTarget} <span className="text-[10px] font-normal">kcal</span></p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Protein</p>
                  <p className="text-sm font-bold text-info">{form.proteinTarget}<span className="text-[10px] font-normal">g</span></p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Karbo</p>
                  <p className="text-sm font-bold text-warning">{form.carbohydrateTarget}<span className="text-[10px] font-normal">g</span></p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-borderPrimary">
                  <p className="text-xs text-textMuted">Lemak</p>
                  <p className="text-sm font-bold text-danger">{form.fatTarget}<span className="text-[10px] font-normal">g</span></p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} disabled={isLoading} className="flex-1 rounded-2xl py-3">
                Kembali
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="flex-1 rounded-2xl py-3">
                {isLoading ? 'Menyimpan...' : 'Simpan & Mulai'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
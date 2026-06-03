import { useRef, useState } from 'react';
import { Camera, Loader2, CheckCircle2, X, Upload } from 'lucide-react';
import { cn } from '../../utils/cn';
import { userAPI } from '../../services/api';

function getInitials(name) {
  if (!name) return 'UN';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export default function AvatarUpload({ avatarUrl, fullName, userId, onSuccess }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Hanya file gambar (JPG, PNG) yang diizinkan.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5 MB.');
      return;
    }

    setError('');
    setPreview({ url: URL.createObjectURL(file), file });
  }

  async function handleUpload() {
    if (!preview?.file) return;
    setStatus('uploading');
    setError('');
    try {
      const fd = new FormData();
      fd.append('avatar', preview.file);
      const res = await userAPI.updateAvatar(fd);
      setStatus('success');
      // Pass back the new URL so parent can refresh
      const newUrl = res?.data?.avatarUrl || res?.avatarUrl || preview.url;
      onSuccess?.(newUrl);
      setTimeout(() => {
        setPreview(null);
        setStatus('idle');
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengunggah foto.');
      setStatus('error');
    }
  }

  function handleCancel() {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
    setStatus('idle');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  }

  const displayUrl = preview?.url || avatarUrl;
  const initials = getInitials(fullName);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar circle */}
      <div className="relative group">
        <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-card shadow-lg bg-primary/20 flex items-center justify-center text-3xl font-semibold text-primary">
          {displayUrl ? (
            <img src={displayUrl} alt={fullName} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Camera overlay button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center',
            'rounded-full border-2 border-card bg-primary text-white shadow-md',
            'transition-all hover:bg-primary/90 hover:scale-105',
            status === 'uploading' && 'opacity-50 cursor-not-allowed'
          )}
          disabled={status === 'uploading'}
          aria-label="Ganti foto profil"
        >
          <Camera size={16} />
        </button>

        {/* Success overlay */}
        {status === 'success' && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-primary" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview action bar */}
      {preview && status !== 'success' && (
        <div className="flex items-center gap-2 w-full max-w-[220px]">
          <button
            type="button"
            onClick={handleUpload}
            disabled={status === 'uploading'}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2',
              'bg-primary text-white text-xs font-semibold transition-all',
              'hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            {status === 'uploading' ? (
              <><Loader2 size={13} className="animate-spin" /> Mengunggah…</>
            ) : (
              <><Upload size={13} /> Simpan Foto</>
            )}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={status === 'uploading'}
            className="flex items-center justify-center h-8 w-8 rounded-xl border border-borderPrimary text-textSecondary hover:bg-surface2 hover:text-textPrimary transition-all disabled:opacity-50"
            aria-label="Batal"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-danger text-center max-w-[220px]">{error}</p>
      )}

      <p className="text-xs text-textMuted text-center">
        Klik ikon kamera untuk mengubah foto<br />
        <span className="text-[0.65rem]">JPG, PNG · Maks. 5 MB</span>
      </p>
    </div>
  );
}

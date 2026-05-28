import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({ fullname, email, password });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Gagal mendaftar. Silakan coba lagi.');
      return;
    }

    setSuccessMsg('Pendaftaran berhasil! Silakan login.');
    // Optionally auto-switch to login after a few seconds
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      
      {successMsg && (
        <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          {successMsg}
        </div>
      )}

      {/* NAME */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-foreground
          "
        >
          Nama Lengkap
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>

      {/* EMAIL */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-foreground
          "
        >
          Email
        </label>
        <Input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-foreground
          "
        >
          Password
        </label>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            size='icon'
            variant='ghost'
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >

            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}

          </Button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-foreground
          "
        >
          Konfirmasi Password
        </label>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            size='icon'
            variant='ghost'
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >

            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Register
      </Button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-textMuted">
          Sudah punya akun?{' '}
          <Button
            type="button"
            onClick={onSwitchToLogin}
            variant='ghost'
            className="font-bold"
            disabled={isSubmitting}
          >
            Masuk
          </Button>
        </p>
      </div>
    </form>
  );
}

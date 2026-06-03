import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function LoginForm({ onSwitchToRegister }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, hasProfile } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    
    try {
      const result = await login(email, password);
      console.log(result)
    
      if (!result.success) {
        setError(result.message ||'Email atau password salah.');
        setIsLoading(false);
        return;
      }
      

      if (!result.isProfileComplete) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }

    } catch (error) {
      console.log(error);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      setIsLoading(false);
    } 
  }

  return ( 
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {error && (
        <div
          className="
            mb-6 rounded-2xl
            border border-danger/30
            bg-danger/10
            px-4 py-3 text-sm
            text-danger
          "
        >
          {error}
        </div>
      )}

      {/* EMAIL */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-foreground
          "
        >
          Email Address
        </label>
        <Input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
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
          <Input value={password} type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            size='icon'
            variant='ghost'
            className="absolute right-4 top-1/2
              -translate-y-1/2 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}

          </Button>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant='ghost' type="button">
            Lupa password?
          </Button>
        </div>
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Sign In
      </Button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-textMuted">
          Belum punya akun?{' '}
          <Button
            type="button"
            onClick={onSwitchToRegister}
            variant='ghost'
            className="font-bold"
            disabled={isLoading}
          >
            Buat disini
          </Button>
        </p>
      </div>
    </form>
  );
}

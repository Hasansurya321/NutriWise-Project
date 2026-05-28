import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function LoginForm({ onSwitchToRegister }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('hasansuryadharma@example.com');

  const [password, setPassword] = useState('Password123!');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setError('');

    // Use mock auth service (internally initializes mock data)
    const success = authService.loginDummy(email, password);

    if (!success) {
      setError('Email atau password salah.');
      return;
    }

    navigate('/dashboard', { replace: true });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {error && (
        <div
          className="
            rounded-2xl
            border border-red-200
            bg-red-50
            px-4 py-3
            text-sm
            text-red-700
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
          placeholder="john@example.com" />
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
      <Button type="submit" className="w-full">
        Sign In
      </Button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Belum punya akun?{' '}
          <Button
            type="button"
            onClick={onSwitchToRegister}
            variant='ghost'
            className="font-bold"
            >
            Buat disini
          </Button>
        </p>
      </div>
    </form>
  );
}

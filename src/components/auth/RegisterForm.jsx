import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function RegisterForm({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="mt-10 space-y-6">
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
      <Button type="submit" className="w-full">
        Register
      </Button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Button
            type="button"
            onClick={onSwitchToLogin}
            variant='ghost'
            className="font-bold"
          >
            Masuk
          </Button>
        </p>
      </div>
    </form>
  );
}

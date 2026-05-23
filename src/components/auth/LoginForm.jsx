import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services';

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
            text-[#081225]
          "
        >
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="
            h-14 w-full
            rounded-2xl
            border border-black/10
            bg-[#f4f7fb]
            px-5
            text-sm text-[#081225]
            outline-none
            transition-all duration-300
            placeholder:text-slate-400
            focus:border-[#081225]
            focus:bg-white
          "
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-[#081225]
          "
        >
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="
              h-14 w-full
              rounded-2xl
              border border-black/10
              bg-[#f4f7fb]
              px-5 pr-14
              text-sm text-[#081225]
              outline-none
              transition-all duration-300
              placeholder:text-slate-400
              focus:border-[#081225]
              focus:bg-white
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-slate-400
              transition-colors duration-200
              hover:text-[#081225]
            "
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="
              text-sm
              text-slate-500
              transition-colors duration-200
              hover:text-[#081225]
            "
          >
            Lupa password?
          </button>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="
          h-14 w-full
          rounded-2xl
          bg-[#081225]
          text-sm font-semibold
          text-white
          transition-all duration-300
          hover:opacity-90
        "
      >
        Sign In
      </button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="
              font-semibold
              text-[#081225]
              transition-opacity duration-200
              hover:opacity-70
            "
          >
            Buat disini
          </button>
        </p>
      </div>
    </form>
  );
}

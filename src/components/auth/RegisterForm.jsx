import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
            text-[#081225]
          "
        >
          Nama Lengkap
        </label>

        <input
          type="text"
          placeholder="John Doe"
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

      {/* EMAIL */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-[#081225]
          "
        >
          Email
        </label>

        <input
          type="email"
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
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label
          className="
            mb-2 block
            text-sm font-semibold
            text-[#081225]
          "
        >
          Konfirmasi Password
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-slate-400
              transition-colors duration-200
              hover:text-[#081225]
            "
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="button"
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
        Buat Akun
      </button>

      {/* SWITCH */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="
              font-semibold
              text-[#081225]
              transition-opacity duration-200
              hover:opacity-70
            "
          >
            Masuk
          </button>
        </p>
      </div>
    </form>
  );
}

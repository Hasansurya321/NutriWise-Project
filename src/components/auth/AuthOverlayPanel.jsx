export default function AuthOverlayPanel({ mode, setMode }) {
  const isLogin = mode === 'login';

  return (
    <div
      className="
        relative flex
        h-full w-full
        items-center justify-center
        overflow-hidden
        pointer-events-none
      "
    >
      {/* LOGIN OVERLAY */}
      <div
        className={`
          absolute inset-0
          flex flex-col
          items-center justify-center
          px-12
          text-center text-white
          transition-[opacity,transform]
          duration-[900ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isLogin ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}
        `}
      >
        <h2
          className="
            text-5xl font-bold
            tracking-tight
          "
        >
          Selamat Datang Kembali
        </h2>

        <p
          className="
            mt-6
            max-w-md
            text-base leading-8
            text-white/70
          "
        >
          Masuk kembali untuk melanjutkan perjalanan nutrisi dan kesehatanmu bersama NutriWise.
        </p>

        <button
          type="button"
          onClick={() => setMode('register')}
          className="
            pointer-events-auto
            mt-10
            rounded-full
            border border-white/20
            px-10 py-4
            text-sm font-semibold
            tracking-wide
            transition-all duration-300
            hover:bg-white
            hover:text-[#081225]
          "
        >
          Register
        </button>
      </div>

      {/* REGISTER OVERLAY */}
      <div
        className={`
          absolute inset-0
          flex flex-col
          items-center justify-center
          px-12
          text-center text-white
          transition-[opacity,transform]
          duration-[900ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isLogin ? 'translate-x-16 opacity-0' : 'translate-x-0 opacity-100'}
        `}
      >
        <h2
          className="
            text-5xl font-bold
            tracking-tight
          "
        >
          Welcome Back
        </h2>

        <p
          className="
            mt-6
            max-w-md
            text-base leading-8
            text-white/70
          "
        >
          Tetap terhubung dengan NutriWise dan lanjutkan progress nutrisimu.
        </p>

        <button
          type="button"
          onClick={() => setMode('login')}
          className="
            pointer-events-auto
            mt-10
            rounded-full
            border border-white/20
            px-10 py-4
            text-sm font-semibold
            tracking-wide
            transition-all duration-300
            hover:bg-white
            hover:text-[#081225]
          "
        >
          Login
        </button>
      </div>
    </div>
  );
}

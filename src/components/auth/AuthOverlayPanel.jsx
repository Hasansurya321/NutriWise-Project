import { Button } from "../ui/button";

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
          Masuk kembali untuk melanjutkan perjalanan nutrisi dan kesehatanmu bersama NutriCitra.
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={() => setMode('register')}
          className="pointer-events-auto rounded-full px-10 mt-10 border-white text-white hover:bg-white hover:text-primary"
        >
          Daftar
        </Button>
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
          Ayo gabung sekarang!
        </h2>

        <p
          className="
            mt-6
            max-w-md
            text-base leading-8
            text-white/70
          "
        >
          Tetap terhubung dengan NutriCitra dan lanjutkan progress nutrisimu.
        </p>

        <Button
          type="button"
          onClick={() => setMode('login')}
          variant="outline"
          className="pointer-events-auto rounded-full px-10 mt-10 border-white text-white hover:bg-white hover:text-primary">
          Masuk
        </Button>
      </div>
    </div>
  );
}

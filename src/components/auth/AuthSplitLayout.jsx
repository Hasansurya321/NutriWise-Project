import { ThemeToggleButton } from '../theme/ThemeToggleButton';
import { Button } from '../ui/button';
import AuthBrandHeader from './AuthBrandHeader';
import AuthOverlayPanel from './AuthOverlayPanel';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthSplitLayout({ mode, setMode }) {
  const isLogin = mode === 'login';

  return (
    <div
      className="
        relative
        flex w-full
        items-center justify-center
      "
    >
      <div
        className="
          relative
          w-full max-w-6xl
          overflow-hidden
          rounded-[36px]
          border border-black/10
          bg-background
          shadow-[0_30px_90px_rgba(15,23,42,0.12)]
        "
      >
        {/* DESKTOP */}
        <div
          className="
            relative hidden
            min-h-[720px]
            lg:block
          "
        >
          <div
            className={`
        absolute top-0
        flex h-full w-1/2
        flex-col
        px-12 py-14
        transition-all
        overflow-y-scroll
        no-scrollbar
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        /* DINAMIS: Geser posisi kontainer utama kiri/kanan berdasarkan mode */
        ${isLogin ? 'left-0 translate-x-0' : 'left-full -translate-x-full'}
      `}
          >
            <div className="relative">
              <AuthBrandHeader
                subtitle={isLogin ? "Masuk untuk mulai memantau nutrisi harianmu." : "Buat akun untuk memulai pengalaman tracking nutrisi cerdas."}
              />
              <div className="absolute top-0 right-0" variant="ghost" size="icon">
                <ThemeToggleButton />
              </div>
            </div>

            <div className="mt-8 transition-opacity duration-500">
              {isLogin ? (
                <LoginForm onSwitchToRegister={() => setMode('register')} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setMode('login')} />
              )}
            </div>
          </div>

          {/* SLIDING PANEL */}
          <div
            className={`
              absolute left-0 top-0
              z-20
              h-full w-1/2
              overflow-hidden
              bg-primary
              pointer-events-none
              transition-transform
              duration-[1200ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isLogin ? 'translate-x-full' : 'translate-x-0'}
            `}
          >
            <AuthOverlayPanel mode={mode} setMode={setMode} />
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden">
          <div className="bg-foreground">
            <AuthOverlayPanel mode={mode} setMode={setMode} />
          </div>

          <div className="px-6 py-10 relative">
            <AuthBrandHeader subtitle={isLogin ? 'Masuk untuk mulai memantau nutrisi harianmu.' : 'Buat akun untuk memulai pengalaman tracking nutrisi cerdas.'} />
            <div className="absolute top-10 right-10" variant="ghost" size="icon">
              <ThemeToggleButton />
            </div>
            <div className="mt-8">{isLogin ? <LoginForm onSwitchToRegister={() => setMode('register')} /> : <RegisterForm onSwitchToLogin={() => setMode('login')} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

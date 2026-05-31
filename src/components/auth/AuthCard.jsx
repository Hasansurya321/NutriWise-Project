import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthToggle from './AuthToggle';

import { Logo } from '../ui/Logo';

export default function AuthCard({ mode, setMode }) {
  return (
    <div
      className="
        relative z-10
        w-full max-w-md
        rounded-[36px]
        border border-black/5
        bg-white
        shadow-[0_12px_40px_rgba(15,23,42,0.08)]
      "
    >
      <div className="p-10">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        <div className="mt-8">
          <AuthToggle mode={mode} setMode={setMode} />
        </div>

        <div className="mt-8">{mode === 'login' ? <LoginForm /> : <RegisterForm setMode={setMode} />}</div>
      </div>
    </div>
  );
}

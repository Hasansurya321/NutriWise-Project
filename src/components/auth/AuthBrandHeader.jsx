import { Logo } from '../ui/Logo';

export default function AuthBrandHeader({ subtitle }) {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      <Logo size="lg" className="mb-2" />
      <p className="mt-3 text-sm text-foreground sm:text-base max-w-sm">{subtitle}</p>
    </div>
  );
}

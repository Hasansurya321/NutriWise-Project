export default function AuthBrandHeader({ title, subtitle }) {
  return (
    <div className="text-center lg:text-left">
      <h1 className="text-3xl font-semibold tracking-tight text-[#081225] sm:text-4xl">{title}</h1>

      <p className="mt-3 text-sm text-slate-500 sm:text-base">{subtitle}</p>
    </div>
  );
}

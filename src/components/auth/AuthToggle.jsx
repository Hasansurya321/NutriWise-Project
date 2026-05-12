export default function AuthToggle({ mode, setMode }) {
  return (
    <div
      className="
        grid grid-cols-2
        rounded-2xl
        bg-slate-100
        p-1
      "
    >
      <button
        onClick={() => setMode('login')}
        className={`
          rounded-xl
          px-4 py-3
          text-sm font-medium
          transition-colors duration-500
          ${mode === 'login' ? 'bg-[#081225] text-white' : 'text-slate-500 hover:text-slate-700'}
        `}
      >
        Login
      </button>

      <button
        onClick={() => setMode('register')}
        className={`
          rounded-xl
          px-4 py-3
          text-sm font-medium
          transition-colors duration-500
          ${mode === 'register' ? 'bg-[#081225] text-white' : 'text-slate-500 hover:text-slate-700'}
        `}
      >
        Register
      </button>
    </div>
  );
}

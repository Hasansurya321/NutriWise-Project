export default function AuthBackground({ mode }) {
  return (
    <div
      className="
        absolute inset-0
        overflow-hidden
        select-none
      "
      aria-hidden="true"
    >
      <div
        className="
          absolute inset-0
          bg-white
        "
      />

      <div
        className={`
          absolute left-0 top-0
          h-full w-1/2
          bg-[#081225]
          will-change-transform
          transition-transform duration-[1200ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          motion-reduce:transform-none
          ${mode === 'login' ? 'translate-x-0' : 'translate-x-full'}
        `}
      />

      <div
        className={`
          absolute top-0
          h-full w-px
          bg-black/10
          will-change-transform
          transition-transform duration-[1200ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          motion-reduce:transform-none
          ${mode === 'login' ? 'translate-x-[calc(50vw-0.5px)]' : 'translate-x-[calc(100vw-0.5px)]'}
        `}
      />
    </div>
  );
}

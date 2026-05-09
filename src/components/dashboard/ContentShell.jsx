export function ContentShell({ children }) {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">{children}</div>
    </main>
  );
}

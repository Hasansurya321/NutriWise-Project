import { useNavigate, useRouteError } from 'react-router-dom';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ErrorPage() {
  useDocumentTitle('Terjadi Kesalahan');
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-danger/5 via-background to-warning/5 p-4 text-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-borderPrimary bg-card p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-danger to-warning"></div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger mb-2">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-textPrimary">
            Ups, Terjadi Kesalahan!
          </h1>
          <p className="text-sm text-textSecondary leading-relaxed">
            Sistem kami mengalami kendala teknis saat memproses permintaan Anda. Jangan khawatir, Anda bisa memuat ulang halaman ini.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-danger/5 border border-danger/20 rounded-xl text-left overflow-hidden">
              <p className="text-xs font-mono text-danger/80 break-words truncate">
                {error.statusText || error.message || 'Unknown Error'}
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button
            onClick={() => window.location.reload()}
            className="w-full rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} /> Muat Ulang Halaman
          </Button>

          <button
            onClick={() => navigate('/', { replace: true })}
            className="text-sm font-medium text-textSecondary hover:text-primary transition-colors py-2"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

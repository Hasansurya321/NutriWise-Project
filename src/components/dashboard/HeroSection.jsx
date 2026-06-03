import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function HeroSection({ isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <section
        className="
          rounded-2xl border border-borderCard
          bg-card p-5 shadow-card
          sm:p-6
        "
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Badge variant="primary" className="w-fit">
              Belum Masuk
            </Badge>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-textPrimary sm:text-3xl">Autentikasi Diperlukan</h2>

              <p className="max-w-2xl text-sm leading-6 text-textSecondary sm:text-base">Silakan masuk melalui halaman autentikasi untuk memuat data Anda.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary">
              <Link to="/auth">Masuk</Link>
            </Button>

            <Button asChild variant="secondary">
              <Link to="/auth?mode=register">Daftar</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        rounded-2xl border border-borderCard
        bg-card p-5 shadow-card
        sm:p-6
      "
    >
      <div
        className="
          flex flex-col gap-6
          xl:flex-row xl:items-end xl:justify-between
        "
      >
        <div className="space-y-4">
          <Badge variant="primary" className="w-fit">
            Ringkasan Nutrisi
          </Badge>

          <div className="space-y-2">
            <h2
              className="
                text-2xl font-bold tracking-tight
                text-textPrimary sm:text-3xl
              "
            >
              Pantau asupan nutrisi harianmu dengan mudah.
            </h2>

            <p
              className="
                max-w-2xl text-sm leading-6
                text-textSecondary sm:text-base
              "
            >
              Pantau kalori, protein, hidrasi, dan keseimbangan makronutrisi dalam satu dashboard yang mudah digunakan.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="default">Tambah makanan</Button>
          <Button variant="secondary">Lihat laporan</Button>
        </div>
      </div>
    </section>
  );
}

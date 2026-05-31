import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function AuthRequiredPanel() {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <Badge variant="primary">Sesi tidak aktif</Badge>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-textPrimary">Tidak ada sesi dashboard aktif</h3>
          <p className="mx-auto max-w-xl text-sm leading-6 text-textSecondary">Aksi di dalam dashboard dinonaktifkan saat kamu belum masuk. Silakan masuk terlebih dahulu untuk mengakses fitur penuh.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="primary">
            <Link to="/auth">Masuk</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link to="/auth?mode=register">Daftar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

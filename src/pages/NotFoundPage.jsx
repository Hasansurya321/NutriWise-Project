import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 text-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-borderPrimary bg-card p-8 shadow-xl">
        
        {/* Status Code */}
        <h1 className="text-8xl font-black tracking-tight text-primary animate-pulse">
          404
        </h1>

        {/* Info Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-textPrimary">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm text-textSecondary leading-relaxed">
            Maaf, halaman yang kamu cari tidak ada atau telah dipindahkan. Yuk, balik ke jalur yang benar!
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            onClick={() => navigate('/', { replace: true })} 
            className="w-full rounded-2xl py-3 font-semibold shadow-lg transition-transform hover:scale-[1.02]"
          >
            {
                user ? 'Kembali ke Dashboard' : 'Kembali ke menu Login'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
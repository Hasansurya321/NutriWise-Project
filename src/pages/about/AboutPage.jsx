import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { cn } from '../../utils/cn';
import { Logo } from '../../components/ui/Logo';
import { Book, Database, GitBranch, ImageDown, ImageIcon, Layout, Target } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function AboutPage() {

  const features = [
    {
      title: 'Pemindaian Makanan AI',
      description: 'Kenali jenis makanan dan estimasi kandungan nutrisinya hanya dengan mengambil foto.',
      icon: <ImageIcon />,
    },
    {
      title: 'Jurnal Nutrisi Personal',
      description: 'Catat asupan kalori dan makronutrisi harian Anda dengan mudah dan praktis.',
      icon: <Book />,
    },
    {
      title: 'Rekomendasi Buah buahan',
      description: 'Dapatkan rekomendasi buah-buahan untuk memenuhi asupan nutrisi harian Anda.',
      icon: <Target />,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader
        title="Tentang Aplikasi"
        description="Mengenal lebih dekat NutriCitra"
      />

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="mx-auto space-y-12">

          {/* Hero Section */}
          <section className="text-center space-y-6">
            <div className="mx-auto w-fit mt-20">
              <Logo size="lg" className="mx-auto" />
            </div>
            <div>
              <p className="text-textSecondary mt-2 max-w-xl mx-auto leading-relaxed">
                Nutri Citra adalah platform aplikasi untuk mendeteksi nutrisi dan kalori pada makanan yang memanfaatkan teknologi AI. Nutri Citra juga dapat membantu Anda mencapai target kesehatan optimal melalui pemantauan makanan yang mudah dan praktis.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-textPrimary px-1">Keunggulan Fitur</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-card border border-borderPrimary transition-all hover:shadow-sm hover:border-primary/30">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-textPrimary mb-2">{feature.title}</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mission */}
          <section className="rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Misi Kami</h2>
            <p className="text-textPrimary leading-relaxed max-w-2xl mx-auto">
              "Membangun ekosistem kesehatan digital yang inklusif dan intuitif, memberdayakan setiap individu untuk mengambil kendali penuh atas kesehatan nutrisi mereka tanpa ribet."
            </p>
          </section>

          {/* Contact / Links */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-textPrimary px-1">
              <span className='flex items-center justify-center gap-4'>
                <FaGithub className='text-foreground size-8' /> Repository
              </span>
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/evanazhr/nutricitra-backend" className="flex items-center justify-between p-4 rounded-2xl bg-card border border-borderPrimary hover:bg-borderPrimary/30 hover:text-primary transition-colors group">
                <span className='flex items-center gap-2'>
                  <Database />
                  <span>Repository Backend</span>
                </span>
              </a>
              <a href="https://github.com/Hasansurya321/NutriCitra-Project" className="flex items-center justify-between p-4 rounded-2xl bg-card border border-borderPrimary hover:bg-borderPrimary/30 hover:text-primary transition-colors group">
                <span className='flex items-center gap-2'>
                  <Layout />
                  <span>Repository Frontend</span>
                </span>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

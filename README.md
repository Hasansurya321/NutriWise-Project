# 🥗 NutriCitra Frontend Documentation

Nutri Citra adalah platform berbasis web yang dirancang untuk membantu
pengguna mengidentifikasi makanan dengan mengupload atau memfoto makanan
yang kemudian akan diprediksi oleh model ai untuk dihitung berapa nutrisi,
kalorinya, menghitung, dan memantau kandungan nutrisi serta kalori dari makanan
secara cerdas dan praktis dan juga terdapat sistem rekomendasi buah untuk
menyeimbangkan kalori harian pengguna.

Link Website : https://nutri-citra-project-6eik.vercel.app


---

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan kumpulan teknologi modern:

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## ⚙️ Persyaratan Sistem

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:
- **Node.js** (Versi 18 atau lebih baru direkomendasikan)
- **NPM** atau **Yarn**

---

## 🛠️ Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

1. **Clone repository ini**
   ```bash
   git clone https://github.com/Hasansurya321/NutriCitra-Project
   cd NutriCitra-Project
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Salin file `.env.example` menjadi `.env` lalu sesuaikan dengan URL backend Anda.
   ```bash
   cp .env.example .env
   ```
   Contoh isi `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

---

## ✨ Fitur Utama

- **Autentikasi:** Login dan Registrasi pengguna yang terhubung dengan JWT Token.
- **Onboarding UI**: Halaman onboarding untuk pengguna baru yang akan diisi saat pertama kali login.
- **Dashboard Nutrisi:** Ringkasan kalori, makronutrisi harian, dan rekomendasi hidangan.
- **AI Food Scanner (Predict):** Pengguna dapat mengambil foto atau mengunggah gambar makanan, dan AI akan otomatis mengenali makanan serta memperkirakan jumlah nutrisi (kalori, protein, lemak, karbohidrat).
- **Jurnal Makan:** Pencatatan konsumsi makanan harian secara otomatis dari AI Scanner maupun manual dan terdapat rekomendasi buah-buahan untuk menyeimbangkan nutrisi harian.
- **Riwayat:** Memantau riwayat makan sebelumnya.

---

## 📁 Struktur Direktori Utama

```
src/
├── components/     # Komponen UI reusable (auth, history, meals, predict, ui)
├── context/        # React Context API (Auth, ThemeContext)
├── hooks/          # Custom React Hooks (useDocumentTitle, dll)
├── layouts/        # Layout halaman (misalnya DashboardLayout)
├── pages/          # Komponen Halaman utama sesuai rute (Auth, Dashboard, dll)
├── routes/         # Konfigurasi routing (React Router)
├── services/       # Integrasi API endpoint menggunakan Axios Instance
├── utils/          # Fungsi utilitas pembantu (format data, dll)
└── lib/            # Library yang digunakan seperti Axios

```

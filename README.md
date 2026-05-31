# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

## 📋 Dokumentasi Local Storage

Data onboarding pengguna disimpan di `localStorage` dengan key **`onboarding_data`** (frontend-only, belum terhubung ke backend).

### Cara akses halaman onboarding

Buka manual di browser: `http://localhost:5173/onboarding`

### Struktur data yang disimpan

```json
{
  "age": 25,
  "gender": "male" | "female",
  "height": 170,
  "weight": 65,
  "isPregnant": false,
  "trimester": null,
  "calorieTarget": 2000,
  "proteinTarget": 65,
  "carbohydrateTarget": 260,
  "fatTarget": 80,
  "bmi": 22.5,
  "bmiCategory": "Normal",
  "createdAt": "2026-05-31T..."
}
```

### Field Description

| Field                | Type         | Description                                                  |
| -------------------- | ------------ | ------------------------------------------------------------ |
| `age`                | number       | Umur dalam tahun                                             |
| `gender`             | string       | `"male"` atau `"female"`                                     |
| `height`             | number       | Tinggi badan dalam cm                                        |
| `weight`             | number       | Berat badan dalam kg                                         |
| `isPregnant`         | boolean      | Status kehamilan (hanya relevan jika `gender === "female"`)  |
| `trimester`          | number/null  | Trimester kehamilan (1/2/3) atau null jika tidak hamil       |
| `calorieTarget`      | number       | Target kalori harian (kcal)                                  |
| `proteinTarget`      | number       | Target protein harian (g)                                    |
| `carbohydrateTarget` | number       | Target karbohidrat harian (g)                                |
| `fatTarget`          | number       | Target lemak harian (g)                                      |
| `bmi`                | number       | Indeks Massa Tubuh (kg/m²)                                   |
| `bmiCategory`        | string       | Kategori BMI: Kurus / Normal / Gemuk (Overweight) / Obesitas |
| `createdAt`          | string (ISO) | Timestamp saat data disimpan                                 |

### Catatan

- Data ini disimpan SEPENUHNYA di browser (localStorage).
- Suatu saat jika backend sudah siap, data ini bisa dikirim ke API profile endpoint.
- Tidak ada sinkronasi otomatis dengan backend untuk saat ini.

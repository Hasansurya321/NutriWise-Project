/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        surface2: 'var(--surface-2)',
        sidebar: 'var(--sidebar)',

        input: 'var(--input)',
        inputReadonly: 'var(--input-readonly)',
        inputHover: 'var(--input-hover)',
        inputActive: 'var(--input-active)',

        searchSurface: 'var(--search-surface)',
        searchSurfaceHover: 'var(--search-surface-hover)',
        searchSurfaceFocus: 'var(--search-surface-focus)',
        searchBorder: 'var(--search-border)',
        searchBorderHover: 'var(--search-border-hover)',
        searchBorderFocus: 'var(--search-border-focus)',
        searchText: 'var(--search-text)',
        searchPlaceholder: 'var(--search-placeholder)',
        searchIcon: 'var(--search-icon)',

        modalOverlay: 'var(--modal-overlay)',
        modalPanel: 'var(--modal-panel)',
        modalPanelBorder: 'var(--modal-panel-border)',

        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',

        borderPrimary: 'var(--border-primary)',
        borderStrong: 'var(--border-strong)',
        borderActive: 'var(--border-active)',

        primary: 'var(--primary)',
      },
    },
  },

  plugins: [],
};

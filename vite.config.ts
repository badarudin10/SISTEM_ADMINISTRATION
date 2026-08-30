import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SISTEM_ADMINISTRATION/', // Wajib sama dengan nama repository GitHub Anda
});


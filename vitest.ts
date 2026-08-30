import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pastikan TIDAK ADA opsi 'base' di sini
export default defineConfig({
  plugins: [react()],
});

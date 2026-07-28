import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_API_KEY = "AIzaSyBCtgf6ReEc2qQYKN0KIPMIAswUkOVISo";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || process.env.API_KEY || DEFAULT_API_KEY),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || process.env.GEMINI_API_KEY || DEFAULT_API_KEY)
  }
});


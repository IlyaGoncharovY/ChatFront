import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const BACK_URL = env.VITE_REACT_APP_BACK_URL;
  return {
    base:'/ChatFront',
    plugins: [react()],
    server: {
      proxy: {
        '/socket.io': {
          target: 'http://localhost:3009' || BACK_URL,
          changeOrigin: true,
          ws: true,
        },
      },
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
    },
  };});

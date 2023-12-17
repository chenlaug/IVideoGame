import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // nécessaires pour que le mappage du port du conteneur Docker fonctionne
    strictPort: true,
    port: 5173, // vous pouvez remplacer ce port par n'importe quel port
  },

})



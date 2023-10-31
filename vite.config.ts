import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      root: "/",
      src: "/src",
      server: "/server",
    }
  },
  // server: {
  //   port: 3000
  // }
  server: {
    proxy: {
      "/api": "http://localhost:3001/", // the address that u serve in the backend 
    },
  },
})

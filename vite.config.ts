import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {proxy: {"/api": "http://localhost:3002"}},
})

/*
https://www.youtube.com/watch?v=otaQKODEUFs
https://www.youtube.com/watch?v=VN27pdF3a6c

npm install typescript @types/node
npx tsc --init
npm install express @types/express
npm install --save-dev @babel/core @babel/preset-env @babel/plugin-proposal-decorators
npm install socket.io @types/socket.io
npx ts-node server.ts
npm install bcrypt cors
npm install @types/cors
npm install bcrypt cors dotenv @types/bcrypt @types/cors @types/dotenv
npm install nodemon --save-dev
npm install pg

*/
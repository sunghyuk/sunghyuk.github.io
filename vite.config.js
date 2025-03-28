import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 루트로 설정
  plugins: [react()],
  server: {
    open: true,       // 브라우저 자동 열기
    port: 5173        // 기본 Vite 포트 (원하면 변경 가능)
  }
});

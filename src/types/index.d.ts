export {};

declare global {
  interface Window {
    IntaSend: any; // 👈️ turn off type checking
  }
}
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        apartments: resolve(__dirname, "apartments.html"),
        apartmentsDetail: resolve(__dirname, "apartments.detail.html"),
        contact: resolve(__dirname, "contact.html"),
        login: resolve(__dirname, "login.html"),
        signup: resolve(__dirname, "signup.html"),
        book: resolve(__dirname, "book.html"),
        adminUsers: resolve(__dirname, "admin.users.html"),
        adminApartments: resolve(__dirname, "admin.apartments.html")
      }
    }
  }
});
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        apartments: resolve(__dirname, "apartments.html"),
        apartmentsDetail: resolve(__dirname, "apartments.detail.html"),
        book: resolve(__dirname, "book.html"),
        contact: resolve(__dirname, "contact.html"),
        login: resolve(__dirname, "login.html"),
        person: resolve(__dirname, "person.html"),
        signup: resolve(__dirname, "signup.html"),
        adminUsers: resolve(__dirname, "admin.users.html"),
        adminBooks: resolve(__dirname, "admin.books.html"),
        adminStatistics: resolve(__dirname, "admin.statistics.html"),
        adminAddApartments: resolve(__dirname, "admin.addaparments.html"),
      },
    },
  },
});
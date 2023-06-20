import "./globals.css";
import React from "react";
import { ThemeSwitcher, Providers } from "./Components";

export const metadata = {
  title: "Fake Spotify",
  description: "Faça uma playlist para o seu spotify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="h-screen dark:bg-black bg-green-400">
        <Providers>
          {children}
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}

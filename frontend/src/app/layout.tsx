// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "Task Manager",
  description: "A Trello-like task manager built with Next.js 13",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

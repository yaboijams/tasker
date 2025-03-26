// src/app/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "react-oidc-context";
import cognitoAuthConfig from "@/config/Cognito"; // Adjust path as needed

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      {children}
    </AuthProvider>
  );
}

"use client";

import { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

"use client";

import { AuthProvider, useAuthProvider } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();

  const [_, setAuth, __, ___, getJWT] = useAuthProvider();

  const [show, setShow] = useState(false);

  useEffect(() => {
    // handle no auth
    const token = getJWT();

    if (!token) {
      router.push("/");
    } else {
      setShow(true);
      setAuth(true);
    }
  });

  return <AuthProvider>{show && children}</AuthProvider>;
}

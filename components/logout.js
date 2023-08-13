"use client";

import { useAuthProvider } from "@/providers/auth";
import { useEffect, useState } from "react";

const Logout = () => {
  const [auth, __, resetJWT, ___, getJWT] = useAuthProvider();

  const [show, setShow] = useState(false);

  useEffect(() => {
    // handle no auth
    if (getJWT() || auth) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [auth]);

  const logout = () => {
    resetJWT();
  };

  return (
    show && (
      <button
        className="bg-secondary bg-opacity-20 py-2 px-8 rounded-3xl text-white font-semibold"
        onClick={logout}
      >
        Logout
      </button>
    )
  );
};

export default Logout;

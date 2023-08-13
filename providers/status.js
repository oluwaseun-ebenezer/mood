"use client";

import { createContext, useContext, useMemo, useState } from "react";

const StatusContext = createContext();

const useStatusProvider = () => {
  const context = useContext(StatusContext);
  if (!context)
    throw new Error("useStatusProvider must be used within a StatusProvider");
  return context;
};

const StatusProvider = (props) => {
  const [status, setStatus] = useState({
    loading: false,
  });

  const value = useMemo(() => [status, setStatus], [status]);

  return <StatusContext.Provider value={value} {...props} />;
};

export { useStatusProvider, StatusProvider };

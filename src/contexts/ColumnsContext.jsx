"use client";

import { useState, createContext } from "react";

export const ColumnsContext = createContext();

export default function ColumnsProvider({ children }) {
  const [columns, setColumns] = useState([]);

  const changeColumns = (newColumns) => {
    setColumns(newColumns);
  };

  return (
    <ColumnsContext.Provider
      value={{
        columns,
        changeColumns,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}

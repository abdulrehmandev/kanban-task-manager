"use client";

import { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) =>
    setUser({
      email: newUser.email,
      uid: newUser.uid,
    });

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);

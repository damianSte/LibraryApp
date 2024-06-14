// RoleContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Role = 'ROLE_ADMIN' | 'ROLE_READER' | null; // Allow null for initial state

interface RoleContextType {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export default function RoleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<Role>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

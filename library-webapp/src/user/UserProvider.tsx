import { useContext } from 'react';
import { createContext } from 'react';
import { LibraryUser } from './library-user';

const UserContext = createContext(new LibraryUser());

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = new LibraryUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

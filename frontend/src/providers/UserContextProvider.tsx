import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    console.log('Current userId:', user); // Log whenever userId changes
  }, [user]);

  const handleSetUserId = (id: string | null) => {
    console.log('Setting userId:', id);
    setUser(id); // Update userId state
  };

  return (
    <UserContext.Provider value={{ userId: user, setUserId: handleSetUserId }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useContext, type ReactNode } from 'react'
import { mockUser, type MockUser } from '../mocks/user'

const UserContext = createContext<MockUser | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  return <UserContext.Provider value={mockUser}>{children}</UserContext.Provider>
}

export function useUser(): MockUser {
  const user = useContext(UserContext)
  if (!user) {
    throw new Error('useUser must be used within UserProvider')
  }
  return user
}

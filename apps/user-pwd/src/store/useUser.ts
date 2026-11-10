import { create } from 'zustand';
import type { User } from '@sunrise-hub/shared';

interface UserStore {
    user: User | null;
    setUser: (data: User) => void;
}
const useUser = create<UserStore>((set) => {
    user: { },
    setUser: (data: User) => set({ user: data })
})

export default useUser;
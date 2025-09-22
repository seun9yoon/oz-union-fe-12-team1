import { create } from 'zustand';

export const useAuth = create((set) => ({
  user: null,
  login: async ({ email, password }) => {
    if (email === 'test@gmail.com' && password === 'pass1234') {
      set({
        user: { id: 'u1', email, username: 'Tester' },
      });
    } else {
      throw new Error('INVALID_CREDENTIALS');
    }
  },
  logout: () => set({ user: null }),
}));

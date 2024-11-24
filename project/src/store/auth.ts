import { atom } from 'jotai';

interface AuthState {
  token: string | null;
  wallet: string | null;
  isAdmin: boolean;
}

export const authAtom = atom<AuthState>({
  token: null,
  wallet: null,
  isAdmin: false,
});
import { create } from 'zustand';

interface AuthCInterface {
   text: string;
   component: number;
   setText: () => void;
   setComponent: () => void;
}
export const AuthComponentSwitch = create<AuthCInterface>()((set) => ({
   text: 'Sign Up',
   component: 0,
   setText: () => set((state) => ({ ...state, text: state.text == 'Sign Up' ? 'Login' : 'Sign Up' })),
   setComponent: () => set((state) => ({ ...state, component: state.component == 0 ? 1 : 0 })),
}));

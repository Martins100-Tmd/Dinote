import { create } from 'zustand';

export const useStore = create((set) => ({
   expand: false,
   count: 0,
   slide: false,
   action: 'expand_more',
   setAction: () => set((state: any) => ({ ...state, action: state.action === 'expand_more' ? 'expand_less' : 'expand_more' })),
   setExpand: () => set((state: any) => ({ ...state, expand: !state.expand })),
   setCount: () => set((state: any) => ({ ...state, count: state.count + 1 })),
   setSlide: () => set((state: any) => ({ ...state, slide: !state.slide })),
}));

export const useStoreII = create((set) => ({
   addnote: false,
   notename: '',
   setAddNote: () => set((state: any) => ({ ...state, addnote: !state.addnote })),
   setNoteName: (val: string) => set((state: any) => ({ ...state, notename: val })),
}));

import { create } from 'zustand';

export const PageStore = create((set) => ({
   newPage: false,
   clickedPageId: '',
   setClickedPageId: (id: string) => set((s: any) => ({ ...s, clickedPageId: id })),
   setNewPage: () => set((state: any) => ({ ...state, newPage: !state.newPage })),
}));

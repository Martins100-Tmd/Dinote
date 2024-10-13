import { create } from 'zustand';

export const PageStore = create((set) => ({
   newPage: false,
   clickedPageId: '',
   setClickedPageId: (id: string) => set((s: any) => ({ ...s, clickedPageId: id })),
   setNewPage: (val?: string) => set((state: any) => ({ ...state, newPage: val ?? !state.newPage })),
}));

let sortFunctions = {
   None: (list: any) => {
      return list;
   },
   Alphabet: (list: any) => {
      return list.sort((a, b) => a[0] - b[0]);
   },
   Created: (list: any) => {
      return list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
   },
   Updated: (list: any) => {
      return list.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
   },
};
export const SortBy = create((set) => ({
   key: 'None',
   setKey: (val: string) => set((state: any) => ({ ...state, key: val ?? 'None', action: sortFunctions[state.key] })),
   action: () => {},
}));

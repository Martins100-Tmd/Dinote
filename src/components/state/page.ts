import { create } from 'zustand';
import { PageIdState, pageControllState, sortType } from '../../types/page';

export const PageStore = create<pageControllState>()((set) => ({
   newPage: false,
   clickedPageId: '',
   setClickedPageId: (id: string) => set((s: any) => ({ ...s, clickedPageId: id })),
   setNewPage: (val?: string) => set((state: any) => ({ ...state, newPage: val ?? !state.newPage })),
}));

export const sortAction = create<sortType>()((set) => ({
   action: 'None',
   setAction: (val: string) => set((state) => ({ ...state, action: val })),
}));

export const PageCurrentId = create<PageIdState>()((set) => ({
   pageId: '',
   getSignal: 1,
   setPageId: (id: string) => set((state) => ({ ...state, pageId: id })),
   setSignal: () => set((state) => ({ ...state, getSignal: Math.floor(Math.random() * 1000) })),
}));

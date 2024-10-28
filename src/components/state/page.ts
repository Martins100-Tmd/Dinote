import { create } from 'zustand';

export const PageStore = create((set) => ({
   newPage: false,
   clickedPageId: '',
   setClickedPageId: (id: string) => set((s: any) => ({ ...s, clickedPageId: id })),
   setNewPage: (val?: string) => set((state: any) => ({ ...state, newPage: val ?? !state.newPage })),
}));

interface sortType {
   action: string;
   setAction: (val: string) => void; // setAction should return void, not {}
}

export const sortAction = create<sortType>()((set) => ({
   action: 'None', // This is the initial state
   setAction: (val: string) => set((state) => ({ ...state, action: val })), // Action to update state
}));

export interface PageIdState {
   pageId: string;
   getSignal: number;
   setPageId: (id: string) => void;
   setSignal: () => void;
}

export const PageCurrentId = create<PageIdState>()((set) => ({
   pageId: '',
   getSignal: 1,
   setPageId: (id: string) => set((state) => ({ ...state, pageId: id })),
   setSignal: () => set((state) => ({ ...state, getSignal: Math.floor(Math.random() * 1000) })),
}));

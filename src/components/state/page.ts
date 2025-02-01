import { create } from 'zustand';
import { PageIdState, pageControlState, pageTextStateInterface, sortType } from '../../types/page';

export const PageStore = create<pageControlState>()((set) => ({
   newPage: false,
   setNewPage: (val?: string) => set((state: any) => ({ ...state, newPage: val })),
}));

export const sortAction = create<sortType>()((set) => ({
   action: 'None',
   setAction: (val: boolean) => set((state) => ({ ...state, action: val })),
}));

export const PageCurrentId = create<PageIdState>()((set) => ({
   pageId: '',
   getSignal: 1,
   setPageId: (id: string) => set((state) => ({ ...state, pageId: id })),
   setSignal: () => set((state) => ({ ...state, getSignal: Math.floor(Math.random() * 1000) })),
}));

export const pageTextState = create<pageTextStateInterface>()((set) => ({
   title: '',
   content: '',
   setTitle: (val: string) => set((s) => ({ ...s, title: val })),
   setContent: (val: string) => set((s) => ({ ...s, content: val })),
}));

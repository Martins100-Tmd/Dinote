import { create } from 'zustand';

export const sectionId = create((set) => ({
   currSectId: '',
   setCurrSectId: (id: string) => set((s: any) => ({ ...s, currSectId: id })),
}));

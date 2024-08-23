import React, { ReactNode, createContext, useState } from 'react';

interface NotePageState {
   currpageid: string;
}

interface PageContextT {
   notePageState: NotePageState;
   setPageId: (id: string) => void;
}

const defaultState: PageContextT = {
   notePageState: { currpageid: '' },
   setPageId: () => {},
};

export const PageContext = createContext<PageContextT>(defaultState);

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
   const [notePageState, setNotePageState] = useState<NotePageState>({ currpageid: '' });

   const setPageId = (id: string) => setNotePageState({ currpageid: id });

   return <PageContext.Provider value={{ notePageState, setPageId }}>{children}</PageContext.Provider>;
};

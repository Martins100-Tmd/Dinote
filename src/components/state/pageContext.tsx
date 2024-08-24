import { ReactNode, createContext, useState } from 'react';

interface NotePageState {
   currpageid: string;
   pagelistempty: boolean;
   sectpageid: string;
   newPage: boolean;
}

interface PageContextT {
   notePageState: NotePageState;
   setPageId: (id: string) => void;
   setPageEmp: (val: boolean) => void;
   setSectId: (id: string) => void;
   setNewPage: () => void;
}

const defaultState: PageContextT = {
   notePageState: { currpageid: '', pagelistempty: true, sectpageid: '', newPage: false },
   setPageId: () => {},
   setPageEmp: () => {},
   setSectId: () => {},
   setNewPage: () => {},
};

export const PageContext = createContext<PageContextT>(defaultState);

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
   const [notePageState, setNotePageState] = useState<NotePageState>({
      currpageid: '',
      pagelistempty: true,
      sectpageid: '',
      newPage: false,
   });

   const setPageId = (id: string) => setNotePageState((prev) => ({ ...prev, currpageid: id }));
   const setPageEmp = (val: boolean) => setNotePageState((prev) => ({ ...prev, pagelistempty: val }));
   const setSectId = (id: string) => setNotePageState((prev) => ({ ...prev, sectpageid: id }));
   const setNewPage = () => setNotePageState((prev) => ({ ...prev, newPage: !prev.newPage }));

   return <PageContext.Provider value={{ setNewPage, notePageState, setPageId, setPageEmp, setSectId }}>{children}</PageContext.Provider>;
};

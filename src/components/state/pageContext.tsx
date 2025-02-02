// import { ReactNode, createContext, useState } from 'react';

// const defaultState: PageContextT = {
//    notePageState: { currpageid: '', pagelistempty: true, sectpageid: '', newPage: false },
//    setPageId: () => {},
//    setPageEmp: () => {},
//    setSectId: () => {},
//    setNewPage: () => {},
// };

// export const PageContext = createContext<PageContextT>(defaultState);

// export const PageContextProvider = ({ children }: { children: ReactNode }) => {
//    const [notePageState, setNotePageState] = useState<NotePageState>({
//       currpageid: localStorage.getItem('currpageid') ?? '',
//       pagelistempty: true,
//       sectpageid: '',
//       newPage: false,
//    });

//    const setPageId = (id: string) => setNotePageState((prev) => ({ ...prev, currpageid: id }));
//    const setPageEmp = (val: boolean) => setNotePageState((prev) => ({ ...prev, pagelistempty: val }));
//    const setSectId = (id: string) => setNotePageState((prev) => ({ ...prev, sectpageid: id }));
//    const setNewPage = (id?: boolean) => setNotePageState((prev) => ({ ...prev, newPage: id ?? !prev.newPage }));

//    return <PageContext.Provider value={{ setNewPage, notePageState, setPageId, setPageEmp, setSectId }}>{children}</PageContext.Provider>;
// };

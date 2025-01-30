export interface PageIdState {
   pageId: string;
   getSignal: number;
   setPageId: (id: string) => void;
   setSignal: () => void;
}

export interface sortType {
   action: string;
   setAction: (val: string) => void;
}

export interface pageControllState {
   newPage: boolean;
   clickedPageId: string;
   setClickedPageId: (id: string) => void;
   setNewPage: (val: string) => void;
}

export interface pageTextStateInterface {
   title: string;
   content: string;
   setTitle: (val: string) => void;
   setContent: (val: string) => void;
}

export interface NotePageState {
   currpageid: string;
   pagelistempty: boolean;
   sectpageid: string;
   newPage: boolean;
}

export interface PageContextT {
   notePageState: NotePageState;
   setPageId: (id: string) => void;
   setPageEmp: (val: boolean) => void;
   setSectId: (id: string) => void;
   setNewPage: (id?: boolean) => void;
}

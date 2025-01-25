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

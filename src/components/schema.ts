interface Pages {
   text: string;
   data: Date;
   time: Date;
   section: Sections;
}

interface Sections {
   date: Date;
   time: Date;
   noteName: string;
   notebook: NoteBook;
}

interface NoteBook {
   date: Date;
   time: Date;
}

interface User {
   name: string;
   email: string;
   password: string;
}

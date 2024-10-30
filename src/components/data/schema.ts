type ObjT = {
   note: string;
   id: string;
   section: { title: string; pages: string[] }[];
};

export type dataT = ObjT[];

export let Notedata = [
   {
      note: 'Martins Notebook',
      id: 'MART101',
      section: [
         {
            title: 'Sleek Routine',
            pages: ['Wake', 'Pray', 'Exercise', 'Take bathe'],
         },
      ],
   },
];

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
         {
            title: 'Section 2',
            pages: ['Page I', 'Page II', 'Page III', 'Page IV'],
         },
      ],
   },
   {
      note: 'My Notebook',
      id: 'My101',
      section: [
         {
            title: 'Bob Marley',
            pages: ['One drop', 'Lively Up', 'Redemption', 'Time will tell'],
         },
      ],
   },
];

import { useQuery } from '@tanstack/react-query';
import { UtilFunc, backendAPI } from '../../..';
import LoadingSectionList from './loading';
import SectionList from './sectionList';
import { useEffect, useState, useContext } from 'react';
import createNoteState from '../../state/context';
import { PageContext } from '../../state/pageContext';
import sectionContext from '../../state/sectContext';

export default function SectionContainer({ id }: { id: string }) {
   let {
      state: { noteObj },
   } = useContext(createNoteState);
   let [sectionData, setSectionData] = useState<any[]>([{ title: '', id: '' }]);
   let [ID, setID] = useState(id);
   let {
      setCurrSection,
      sectionState: { currsection },
   } = useContext(sectionContext);

   let sectionQuery = useQuery({
      queryKey: ['sectionList', ID],
      queryFn: () => fetchNoteSection(noteObj ? noteObj['id'] : id),
      refetchOnMount: 'always',
      enabled: !!ID,
   });

   useEffect(() => setID(id ?? noteObj['id']), [id, noteObj]);

   useEffect(() => {
      if (sectionQuery.isSuccess) {
         setSectionData(sectionQuery.data.data);
         setCurrSection(sectionData[0]['id']);
         console.log(sectionData, currsection);
      }
   }, [sectionQuery.isError, sectionQuery.data, sectionQuery.isLoading]);

   if (sectionQuery.isLoading) return <LoadingSectionList />;
   if (sectionQuery.isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{sectionQuery.error.message}</p>
         </div>
      );
   return (
      sectionQuery.data &&
      sectionData &&
      sectionData.map &&
      (noteObj || id) &&
      sectionData.map((item: any, index: number) => <SectionList key={index} item={item} fn={UtilFunc.randomColor} />)
   );
}

const fetchNoteSection = async (id: string) => {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/section/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return id ? await A.json() : new Promise((res) => res([]));
};

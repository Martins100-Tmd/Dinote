import { useQuery } from '@tanstack/react-query';
import LoadingSectionList from './loading';
import SectionList from './sectionList';
import { useEffect, useContext, useMemo } from 'react';
import createNoteState from '../../state/context';
import { fetchNoteSection } from './op';
import sectionContext from '../../state/sectContext';
import { PageContext } from '../../state/pageContext';

export default function SectionContainer({ id }: { id: string }) {
   let {
      state: { noteObj },
   } = useContext(createNoteState);
   let { setCurrSection } = useContext(sectionContext);
   let { setNewPage } = useContext(PageContext);

   let ID = useMemo(() => (noteObj ? noteObj['id'] : ''), [noteObj]);

   let { data, isSuccess, isLoading, isError, error, status } = useQuery({
      queryKey: ['sectionList', ID],
      queryFn: () => fetchNoteSection(noteObj ? ID : id),
      refetchOnMount: false,
      enabled: !!ID,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
   });

   useEffect(() => {
      let empty = JSON.stringify([]);
      if (data && JSON.stringify(data['data']) == empty) {
         setNewPage(false);
         localStorage.setItem('sectpageid', '');
         setCurrSection(localStorage.getItem('sectpageid') ?? '');
      }
      if (isSuccess && data && data['data'] && data['data'][0]) {
         localStorage.setItem('sectpageid', data['data'][0]['id']);
         setCurrSection(localStorage.getItem('sectpageid') ?? '');
      }
      if (isLoading) console.log('SectionContainer loading...');
   }, [status, data]);

   if (isLoading) return <LoadingSectionList />;

   if (isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{error?.message}</p>
         </div>
      );
   if (isSuccess && data) {
      return data && (noteObj || id) && data.data.map((item: any, index: number) => <SectionList key={index} item={item} />);
   }
}

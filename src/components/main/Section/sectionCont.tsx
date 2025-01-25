import { useQuery } from '@tanstack/react-query';
import LoadingSectionList from './loading';
import SectionItem from './sectionItem';
import { useEffect, useContext, useMemo } from 'react';
import { fetchNoteSection } from './op';
import { PageContext } from '../../state/pageContext';
import { sectionId, sectionIdStore } from '../../state/section';

export default function SectionContainer({ id }: { id: string }) {
   const { setNewPage } = useContext(PageContext);
   const setSectionId = sectionIdStore((state: sectionId) => state.setSectionId);

   const { data, isSuccess, isLoading, isError, error, status } = useQuery({
      queryKey: ['sectionList', id],
      queryFn: () => fetchNoteSection(id ?? ''),
      refetchOnMount: false,
      enabled: !!id,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
   });

   const isEmptyData = useMemo(() => data && JSON.stringify(data.data) == '[]', [status, data]);

   useEffect(() => {
      if (isEmptyData) setNewPage(false), setSectionId('');
      if (isSuccess && data && data.data && data.data[0]) setSectionId(data['data'][0]['id']);
   }, [status, data]);

   if (isLoading) return <LoadingSectionList />;

   if (isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-sand text-base text-center text-white'>{error?.message}</p>
         </div>
      );

   if (isSuccess && data) {
      return data && id && data.data.map((item: any, index: number) => <SectionItem key={index} item={item} />);
   }
}

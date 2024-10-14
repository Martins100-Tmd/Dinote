import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useContext, useEffect, useState } from 'react';
import { fetchSectionPages } from './fetch';
import { PageContext } from '../../state/pageContext';
import sectionContext from '../../state/sectContext';
import { sortAction } from '../../state/page';
import { sortFunctions } from './fetch';
import createNoteState from '../../state/context';

export default function PageListContainer() {
   let {
      sectionState: { currsection },
   } = useContext(sectionContext);
   let {
      notePageState: { currpageid },
   } = useContext(PageContext);

   let { setNewPage, setPageId } = useContext(PageContext);
   let { action } = sortAction();
   let [DATA, SETDATA] = useState<any[]>([]);

   let { isSuccess, isLoading, isError, error, data, status } = useQuery({
      queryKey: ['fetchSectionPages', currsection],
      queryFn: () => fetchSectionPages(currsection),
      enabled: !!currsection,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
      refetchOnMount: false,
   });

   let emptyData: string = '[]';

   useEffect(() => {
      if (currpageid || (data && JSON.stringify(data['data']) == emptyData)) setNewPage(false);
      if (data && isSuccess) {
         if (!currpageid) {
            if (data['data'] && data['data'][0])
               localStorage.setItem('currpageid', data['data'][0].id), setPageId(localStorage.getItem('currpageid') ?? '');
         }
      }
   }, [currpageid, status]);

   useEffect(() => {
      let empty = JSON.stringify([]);
      if (data && data['data'] && data['data'][0]) {
         if (!localStorage.getItem('currpageid')) localStorage.setItem('currpageid', data['data'][0].id);
         setPageId(localStorage.getItem('currpageid') ?? '');
      }
      if ((data && JSON.stringify(data['data']) == empty) || data == undefined)
         localStorage.setItem('currpageid', ''), setPageId(localStorage.getItem('currpageid') ?? '');
   }, [currsection]);

   useEffect(() => {
      data && data['data'] && SETDATA(sortFunctions[action](data['data']));
   }, [action, currsection]);

   if (isLoading) return <LoadingPageList />;
   if (isError) return <>{error?.message}</>;
   if (isSuccess) {
      if (JSON.stringify(data['data']) == emptyData) {
      } else {
         return DATA.length > 0
            ? DATA.map((item: any, index: number) => <PageItem item={item} key={index} />)
            : data['data'] && data.data.map((item: any, index: number) => <PageItem item={item} key={index} />);
      }
   }
}

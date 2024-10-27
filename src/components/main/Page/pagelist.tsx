import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useContext, useEffect, useMemo, useState } from 'react';
import { fetchSectionPages } from './fetch';
import { PageContext } from '../../state/pageContext';
import sectionContext from '../../state/sectContext';
import { PageCurrentId, PageIdState, sortAction } from '../../state/page';
import { sortFunctions } from './fetch';
import { sectionId, sectionIdStore } from '../../state/section';
import createNoteState from '../../state/context';

export default function PageListContainer() {
   let {
      sectionState: { currsection },
   } = useContext(sectionContext);
   let {
      notePageState: { currpageid },
   } = useContext(PageContext);
   let sectionId = sectionIdStore((state: sectionId) => state.sectionId);
   let { setNewPage } = useContext(PageContext);
   let { action, setAction } = sortAction();
   let [DATA, SETDATA] = useState<any[]>([]);
   let [pageId, setPageId] = PageCurrentId((state: PageIdState) => [state.pageId, state.setPageId]);

   useEffect(() => console.log(pageId), [pageId]);

   let { isSuccess, isLoading, isError, error, data, status } = useQuery({
      queryKey: ['fetchSectionPages', sectionId],
      queryFn: () => fetchSectionPages(sectionId),
      enabled: !!sectionId,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
      refetchOnMount: false,
   });

   let isDataEmpty = useMemo(() => data && JSON.stringify(data.data) == '[]', [data]);

   useEffect(() => {
      if (currpageid || isDataEmpty) setNewPage(false);
      if (data && isSuccess && !currpageid && data.data && data.data[0]) {
         localStorage.setItem('currpageid', data.data[0].id), setPageId(localStorage.getItem('currpageid') ?? '');
      }
   }, [currpageid, status]);

   useEffect(() => {
      if (data && data.data && data.data[0]) setPageId(data.data[0].id ?? '');
      if (isDataEmpty || data == undefined) setPageId(pageId ?? '');
      console.log('Page List should change if a new section ID!!');
   }, [sectionId]);

   useEffect(() => {
      setAction('None');
      data && data.data && SETDATA(sortFunctions[action](data.data));
   }, [action, sectionId]);

   if (isLoading) return <LoadingPageList />;
   if (isError) return <>{error?.message}</>;
   if (isSuccess) {
      if (JSON.stringify(data.data) !== '[]')
         return DATA.length > 0
            ? DATA.map((item: any, index: number) => <PageItem item={item} key={index} />)
            : data.data && data.data.map((item: any, index: number) => <PageItem item={item} key={index} />);
   }
}

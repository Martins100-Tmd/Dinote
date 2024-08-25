import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useEffect, useContext } from 'react';
import sectionContext from '../../state/sectContext';
import { fetchSectionPages } from './fetch';

export default function PageListContainer() {
   let {
      sectionState: { currsection },
   } = useContext(sectionContext);
   //let { setPageEmp, setPageId } = useContext(PageContext);
   let pageQuery = useQuery({
      queryKey: ['fetchSectionPages', currsection],
      queryFn: () => fetchSectionPages(currsection),
      enabled: !!currsection,
   });

   useEffect(() => {
      if (pageQuery.isSuccess && pageQuery.data) {
         console.log(pageQuery.data);
      }
   }, [pageQuery.status, pageQuery.data]);

   if (pageQuery.isLoading) return <LoadingPageList />;
   if (pageQuery.isError) return <>{pageQuery.error.message}</>;
   return pageQuery.data.data.map((item: any, index: number) => <PageItem item={item} key={index} />);
}

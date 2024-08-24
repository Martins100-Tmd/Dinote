import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import LoadingPageList from './loadingpages';
import PageItem from './pageitem';
import { useEffect, useState, useContext } from 'react';
import { PageContext } from '../../state/pageContext';
import sectionContext from '../../state/sectContext';

const fetchSectionPages = async function (id: string) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/page/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

export default function PageListContainer() {
   let {
      sectionState: { currsection },
   } = useContext(sectionContext);
   let { setPageEmp, setPageId } = useContext(PageContext);
   let pageQuery = useQuery({
      queryKey: ['fetchSectionPages', currsection],
      queryFn: () => fetchSectionPages(currsection),
      enabled: !!currsection,
   });
   let [pageData, setPageData] = useState<any[]>([]);

   useEffect(() => {
      if (pageQuery.isSuccess && pageQuery.data) {
         setPageData(pageQuery.data.data);
         pageData.length == 0 ? setPageEmp(true) : setPageEmp(false);
         if (pageData.length != 0) setPageId(pageData[0]['id']);
      }
   }, [pageQuery.status, pageQuery.data]);

   if (pageQuery.isLoading) return <LoadingPageList />;
   if (pageQuery.isError) return <>{pageQuery.error?.message}</>;
   return pageData.map && pageData.map((item: any, index: number) => <PageItem item={item} key={index} />);
}

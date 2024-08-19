import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import LoadingPageList from './loadingpages';
import { PageItem } from './pageitem';
import { sectionId } from '../../state/section';
import { useEffect } from 'react';

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
   let currSectId = sectionId((s: any) => s.currSectId);
   let pageQuery = useQuery({ queryKey: ['fetchSectionPages', currSectId], queryFn: () => fetchSectionPages(currSectId) });

   useEffect(() => console.log(currSectId), [currSectId]);

   if (pageQuery.isLoading) return LoadingPageList;
   if (pageQuery.isError) console.log(pageQuery.error);
   if (pageQuery.isSuccess && pageQuery.data && pageQuery.data.map) {
      return pageQuery.data.map((item: any) => {
         return <PageItem item={item} />;
      });
   }
}

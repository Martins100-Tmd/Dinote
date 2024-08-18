import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import LoadingPageList from './loadingpages';
import { PageItem } from './pageitem';
import { sectionId } from '../../state/section';

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

   if (pageQuery.isLoading) return LoadingPageList;
   if (pageQuery.isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{pageQuery.error.message}</p>
         </div>
      );
   if (pageQuery.isSuccess && pageQuery.data && pageQuery.data.map) {
      return pageQuery.data.map((item: any) => {
         return <PageItem item={item} />;
      });
   }
}

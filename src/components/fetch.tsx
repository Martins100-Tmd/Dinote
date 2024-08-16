import { useQuery } from '@tanstack/react-query';
let URL = 'https://api.github.com/users/Martins100-Tmd';

export default function FetchCom() {
   const { isPending, data, error } = useQuery({
      queryKey: ['datapost'],
      queryFn: async () => {
         const request = await fetch(URL);
         return request.json();
      },
   });

   if (isPending)
      return (
         <div className='sm:w-1/2 mx-auto mt-10 text-center flex justify-center'>
            <i className='material-icons animate-spin text-3xl text-center'>settings</i>
         </div>
      );

   if (error) return <div>{JSON.stringify(error)}</div>;

   return <section>{JSON.stringify(data)}</section>;
}

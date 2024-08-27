import { UseMutationResult, useMutation } from '@tanstack/react-query';

export default function PostPage() {
   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         console.log(data);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         console.log(error);
      },
   });

   return (
      <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
         <section className='flex flex-col items-center gap-3'>
            <Input />
            <div className='flex flex-row items-center w-full justify-between'>
               <p className='text-start w-full font-raj text-slate-200'>{formattedDate}</p>
               <p className='text-start w-1/4 font-raj text-slate-200'>{formattedTime}</p>
            </div>
         </section>
         <TextArea />
      </section>
   );
}

interface FormInt {
   body: { title: string; content: string };
   addMutation: UseMutationResult<any, Error, any, unknown>;
   setbody: Function;
}

function Input({ addMutation, body, setbody }: FormInt) {
   return (
      <input
         onBlur={() => {
            body.title ? addMutation.mutate(body) : '', console.log(body);
         }}
         onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setbody((bd: any) => ({ ...bd, title: target.value }));
         }}
         value={body.title}
         type='text'
         className='w-full outline-none border-b bg-transparent border-slate-200 font-raj text-slate-100 text-3xl font-medium'
         autoFocus
      />
   );
}

function TextArea({ body, addMutation, setbody }: FormInt) {
   return (
      <textarea
         onBlur={() => (body.title ? addMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setbody((bd: any) => ({ ...bd, content: target.value }));
         }}
         value={body.content}
         className='text-slate-100 text-xl w-full h-full font-raj text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
import { UseMutationResult } from '@tanstack/react-query';

export default function PostPage() {
   return <></>;
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

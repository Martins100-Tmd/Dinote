import useGlobalReducer from '../utils/hooks/reducer';
import { useMutation } from '@tanstack/react-query';
import { LoginFn } from '../utils/fetch';
import { FormImg } from '..';

export default function Login() {
   let { handleChange, state } = useGlobalReducer();

   const mutation = useMutation({
      mutationFn: (data: any) => LoginFn(data),
      mutationKey: ['login'],
      onSuccess: (data) => {
         localStorage.setItem(':tk:', data.token), data && data['token'] && setTimeout(() => (location.href = '/home'), 200);
      },
      onError: (err) => console.log(err),
   });

   return (
      <section className='w-full h-full flex flex-col items-start gap-10'>
         <div className='w-full flex justify-start'>
            <p className='font-play text-3xl font-medium text-white underline-offset-2'>Log in</p>
         </div>
         <section className='flex flex-col items-center w-full gap-10'>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-play font-medium sm:text-base text-sm text-slate-200'>
                  Your Email
               </label>
               <input
                  name='email'
                  onChange={handleChange}
                  required
                  type='email'
                  className='p-3 text-white w-full text-xs border-b-2 outline-none sm:bg-[#0e0406] bg-[#0e0406]/60 border rounded border-[#2c2c2c] font-play'
                  alt='email'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-play font-medium sm:text-base text-sm text-slate-200'>
                  Password
               </label>
               <input
                  name='password'
                  onChange={handleChange}
                  required
                  type='password'
                  className='p-3 text-white w-full text-xs border-[#2c2c2c] border-b-2 outline-none sm:bg-[#0e0406] bg-[#0e0406]/60 rounded font-play'
                  alt='password'
               />
            </div>
            <section className='sm:mb-[10%] mb-[5%] w-full flex justify-center'>
               <button
                  onClick={async () => {
                     state.credentials.email && state.credentials.password
                        ? mutation.mutate(state.credentials)
                        : console.log('Make sure all field are filled');
                  }}
                  className='rounded-lg shadow p-3.5 w-full text-white mx-auto border border-[#2c2c2c] sm:bg-[#302e2f] bg-[#25070d]/50'
               >
                  <p className='font-play font-medium text-xs sm:text-lg text-center self-center'>Submit</p>
               </button>
            </section>
         </section>
      </section>
   );
}

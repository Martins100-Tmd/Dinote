import useGlobalReducer from '../utils/hooks/reducer';
import { useMutation } from '@tanstack/react-query';
import { LoginFn } from '../utils/fetch';

export default function Login() {
   let { handleChange, state } = useGlobalReducer();

   const mutation = useMutation({
      mutationFn: (data: any) => LoginFn(data),
      mutationKey: ['login'],
      onSuccess: (data) => {
         console.log(data);
         localStorage.setItem(':tk:', data.token), data && data['token'] && setTimeout(() => (location.href = '/home'), 200);
      },
      onError: (err) => console.log(err),
   });

   return (
      <section className='w-full h-full flex flex-col items-start gap-10'>
         <div className='w-full flex justify-start'>
            <p className='font-raj text-3xl font-semibold text-white underline-offset-2'>Log in</p>
         </div>
         <section className='flex flex-col items-center w-full gap-10'>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-raj font-semibold sm:text-lg text-sm text-slate-200'>
                  Your Email
               </label>
               <input
                  name='email'
                  onChange={handleChange}
                  required
                  type='email'
                  className='px-1 py-1.5 text-slate-50 w-full border-b-2 outline-none bg-transparent border-[#555555] font-raj'
                  alt='email'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-raj font-semibold sm:text-lg text-sm text-slate-200'>
                  Password
               </label>
               <input
                  name='password'
                  onChange={handleChange}
                  required
                  type='password'
                  className='px-1 py-1.5 text-slate-50 w-full border-b-2 outline-none bg-transparent border-[#555555] font-raj'
                  alt='password'
               />
            </div>
            <section className='sm:mb-[10%] mb-[5%] w-full flex justify-center'>
               <button
                  onClick={async () => {
                     // console.log(state.credentials);

                     // console.log(await A.json());
                     state.credentials.email && state.credentials.password
                        ? mutation.mutate(state.credentials)
                        : console.log('Make sure all field are filled');
                  }}
                  className='rounded-2xl shadow p-4 w-full mx-auto font-raj font-semibold text-xl bg-[#555555]'
               >
                  Submit
               </button>
            </section>
         </section>
      </section>
   );
}

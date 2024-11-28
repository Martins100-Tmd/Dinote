import { FormImg, Login, Signup } from '..';
import useGlobalReducer from '../utils/hooks/reducer';
import { useEffect } from 'react';

const Authentication: React.FC = function () {
   let { changeAuthText, state, changeAuthComp } = useGlobalReducer();
   let auth_components = [<Login />, <Signup />][state.auth.component];

   useEffect(() => {
      console.log(state.credentials);
   }, [state]);

   return (
      <section className='w-full h-screen bg-black flex justify-center relative'>
         <img src={FormImg} className='sm:hidden flex object-cover w-full h-full absolute inset-0 z-0' alt='red' loading='lazy' />
         <section className='sm:relative absolute inset-0 z-50 sm:w-3/4 h-full sm:h-[90%] rounded border border-[#2c2c2c] p-5 mx-auto my-auto justify-between w-full flex flex-row-reverse gap-3 sm:bg-[#191919] bg-[#191919]/60'>
            <div className='flex flex-col-reverse items-center w-full self-center sm:mt-auto -mt-20'>
               <div className='w-full flex justify-end'>
                  <p
                     onClick={() => {
                        changeAuthText(), changeAuthComp();
                     }}
                     className='font-play text-end self-end text-base font-bold text-white cursor-pointer'
                  >
                     {state.auth.text}
                  </p>
               </div>
               <div className='h-auto w-full'>{auth_components}</div>
            </div>
            <div className='sm:flex hidden w-full h-full'>
               <img
                  src={FormImg}
                  loading='lazy'
                  className='object-cover w-full h-full rounded-lg rounded-tl-3xl rounded-br-3xl'
                  alt='red'
               />
            </div>
         </section>
      </section>
   );
};

export default Authentication;

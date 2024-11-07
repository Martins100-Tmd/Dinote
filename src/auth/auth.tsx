import { Login, Signup } from '..';
import useGlobalReducer from '../utils/hooks/reducer';
import { useEffect } from 'react';

const Authentication: React.FC = function () {
   let { changeAuthText, state, changeAuthComp } = useGlobalReducer();
   let auth_components = [<Login />, <Signup />][state.auth.component];

   useEffect(() => {
      console.log(state.credentials);
   }, [state]);

   return (
      <section className='w-full h-screen bg-black flex justify-center'>
         <section className='sm:w-[45%] h-full sm:h-[75%] rounded border border-[#2c2c2c] p-5 mx-auto my-auto justify-between w-full flex flex-col bg-[#191919]'>
            <div className='w-full flex justify-end'>
               <p
                  onClick={() => {
                     changeAuthText(), changeAuthComp();
                  }}
                  className='font-sand text-end self-end text-base underline font-bold text-white cursor-pointer'
               >
                  {state.auth.text}
               </p>
            </div>
            <div className='h-auto'>{auth_components}</div>
         </section>
      </section>
   );
};

export default Authentication;

import { backendAPI } from '../..';

export const AuthenticateUser = async () => {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   console.log(token);
   const A = await fetch(backendAPI + 'get/auth', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   const B = await A.json();
   return B;
};

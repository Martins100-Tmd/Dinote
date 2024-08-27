import { backendAPI } from '../../..';
const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
export const fetchSectionPages = async function (id: string) {
   const A = await fetch(backendAPI + 'get/page/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

interface dataInt {
   title: string;
   content: string;
}
export const addPage = async function (data: dataInt) {
   const A = await fetch(backendAPI + 'post/newpage', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
   });
   return await A.json();
};

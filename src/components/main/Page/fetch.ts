import { backendAPI } from '../../..';
interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}
const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
export async function addPage(body: bodyReq) {
   const A = await fetch(backendAPI + 'post/newPage/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
   });
   return await A.json();
}

export async function pagePreFetch(id: string) {
   const A = await fetch(backendAPI + 'get/onepage/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}

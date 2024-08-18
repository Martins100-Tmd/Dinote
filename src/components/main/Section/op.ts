import { backendAPI } from '../../..';
const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
export async function addSection(data: { title: string; noteId: string }) {
   const A = await fetch(backendAPI + 'post/newsection', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
   });
   return await A.json();
}

export async function delSection(id: string) {
   const A = await fetch(backendAPI + 'delete/onesect/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}

export const newkey = Math.floor(Math.random() * 1000);

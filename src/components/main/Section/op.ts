import { backendAPI } from '../../..';

export async function addSection(data: { title: string; noteId: string }) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
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

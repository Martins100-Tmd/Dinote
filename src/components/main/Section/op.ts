import { backendAPI } from '../../..';
const token = localStorage.getItem(':tk:') ?? 'empty';
export async function addSection(data: { title: string; noteId: string }) {
   try {
      const response = await fetch(`${backendAPI}/post/newsection`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
}

export async function delSection(id: string) {
   try {
      const response = await fetch(`${backendAPI}/delete/onesect/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
}

export const newkey = Math.floor(Math.random() * 1000);

export const fetchNoteSection = async (id: string) => {
   try {
      const response = await fetch(`${backendAPI}/get/section/${id}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return id ? await response.json() : new Promise((res) => res([]));
   } catch (error) {
      throw error;
   }
};

export const updSectionName = async function (id: string, data: { title: string }) {
   try {
      const response = await fetch(`${backendAPI}/put/sectname/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify({ ...data, title: data.title ?? 'untitled' }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

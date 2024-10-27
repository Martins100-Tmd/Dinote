import { backendAPI } from '../../..';

const token = localStorage.getItem(':tk:') ?? 'empty';

export async function delNote(id: string) {
   try {
      const response = await fetch(`${backendAPI}/delete/onenote/${id}`, {
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

export async function fetchNotes() {
   try {
      const response = await fetch(backendAPI + '/get/userwithnote', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
}

import { backendAPI } from '..';

const token = localStorage.getItem(':tk:') ?? 'empty';
export const LoginFn = async (data: any) => {
   try {
      const response = await fetch(`${backendAPI}/post/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
         },
         body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

export const SignFn = async (data: any) => {
   try {
      const response = await fetch(`${backendAPI}/post/signup`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
         },
         body: JSON.stringify({ ...data, type: 'signup' }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

export async function addNoteFn(data: { title: string }) {
   try {
      const response = await fetch(`${backendAPI}/post/newnote`, {
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         method: 'POST',
         body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
}

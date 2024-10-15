function dateFunc(date: any) {
   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
   return date.toLocaleDateString('en-US', options);
}
const now = new Date();

export const DateString = dateFunc(now).replace('day', '');

export function formattedDate(updateTime: Date) {
   return updateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
   });
}

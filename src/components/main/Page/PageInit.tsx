export default function PageInit() {
   const dateNow = new Date();
   const formattedDate = String(formatDate(dateNow));
   const timeNow = new Date();
   const formattedTime = String(formatTime(timeNow));
   return (
      <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start'>
         <section className='flex flex-col items-center gap-3'>
            <input
               type='text'
               className='w-full outline-none border-b border-slate-200 font-raj text-slate-100 text-3xl font-medium'
               autoFocus
            />
            <p className='text-start w-full font-raj text-slate-200'>{formattedDate + formattedTime}</p>
         </section>
         <section className='w-full p-10 font-raj'></section>
      </section>
   );
}

function formatTime(date: any) {
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const amPm = hours >= 12 ? 'pm' : 'am';
   const formattedHours = hours % 12 || 12;
   // Handle 0 and 12 hours
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

   return `${formattedHours}:${formattedMinutes} ${amPm}`;
}

function formatDate(date: any) {
   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
   return date.toLocaleDateString('en-US', options);
}

// const formattedTime = formatTime(now);

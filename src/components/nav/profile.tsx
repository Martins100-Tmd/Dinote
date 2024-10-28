const ProfileImage = ({ firstLetter }: { firstLetter: string }) => {
   return (
      <div className={`p-1.5 sm:p-2 flex justify-center bg-slate-100 w-[1.3rem] h-[1.3rem] sm:w-[1.6rem] sm:h-[1.6rem] rounded-full`}>
         <div className='text-sm sm:text-base text-center font-sand font-black w-full mx-auto self-center'>{firstLetter}</div>
      </div>
   );
};

export default ProfileImage;

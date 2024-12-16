const ProfileImage = ({ firstLetter }: { firstLetter: string }) => {
   return (
      <div className={`p-2 flex justify-center bg-stone-200/80 border-2 border-stone-700 w-[1.5rem] h-[1.5rem] rounded-full`}>
         <div className='flex justify-center w-full self-center'>
            <p className='text-sm sm:text-xs text-center self-center font-inter font-black'>{firstLetter}</p>
         </div>
      </div>
   );
};

export default ProfileImage;

const ProfileImage = ({ firstLetter }: { firstLetter: string }) => {
   return (
      <div className={`sm:p-3 p-2 flex justify-center bg-stone-100/50 border-2 border-stone-700 w-[1.7rem] h-[1.7rem] rounded-full`}>
         <div className='flex justify-center w-full self-center'>
            <p className='sm:text-sm text-xs text-center self-center font-inter font-black'>{firstLetter}</p>
         </div>
      </div>
   );
};

export default ProfileImage;

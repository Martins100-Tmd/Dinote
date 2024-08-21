const ProfileImage = ({ firstLetter }: { firstLetter: string }) => {
   return (
      <div className={`p-2 flex justify-center bg-slate-200 w-[30px] h-[30px] rounded-full`}>
         <div className='text-xl text-center font-raj font-black w-full mx-auto self-center'>{firstLetter}</div>
      </div>
   );
};

export default ProfileImage;

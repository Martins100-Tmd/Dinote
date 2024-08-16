import { storeB } from '../../state/sectnpage';

export default function SectionList({ item, fn }: any) {
   let [menu, setmenu] = storeB((state: any) => [state.sectionListMenu, state.setSectionListMenu]);
   return (
      <div onClick={setmenu} className='flex flex-row items-center justify-start p-2 w-full hover:bg-[#636363]'>
         <i className={`text-${fn()} material-icons opacity-40 self-center mr-3`}>double_arrow</i>
         <p className='font-redit text-slate-100 font-medium self-center'>{item.title}</p>
         <div className={`${menu ? 'flex' : 'hidden'} flex-col items-center p-3 shadow-xl gap-3 w-[65%] right-0`}>
            <div className='flex flex-row items-center justify-between w-full'>
               <i className='materials-icons text-2xl text-red-900'>cancel</i>
               <p className='font-raj text-lg font-medium text-slate-100'>Delete Section</p>
            </div>
            <div className='flex flex-row items-center justify-between w-full'>
               <i className='materials-icons text-2xl text-red-900'>drive_file_rename_outline</i>
               <p className='font-raj text-lg font-medium text-slate-100'>Rename Section</p>
            </div>
         </div>
      </div>
   );
}

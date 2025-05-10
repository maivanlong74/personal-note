import AdminPageRedirection from '../../components/Redirection/AdminPageRedirection';
import { TableScheduleComponent } from '../../components/Table/tableScheduleComponent';
import { ModalCreateNote } from '../../components/Modal/modal-create-note';
import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

export default function NotePage() {
  const { userProfile } = useUserContext();
  const [dialog, setDialog] = useState({ isLoading: false, title: "", });
  const [isChange, setIsChange] = useState(false);

  // tắt bật modal create
  const handleShowModalCreate = (isLoading, title) => {
    if (!isLoading) {
      setSchedule([]);
      setIsNextModal(false);
    }
    setDialog({ isLoading, title });
  }

  return (
    <>
      <div className='border border-black w-full h-full flex flex-col'>
        <AdminPageRedirection />
        <div className='w-full text-right p-2'>
          <button
            title='Bạn muốn ghi chú điều gì mới ?'
            className='bg-orange-500 p-2 border rounded-xl'
            onClick={() => handleShowModalCreate(true, 'Bạn muốn ghi chú điều gì ?')}
          >
            + Ghi chú
          </button>
        </div>
        <div className='flex-1 w-full relative'>
          <div className='w-full h-full absolute'>
            <TableScheduleComponent UserId={userProfile.id} IsChange={isChange}/>
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <ModalCreateNote
          title={dialog.title}
          userId={userProfile.id}
          onClose={() => setDialog({ isLoading: false, title: "" })}
          onSuccess={() => setIsChange(!isChange)}
        />
      )}
    </>
  );
}
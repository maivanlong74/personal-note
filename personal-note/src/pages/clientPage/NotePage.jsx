import { Link } from 'react-router-dom';
import AdminPageRedirection from '../../components/Redirection/AdminPageRedirection';
import { TableComponent } from '../../components/Table/tableComponent';
import { ModalCreateNote } from '../../components/Modal/modal-create-note';
import { useState } from 'react';

export default function NotePage() {
  const [dialog, setDialog] = useState({
    isLoading: false,
    title: "",
  });

  // tắt bật modal create
  const handleShowModalCreate = (isLoading, title) => {
    setDialog({isLoading, title });
  }

  // logout
  const SubmitCreate = () => {
    handleShowModalCreate("", false);
  };
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
            <TableComponent />
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <ModalCreateNote
          title={dialog.title}
          onDialog={SubmitCreate}
        />
      )}
    </>
  );
}

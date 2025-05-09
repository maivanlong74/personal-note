import AdminPageRedirection from '../../components/Redirection/AdminPageRedirection';
import { TableScheduleComponent } from '../../components/Table/tableScheduleComponent';
import { ModalCreateNote } from '../../components/Modal/modal-create-note';
import { useState } from 'react';
import parseSchedule from '../../components/CreateSchedule';
import { useUserContext } from '../../contexts/UserContext';
import { ScheduleService } from '../../services/ScheduleService';
import { usePersonalNoteContext } from '../../contexts/PersonalNoteContext';
import { PersonalNoteStatus } from '../../constants/status';

export default function NotePage() {
  const { userProfile } = useUserContext();
  const { setPersonalNoteStatus } = usePersonalNoteContext();
  const [dialog, setDialog] = useState({ isLoading: false, title: "", });
  // State để lưu trữ dữ liệu ghi chú
  const [isNextModal, setIsNextModal] = useState(false);
  const [schedules, setSchedule] = useState([]);
  const [isChange, setIsChange] = useState(false);

  // tắt bật modal create
  const handleShowModalCreate = (isLoading, title) => {
    if (!isLoading) {
      setSchedule([]);
      setIsNextModal(false);
    }
    setDialog({ isLoading, title });
  }

  // create note
  const SubmitCreate = (data) => {
    const scheduleList = parseSchedule(data.noteSchedule) || [];
    if (scheduleList.length > 0) {
      setSchedule(prev => [...prev, ...scheduleList]);
      setIsNextModal(true);
      handleShowModalCreate(true, 'Kết quả phân tích lịch trình');
    } else {
      alert("Không thể phân tích lịch trình");
      setIsNextModal(false);
    }
  };

  // compelete create note
  const CompleteCreate = async () => {
    try {
      setPersonalNoteStatus(PersonalNoteStatus.LOADING); // Bắt đầu loading
  
      const saveSchedule = {
        UserId: userProfile.id,
        schedules: schedules
      }
  
      await ScheduleService.saveSchedule(saveSchedule);
  
      setIsChange(!isChange);
      setIsNextModal(false);
      setSchedule([]);
      handleShowModalCreate(false, '');
  
      setPersonalNoteStatus(PersonalNoteStatus.SUCCESS); // Thành công
    } catch (error) {
      console.error("Error saving schedule:", error);
      setPersonalNoteStatus(PersonalNoteStatus.ERROR); // Lỗi
    }
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
            <TableScheduleComponent UserId={userProfile.id} IsChange={isChange}/>
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <ModalCreateNote
          title={dialog.title}
          onDialog={handleShowModalCreate}
          onSubmit={SubmitCreate}
          onCompelete={CompleteCreate}
          nextModal={isNextModal}
          schedules={schedules}
        />
      )}

    </>
  );
}
import { Link } from 'react-router-dom';
import AdminPageRedirection from '../../components/Redirection/AdminPageRedirection';
import { TableComponent } from '../../components/Table/tableComponent';
import { ModalCreateNote } from '../../components/Modal/modal-create-note';
import { useState } from 'react';

// Hàm phân tích noteSchedule thành lịch trình
function parseSchedule(note) {
  const schedules = [];

  const dateRegex = /ngày\s(\d{1,2}\/\d{1,2}\/\d{4})/i;
  const match = note.match(dateRegex);

  if (!match) return [];

  const firstDateStr = match[1];
  const [day, month, year] = firstDateStr.split('/').map(Number);
  let currentDate = new Date(year, month - 1, day);

  const parts = note.split(/(ngày\s\d{1,2}\/\d{1,2}\/\d{4}|ngày mai|ngày sau)/i).filter(p => p.trim() !== '');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].toLowerCase();

    if (part.startsWith('ngày ')) {
      if (part.includes('/')) {
        const newDateMatch = part.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
        if (newDateMatch) {
          const [d, m, y] = newDateMatch[0].split('/').map(Number);
          currentDate = new Date(y, m - 1, d);
        }
      } else if (part.includes('mai') || part.includes('sau')) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      schedules.push({
        date: new Date(currentDate.getTime()),
        content: part.trim()
      });
    }
  }

  return schedules; // Trả về dạng chuẩn [{date, content}]
}

export default function NotePage() {
  const [dialog, setDialog] = useState({ isLoading: false, title: "", });
  // State để lưu trữ dữ liệu ghi chú
  const [noteData, setNoteData] = useState({ startDate: '', endDate: '', noteSchedule: '', });
  const [isNextModal, setIsNextModal] = useState(false);
  const [schedules, setSchedule] = useState([]);

  // tắt bật modal create
  const handleShowModalCreate = (isLoading, title) => {
    if(!isLoading){
      setIsNextModal(false);
    }
    setDialog({ isLoading, title });
  }

  // create note
  const SubmitCreate = (data) => {
    setNoteData(data);
    const scheduleList = parseSchedule(data.noteSchedule);
    if (scheduleList.length > 0) {
    setSchedule(scheduleList);
    setIsNextModal(true);
    handleShowModalCreate(true, 'Kết quả phân tích lịch trình');
    } else {
    setIsNextModal(false);
    }
  };

  // compelete create note
  const CompeleteCreate = () => {
    console.log("Xác nhận lưu:", schedules);
    setIsNextModal(false);
    handleShowModalCreate(false, '');
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
          onDialog={handleShowModalCreate}
          onSubmit={SubmitCreate}
          onCompelete={CompeleteCreate}
          nextModal={isNextModal}
          schedules={schedules}
        />
      )}

    </>
  );
}
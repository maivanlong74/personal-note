import '@assets/css/modal/modal.scss';
import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";

export const ModalCreateNote = ({ title, onDialog, onSubmit, onCompelete, nextModal, schedules }) => {
  // State để lưu trữ thông tin của các trường nhập liệu
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noteSchedule, setNoteSchedule] = useState('');
  const [localSchedules, setLocalSchedules] = useState(schedules || []);

  useEffect(() => {
    setLocalSchedules(schedules || []);
  }, [schedules]);

  // Hàm xử lý khi nhấn OK hoặc Next
  const handleSubmit = () => {
    onSubmit({ startDate, endDate, noteSchedule });
  };

  return (
    <div className={`dialog ${onDialog ? "show" : "hide"}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="btn-dialog-close" onClick={() => onDialog(false)}>
            <IoClose />
          </button>
        </div>

        <div className="dialog-body">
          {nextModal ? (
            <>
              <h4 className="text-center text-black text-xl font-bold">Vui lòng xác nhận</h4>
              <div id='confirmSchedule' className='w-full max-h-[40rem] overflow-x-auto'>
                <ul>
                  {localSchedules.map((item, index) => (
                    <li key={index} className='flex border border-black'>
                      <input
                        type="date"
                        name={`note-a-${index}`}
                        value={
                          (() => {
                            const d = new Date(item.date);
                            if (isNaN(d.getTime())) return '';
                            const pad = (n) => String(n).padStart(2, '0');
                            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
                          })()
                        }
                        className="w-[30%] border-r border-black"
                        onChange={(e) => {
                          const updated = [...localSchedules];
                          updated[index].date = new Date(e.target.value);
                          setLocalSchedules(updated);
                        }}
                      />
                      <div className='w-[70%] p-2 content-note'>
                        <p
                          className='w-full p-1 border border-gray-100 cursor-pointer'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updated = [...localSchedules];
                            updated[index].content = e.target.innerText;
                            setLocalSchedules(updated);
                          }}
                        >
                          {item.content}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className='w-full h-60 text-center'>
                <textarea
                  name="noteSchedule"
                  maxLength={5000}
                  id="noteSchedule"
                  placeholder='Ghi chú ...'
                  className='w-[90%] h-full border border-black rounded-xl p-2'
                  onChange={(e) => setNoteSchedule(e.target.value)}
                ></textarea>
              </div>
            </>
          )}
        </div>

        <div className="dialog-footer">
          {nextModal ? (
            <button
              className="btn-dialog btn-dialog-delete"
              onClick={() => onCompelete(localSchedules)} // gửi localSchedules ra ngoài
            >
              OK
            </button>
          ) : (
            <button
              className="btn-dialog btn-dialog-delete"
              onClick={handleSubmit} // Nếu đang ở bước đầu tiên, click "Next" để gửi dữ liệu
            >
              Next
            </button>
          )}
          <button
            className="btn-dialog btn-dialog-cancel"
            onClick={() => onDialog(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import '@assets/css/modal/modal.scss';
import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { parseScheduleWithAI } from '../parseScheduleWithAI';
import { ScheduleService } from '../../services/ScheduleService';
import { usePersonalNoteContext } from '../../contexts/PersonalNoteContext';
import { PersonalNoteStatus } from '../../constants/status';

export const ModalCreateNote = ({ title, onClose, userId, onSuccess }) => {
  const { setPersonalNoteStatus } = usePersonalNoteContext();
  const [step, setStep] = useState(1); // 1: nhập, 2: xác nhận
  const [noteSchedule, setNoteSchedule] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  // Step 1: Xử lý từ input -> phân tích -> bước xác nhận
  const handleSubmitNote = async () => {
    try {
      setIsLoading(true);
      const parsed = await parseScheduleWithAI(noteSchedule);
      console.log('kết quả: ', parsed)
      if (parsed && parsed.length > 0) {
        setSchedules(parsed);
        setStep(2);
      } else {
        alert("Không thể phân tích lịch trình");
      }
    } catch (err) {
      alert("Có lỗi khi xử lý ghi chú");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Lưu dữ liệu
  const handleComplete = async () => {
    try {
      setPersonalNoteStatus(PersonalNoteStatus.LOADING);
      const payload = {
        UserId: userId,
        schedules: schedules
      };
      onClose();
      await ScheduleService.saveSchedule(payload);
      setPersonalNoteStatus(PersonalNoteStatus.SUCCESS);
      if (onSuccess) onSuccess(); // báo hiệu cho parent làm gì đó (refresh...)
    } catch (err) {
      console.error("Lỗi khi lưu ghi chú:", err);
      alert("Có lỗi xảy ra khi lưu ghi chú.");
      setPersonalNoteStatus(PersonalNoteStatus.ERROR);
    }
  };

  const handleChangeDate = (index, date) => {
    const updated = [...schedules];
    updated[index].date = new Date(date);
    setSchedules(updated);
  };

  const handleEditContent = (scheduleIndex, contentIndex, newContent) => {
    const updated = [...schedules];
    updated[scheduleIndex].content[contentIndex] = newContent.trim();
    setSchedules(updated);
  };

  const handleDeleteContent = (scheduleIndex, contentIndex) => {
    const updated = [...schedules];
    updated[scheduleIndex].content.splice(contentIndex, 1);
    // Nếu không còn content nào thì xoá luôn lịch đó
    if (updated[scheduleIndex].content.length === 0) {
      updated.splice(scheduleIndex, 1);
    }
    setSchedules(updated);
  };
  return (
    <div className={`dialog show`}>
      <div className="dialog-content w-[800px] max-w-[90vw] max-h-[80vh] overflow-hidden flex flex-col">
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="btn-dialog-close" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="dialog-body">
          {step === 1 ? (
            <div className='w-full h-60 text-center'>
              {isLoading ? (
                <div className="text-center text-black py-10 font-semibold">
                  <span className="relative mb-2 flex h-6 w-6 left-1/2 transform -translate-x-1/2 ">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-gray-500 opacity-50"></span>
                  </span>
                  Đang phân tích nội dung ghi chú...
                </div>
              ) : (
                <textarea
                  name="noteSchedule"
                  maxLength={5000}
                  id="noteSchedule"
                  placeholder="Ghi chú ..."
                  className="w-[90%] h-full border border-black rounded-xl p-2"
                  onChange={(e) => setNoteSchedule(e.target.value)}
                ></textarea>
              )}
            </div>
          ) : (
            <>
              <h4 className="text-center text-black text-xl font-bold">Vui lòng xác nhận</h4>
              <div id='confirmSchedule' className='w-full max-h-[40rem] overflow-x-auto'>
                <ul>
                  {schedules.map((item, index) => (
                    <li key={index} className='flex border border-black'>
                      <input
                        type="date"
                        min={today}
                        value={
                          item.date instanceof Date && !isNaN(item.date)
                            ? item.date.toISOString().split('T')[0]
                            : ''
                        }
                        className="w-[30%] border-r border-black"
                        onChange={(e) => handleChangeDate(index, e.target.value)}
                      />
                      <div className='w-[70%] p-2 content-note'>
                        {item.content.map((c, i) => (
                          <div key={i} className="flex justify-between items-center border p-1 my-1">
                            <p
                              contentEditable
                              suppressContentEditableWarning
                              className="flex-1 cursor-text"
                              onBlur={(e) => handleEditContent(index, i, e.target.innerText)}
                            >
                              {c}
                            </p>
                            <button onClick={() => handleDeleteContent(index, i)} className="ml-2 text-red-600">X</button>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="dialog-footer">
          {step === 1 ? (
            <button className="btn-dialog btn-dialog-delete" onClick={handleSubmitNote}>
              Next
            </button>
          ) : (
            <button className="btn-dialog btn-dialog-delete" onClick={handleComplete}>
              OK
            </button>
          )}
          <button className="btn-dialog btn-dialog-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
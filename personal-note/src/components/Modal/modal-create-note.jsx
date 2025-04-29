import '@assets/css/modal/modal.scss';
import { useState } from 'react';
import { IoClose } from "react-icons/io5";

export const ModalCreateNote = ({ title, onDialog, onSubmit, onCompelete, nextModal, schedules }) => {
  // State để lưu trữ thông tin của các trường nhập liệu
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noteSchedule, setNoteSchedule] = useState('');

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
                  {schedules.map((item, index) => (
                    <li key={index} className='flex border border-black'>
                      <input
                        type="date"
                        name={`note-a-${index}`}
                        value={
                          (() => {
                            const d = new Date(item.date);
                            return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
                          })()
                        }
                        className='w-[30%] border-r border-black'
                        onChange={(e) => {
                          const updated = [...schedules];
                          updated[index].date = new Date(e.target.value);
                          onSubmit({ ...updated }); // hoặc set lại state nếu có logic riêng
                        }}
                      />
                      <div className='w-[70%] p-2 content-note'>
                        <p
                          className='w-full p-1 border border-gray-100 cursor-pointer'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updated = [...schedules];
                            updated[index].content = e.target.innerText;
                            onSubmit({ ...updated }); // cập nhật nếu cần
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
              <ul className='text-black flex space-x-2 justify-center'>
                <li className='border border-black p-2 w-[40%] text-left'>
                  <label className='text-black font-bold'>Bắt đầu</label> <br />
                  <input type="date" name='startDate' onChange={(e) => setStartDate(e.target.value)} />
                </li>
                <li className='border border-black p-2 w-[40%] text-left'>
                  <label className='text-black font-bold'>Kết thúc</label> <br />
                  <input type="date" name='endDate' onChange={(e) => setEndDate(e.target.value)} />
                </li>
              </ul>
              <br />
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
              onClick={onCompelete} // Nếu đang ở bước tiếp theo, click "OK" hoàn tất
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

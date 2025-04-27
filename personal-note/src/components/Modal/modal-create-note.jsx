import '@assets/css/modal/modal.scss';
import { IoClose } from "react-icons/io5";

export const ModalCreateNote = ({ title, onDialog }) => {

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
          <ul className='text-black flex space-x-2 justify-center'>
            <li className='border border-black p-2 w-[40%] text-left'>
              <label className='text-black font-bold'>Bắt đầu</label> <br />
              <input type="date" name='startDate' />
            </li>
            <li className='border border-black p-2 w-[40%] text-left'>
              <label className='text-black font-bold'>Kết thúc</label> <br />
              <input type="date" name='endDate' />
            </li>
          </ul>
          <br />
          <div className='w-full h-60 text-center'>
            <textarea name="noteSchedule" maxLength={5000} id="noteSchedule" placeholder='Ghi chú ...' className='w-[90%] h-full border border-black rounded-xl p-2'></textarea>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            className="btn-dialog btn-dialog-delete"
            onClick={() => onDialog(true)}
          >
            OK
          </button>
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

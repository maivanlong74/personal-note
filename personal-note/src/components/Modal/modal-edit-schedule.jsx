import '@assets/css/modal/modal.scss';
import { IoClose } from "react-icons/io5";
import { Delete } from '../../assets/svg/icon';

export const ModalEditSchedule = ({ title, editData, setEditData, onDialog }) => {
  const handleNoteChange = (index, value) => {
    const newNotes = [...editData.note];
    newNotes[index] = value;
    setEditData({ ...editData, note: newNotes });
  };

  const handleAddNote = () => {
    setEditData({ ...editData, note: [...editData.note, ""] });
  };

  const handleRemoveNote = (index) => {
    const newNotes = editData.note.filter((_, i) => i !== index);
    setEditData({ ...editData, note: newNotes });
  };

  return (
    <div className="dialog show">
      <div className="dialog-content w-[800px] max-w-[90vw] max-h-[80vh] overflow-hidden flex flex-col">
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="btn-dialog-close" onClick={() => onDialog(false)}>
            <IoClose />
          </button>
        </div>

        <div className="dialog-body max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="date"
              className="bg-[#c7ecee] p-2 rounded w-1/2"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            />

            <button
              className="ml-4 bg-green-500 hover:bg-pink-400 text-black px-4 py-2 rounded border border-black"
              onClick={handleAddNote}
            >
              + Thêm ghi chú
            </button>
          </div>

          {editData.note.map((note, index) => (
            <div key={index} className="relative mb-4 note-container">
              <textarea
                className="w-full bg-[#c7ecee] h-24 pr-10" // pr-10 để tránh nút đè lên chữ
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
              <button
                className="absolute top-1 right-1 text-red-500 text-sm underline btn-delete-note"
                onClick={() => handleRemoveNote(index)}
              >
                <Delete className="btn-delete-icon" />
              </button>
            </div>
          ))}
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
};

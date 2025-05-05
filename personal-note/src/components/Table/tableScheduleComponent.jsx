import { useEffect, useState } from 'react';
import { Delete, Edit } from "../../assets/svg/icon";
import { ModalConfirm } from '../Modal/modal-confirm';
import { ScheduleService } from '../../services/ScheduleService';

export const TableScheduleComponent = ({ UserId, IsChange }) => {
  const [dialog, setDialog] = useState({ message: "", isLoading: false, title: "", });
  const [schedules, setSchedules] = useState([]);
  const [editing, setEditing] = useState(null); // { parentId, scheduleId }
  const [editData, setEditData] = useState({ date: "", note: "" });

  useEffect(() => {
    const fetchSchedules = async () => {
      const data = await ScheduleService.getSchedulesById(UserId);
      setSchedules(data);
    };
    fetchSchedules();
  }, [IsChange]);

  // Delete
  const confirmDelete = async () => {
    try {
      await ScheduleService.deleteSchedule(dialog.scheduleParentId, dialog.scheduleId);
      setDialog({ message: "", isLoading: false, title: "", scheduleId: null, scheduleParentId: null });

      // Cập nhật lại danh sách
      const updated = await ScheduleService.getSchedulesById(UserId);
      setSchedules(updated);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  // tắt bật modal xóa
  const handleShowModal = (message, isLoading, title, scheduleId, scheduleParentId) => {
    setDialog({ message, isLoading, title, scheduleId, scheduleParentId });
  };

  const handleEdit = (schedule, parentId) => {
    setEditing({ parentId, scheduleId: schedule.id });
    setEditData({
      date: schedule.dateSchedule.toDate().toISOString().substring(0, 10),
      note: Array.isArray(schedule.noteSchedule) ? schedule.noteSchedule.join('\n') : schedule.noteSchedule
    });
  };

  const handleUpdate = async () => {
    try {
      const docRef = await ScheduleService.getSchedulesById(UserId);
      const targetDoc = docRef.find(d => d.idSchedule === editing.parentId);
      const updatedSchedules = targetDoc.schedules.map(s => {
        if (s.id === editing.scheduleId) {
          return {
            ...s,
            dateSchedule: new Date(editData.date),
            noteSchedule: editData.note
              .split('\n')
              .map(line => line.trim())
              .filter(line => line !== "")
          };
        }
        return s;
      });

      await ScheduleService.updateSchedule(editing.parentId, updatedSchedules);
      const refreshed = await ScheduleService.getSchedulesById(UserId);
      setSchedules(refreshed);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    } finally {
      setEditing(null);
      setEditData({ date: "", note: "" });
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setEditData({ date: "", note: "" });
  };

  return (
    <div className="overflow-x-auto h-full">
      <table className="table-auto w-full">
        <thead className="bg-gray-500 text-white sticky top-0 z-10">
          <tr>
            <th className="border-2 border-slate-600 max-w-[10px]">No</th>
            <th className="border-2 border-slate-600 p-2 max-w-[30px]">Thời gian</th>
            <th className="border-2 border-slate-600 p-2">Ghi chú</th>
            <th className="border-2 border-slate-600 p-2"></th>
            <th className="border-2 border-slate-600 p-2"></th>
          </tr>
        </thead>
        <tbody className="border border-black bg-[#c7ecee]">
          {schedules.map((item, index) => (
            item.schedules.map((schedule, idx) => (
              <tr key={`${index}-${idx}`} className="border border-black">
                <td className="border border-black text-center">{idx + 1}</td>
                {editing?.scheduleId === schedule.id && editing?.parentId === item.idSchedule ? (
                  <>
                    <td className="border border-black p-2">
                      <input
                        type="date"
                        className="w-full bg-[#c7ecee]"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      />
                    </td>
                    <td className="border border-black p-2">
                      <textarea
                        className="w-full bg-[#c7ecee]"
                        value={editData.note}
                        onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <button onClick={handleUpdate} className="text-green-600 font-bold">OK</button>
                      <button onClick={handleCancel} className="text-red-600 font-bold">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-black p-2">
                      {schedule.dateSchedule.toDate().toLocaleDateString("vi-VN")}
                    </td>
                    <td className="border border-black p-2 whitespace-pre-line">
                      {Array.isArray(schedule.noteSchedule)
                        ? schedule.noteSchedule.join('\n')
                        : schedule.noteSchedule}
                    </td>
                    <td className="border border-black text-center">
                      <button onClick={() => handleEdit(schedule, item.idSchedule)}>
                        <Edit />
                      </button>
                    </td>
                  </>
                )}
                <td className="border border-black text-center bg-slate-600">
                  <button
                    onClick={() =>
                      handleShowModal(
                        'Bạn có chắc chắn muốn xóa?',
                        true,
                        'Xác nhận xóa',
                        schedule.id,
                        item.idSchedule
                      )
                    }
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      {dialog.isLoading && (
        <ModalConfirm
          title={dialog.title}
          message={dialog.message}
          onDialog={(isConfirm) => {
            if (isConfirm) {
              confirmDelete();
            } else {
              setDialog({ message: "", isLoading: false, title: "", scheduleId: null, scheduleParentId: null });
            }
          }}
        />
      )}
    </div>
  );
};

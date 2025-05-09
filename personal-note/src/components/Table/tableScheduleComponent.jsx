import { useEffect, useState } from 'react';
import { Delete, Edit } from "../../assets/svg/icon";
import { ModalConfirm } from '../Modal/modal-confirm';
import { ModalEditSchedule } from '../Modal/modal-edit-schedule';
import { ScheduleService } from '../../services/ScheduleService';
import { usePersonalNoteContext } from '../../contexts/PersonalNoteContext';
import { PersonalNoteStatus } from '../../constants/status';

export const TableScheduleComponent = ({ UserId, IsChange }) => {
  const { setPersonalNoteStatus } = usePersonalNoteContext();
  const [dialog, setDialog] = useState({ message: "", isLoading: false, title: "", });
  const [schedules, setSchedules] = useState([]);
  const [editing, setEditing] = useState(null); // { parentId, scheduleId }
  const [editData, setEditData] = useState({ date: "", note: [] });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setPersonalNoteStatus(PersonalNoteStatus.LOADING);
        const data = await ScheduleService.getSchedulesById(UserId);
        setSchedules(data);
        setPersonalNoteStatus(PersonalNoteStatus.SUCCESS);
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        setPersonalNoteStatus(PersonalNoteStatus.ERROR);
      }
    };
    fetchSchedules();
  }, [IsChange]);

  // Delete
  const confirmDelete = async () => {
    try {
      setDialog({ message: "", isLoading: false, title: "", scheduleId: null, scheduleParentId: null });
      setPersonalNoteStatus(PersonalNoteStatus.LOADING);
      await ScheduleService.deleteSchedule(dialog.scheduleParentId, dialog.scheduleId);

      // Cập nhật lại danh sách
      const updated = await ScheduleService.getSchedulesById(UserId);
      setSchedules(updated);
      setPersonalNoteStatus(PersonalNoteStatus.SUCCESS);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      setPersonalNoteStatus(PersonalNoteStatus.ERROR);
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
      note: Array.isArray(schedule.noteSchedule)
        ? schedule.noteSchedule
        : [schedule.noteSchedule]
    });
  };

  const handleUpdate = async () => {
    try {
      const docRef = await ScheduleService.getSchedulesById(UserId);
      const targetDoc = docRef.find(d => d.idSchedule === editing.parentId);

      // Ghi chú đã được lọc trắng + rỗng
      const cleanedNotes = editData.note
        .map(line => line.trim())
        .filter(line => line !== "");

      let updatedSchedules;

      if (cleanedNotes.length === 0) {
        // Nếu không còn ghi chú → xóa record có id tương ứng
        updatedSchedules = targetDoc.schedules.filter(
          s => s.id !== editing.scheduleId
        );
      } else {
        // Cập nhật ghi chú bình thường
        updatedSchedules = targetDoc.schedules.map(s => {
          if (s.id === editing.scheduleId) {
            return {
              ...s,
              dateSchedule: new Date(editData.date),
              noteSchedule: cleanedNotes
            };
          }
          return s;
        });
      }
      setEditing(null);
      setEditData({ date: "", note: [] });
      setPersonalNoteStatus(PersonalNoteStatus.LOADING);

      await ScheduleService.updateSchedule(editing.parentId, updatedSchedules);
      const refreshed = await ScheduleService.getSchedulesById(UserId);
      setPersonalNoteStatus(PersonalNoteStatus.SUCCESS);
      setSchedules(refreshed);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setPersonalNoteStatus(PersonalNoteStatus.ERROR);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setEditData({ date: "", note: [] });
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

      {editing && (
        <ModalEditSchedule
          title="Chỉnh sửa ghi chú"
          editData={editData}
          setEditData={setEditData}
          onDialog={(isConfirm) => {
            if (isConfirm) {
              handleUpdate();
            } else {
              handleCancel();
            }
          }}
        />
      )}
    </div>
  );
};

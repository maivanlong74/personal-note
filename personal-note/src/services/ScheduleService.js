import { db } from '../config/firebase.js';
import { collection, query, getDocs, where, getDoc, setDoc, addDoc, doc, updateDoc } from "firebase/firestore";

const schedulesRef = collection(db, 'Schedules');

const ScheduleService = {
  // Lưu schedule mới
  saveSchedule: async (data) => {
    try {
      const existingQuery = query(schedulesRef, where('UserId', '==', data.UserId));
      const existingSnapshot = await getDocs(existingQuery);

      // Mỗi schedule sẽ có id riêng
      const newSchedules = data.schedules.map(item => ({
        id: crypto.randomUUID(), // hoặc: Date.now().toString()
        dateSchedule: item.date,
        noteSchedule: item.content
          .split('\n')                      // tách từng dòng
          .map(line => line.trim())        // loại bỏ khoảng trắng
          .filter(line => line !== "")     // loại bỏ dòng trống
      }));

      if (!existingSnapshot.empty) {
        const doc = existingSnapshot.docs[0];
        const docRef = doc.ref;
        const docData = doc.data();

        const updatedSchedules = [...docData.schedules];

        newSchedules.forEach(newItem => {
          const existingIndex = updatedSchedules.findIndex(
            oldItem =>
              oldItem.dateSchedule.toDate?.().toDateString?.() === newItem.dateSchedule.toDateString?.()
          );

          if (existingIndex !== -1) {
            // Nếu đã tồn tại ngày, nối thêm nội dung và giữ id cũ
            updatedSchedules[existingIndex].noteSchedule += `\n${newItem.noteSchedule}`;
          } else {
            // Nếu ngày mới, thêm vào danh sách
            updatedSchedules.push(newItem);
          }
        });

        await setDoc(docRef, {
          ...docData,
          schedules: updatedSchedules
        });

        console.log('Cập nhật dữ liệu thành công cho UserId:', data.UserId);

      } else {
        // Nếu chưa có document → tạo mới
        const newDocRef = await addDoc(schedulesRef, {});
        const idSchedule = newDocRef.id;

        const scheduleData = {
          UserId: data.UserId,
          idSchedule,
          schedules: newSchedules
        };

        await setDoc(newDocRef, scheduleData);
        console.log('Tạo mới dữ liệu thành công:', scheduleData);
      }

    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu vào Firestore:', error);
      throw error;
    }
  },

  getSchedulesById: async (id) => {
    try {
      const cmd = query(schedulesRef, where('UserId', '==', id));
      const schedules = await getDocs(cmd);

      return schedules.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error Queue data:', error);
      throw error;
    }
  },

  deleteSchedule: async (scheduleParentId, scheduleItemId) => {
    try {
      const docRef = doc(db, 'Schedules', scheduleParentId);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error("Không tìm thấy lịch trình.");
      }

      const data = snapshot.data();
      const updatedSchedules = data.schedules.filter(item => item.id !== scheduleItemId);

      await updateDoc(docRef, { schedules: updatedSchedules });

      console.log(`Đã xóa thành công schedule con có id: ${scheduleItemId}`);
    } catch (error) {
      console.error("Lỗi khi xóa schedule:", error);
      throw error;
    }
  },
}

export { ScheduleService }
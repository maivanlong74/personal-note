import { useState } from 'react';
import { Delete } from "../../assets/svg/icon";
import ModalDetail from '../Modal/modal-detail';
import { ModalConfirm } from '../Modal/modal-confirm';

export const TableComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    title: "",
  });

  // Tạo dữ liệu mẫu
  const rows = [];
  for (let index = 0; index < 20; index++) {
    rows.push({
      id: index + 1,
      name: `Malcolm Lockyer ${index + 1}`,
      phone: `1961${index}`,
      note: `#564765${index}`
    });
  }

  // DeleteDelete
  const confirmDelete = () => {
    // tắt modal
    handleShowModal("", false);
  };

  // tắt bật modal chi tiếttiết
  const handleShowModalDetail = (selectedRow, isLoading) => {
    setSelectedRow(selectedRow);
    setIsModalOpen(isLoading);
  }

  // tắt bật modal xóaxóa
  const handleShowModal = (message, isLoading, title) => {
    setDialog({ message, isLoading, title });
  }
  return (
    <div className="overflow-x-auto h-full">
      <table className="table-auto w-full">
        <thead className="bg-gray-500 text-white sticky top-0 z-10">
          <tr>
            <th className="border-2 border-slate-600">No</th>
            <th className="border-2 border-slate-600 p-2">Họ và tên</th>
            <th className="border-2 border-slate-600 p-2">Số điện thoại</th>
            <th className="border-2 border-slate-600 p-2">Mã note</th>
            <th className="border-2 border-slate-600 p-2"></th>
          </tr>
        </thead>
        <tbody className="border border-black bg-[#c7ecee]">
          {rows.map((row, index) => (
            <tr key={row.id} className="border border-black">
              <td className="border border-black text-center">{row.id}</td>
              <td
                onClick={() => handleShowModalDetail(row, true)}
                className="border border-black p-2 cursor-pointer text-blue-500 hover:underline"
              >
                {row.name}
              </td>
              <td className="border border-black p-2">{row.phone}</td>
              <td className="border border-black p-2">{row.note}</td>
              <td className="border border-black text-center bg-slate-600">
                <button onClick={() => handleShowModal('Bạn có chắc chắn muốn xóa?', true, 'Hộp thoại xác nhận')}><Delete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ModalDetail */}
      {isModalOpen && (
        <ModalDetail
          data={selectedRow}
          onDialog={handleShowModalDetail}
        />
      )}

      {dialog.isLoading && (
        <ModalConfirm
         title={dialog.title}
          message={dialog.message}
          onDialog={confirmDelete}
        />
      )}
    </div>
  );
};

import '@assets/css/modal/modal.scss';
import React from 'react';
import { IoClose } from 'react-icons/io5';

const ModalDetail = ({ data, onDialog }) => {

  return (
    <div className={`dialog ${onDialog ? "show" : "hide"}`}>
      <div className="dialog-content">
        <div className='dialog-header'>
          <h2 className="dialog-title">Thông tin chi tiết</h2>
          <button className="btn-dialog-close" onClick={() => onDialog(false)}>
            <IoClose />
          </button>
        </div>
        <div className="dialog-body">
          <p><strong>Họ và tên:</strong> {data.name}</p>
          <p><strong>Số điện thoại:</strong> {data.phone}</p>
          <p><strong>Mã note:</strong> {data.note}</p>
        </div>
        <div className="dialog-footer">
          <button
            onClick={() => onDialog(false)}
            className="bg-gray-700 text-white p-2 rounded-xl mt-4"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;

import '@assets/css/modal/modal.scss';
import { IoClose } from "react-icons/io5";

export const ModalConfirm = ({ message, title, onDialog }) => {

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
          <p className="dialog-message" style={{ fontSize: "14px" }}>
            {message}
          </p>
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

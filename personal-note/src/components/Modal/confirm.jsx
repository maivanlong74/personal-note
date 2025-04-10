import '@assets/css/modal/confirm.scss';

export const confirmModal = () => {

  return (
    <div id="commonConfirmModal" className="modal fade" data-keyboard="false" data-backdrop="static">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div id="commonConfirmModalHeader" className="modal-header bg-primary">
            <div>
              <span className="common-confirm-modal-title-label">
                <span className="glyphicon glyphicon-question-sign"></span>
                <span>確認</span>
              </span>
              <span>
                <button id="commonConfirmModalCloseButton" type="button"
                  className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </span>
            </div>
          </div>
          <div id="commonConfirmModalBody" className="modal-body">
            <div className="container-fluid">
              <div className="common-confirm-modal-message-body"></div>
            </div>
          </div>
          <div id="commonConfirmModalFooter" className="modal-footer">
            <button type="button" id="commonConfirmModalOkButton" className="btn btn-primary">OK</button>
            <button type="button" id="commonConfirmModalCancelButton" className="btn btn-secondary">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  );
}

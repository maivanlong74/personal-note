import { PersonalNoteStatus } from '@constants/status';

const Loading = ({ personalNoteStatus }) => {
  const renderPersonalNoteStatus = (status) => {
    switch (status) {
      case PersonalNoteStatus.IDLE: return 'Please choose a tool';
      case PersonalNoteStatus.LOADING: return `Đang tải...`;
      case PersonalNoteStatus.SUCCESS: return '';
      case PersonalNoteStatus.ERROR: return 'An error occurred. Please try again later';
    }
  }
  return (
    <>
      {
        (personalNoteStatus === PersonalNoteStatus.LOADING) && (
          <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-100'>
            <div className="mx-auto px-4 text-center mt-3 text-gray-400 text-base">
              {personalNoteStatus === PersonalNoteStatus.LOADING ?
                <span className="relative mb-2 flex h-6 w-6 left-1/2 transform -translate-x-1/2 ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-gray-500 opacity-50"></span>
                </span>
                : null}
              {renderPersonalNoteStatus(personalNoteStatus)}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Loading;

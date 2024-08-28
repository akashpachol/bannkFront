import { Modal } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

const ModalData = ({ userDetails, toggleModal, isModalOpen }) => {
  console.log(userDetails, 'hjhjjhj');

  return (
    <Modal
      open={isModalOpen}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white rounded-lg shadow w-1/3 mx-auto mt-48">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            View Details
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleModal}
          >
            <AiOutlineClose className="w-3 h-3" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4">
            <div className="mb-4">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="input"
                id="name"
                value={userDetails?.user?.name || ''}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input"
                id="email"
                value={userDetails?.user?.email || ''}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="balance">
                Balance
              </label>
              <input
                type="number"
                placeholder="Account balance"
                className="input"
                id="balance"
                value={userDetails?.accountBalance || 0}
                readOnly
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-red-400 text-white font-medium rounded-2xl lg:px-5 py-3"
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalData;

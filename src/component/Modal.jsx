import { useFormik } from 'formik';

import * as Yup from 'yup';
import { Modal } from '@mui/material';
import { deposit, withdraw } from '../Service/user/apiMethod';
import { AiOutlineClose } from 'react-icons/ai';

const initialValues = {
    amount: '',

};
const validationSchema = Yup.object().shape({
    amount: Yup.string()
        .required('Vender Name is required')
        .min(3, 'Vender Name must be at least 3 characters long'),
 
});
const ModalData = ({isValue, closeModal,isModalOpen,toggleApi}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values, { resetForm }) => {
            if(isValue=='Deposit'){
                try {
                    const response = await deposit(values);
                    if (response.status === "success") {
                        closeModal()
                        toggleApi()
                    } else {
                      console.log('hai',response.message);
                    }
                  } catch (error) {
                    const errorMessage = error.message
                   console.log(errorMessage);
                  }
            }else{
                try {
                    const response = await withdraw(values);
                    if (response.status === "success") {
                        closeModal()
                        toggleApi()
                    } else {
                      console.log('hai',response.message);
                    }
                  } catch (error) {
                    const errorMessage = error.message
                   console.log(errorMessage);
                  }
            }
         
            resetForm();
        },
    });

  return (
    <Modal
    open={isModalOpen}
    onClose={closeModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className=" bg-white rounded-lg shadow w-1/3 mx-auto mt-48">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isValue}
                </h3>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                >
                <AiOutlineClose className="w-3 h-3" />
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="input"
                            id="amount"
                            {...formik.getFieldProps('amount')}
                        />
                        {formik.touched.amount && formik.errors.amount ? (
                            <div className="error">{formik.errors.amount}</div>
                        ) : null}
                    </div>
             
             <div className='flex justify-center gap-4'>
             <button type="submit" className="action_button">submit</button>
             <button type="submit" className="bg-gray-200 text-white  font-medium rounded-2xl   lg:px-5 py-3 "  onClick={(e) => {
    e.preventDefault();
    closeModal()
  }}>Cancel</button>
             </div>
                  

                </form>
            </div>
        </div>
  </Modal>
  );
}

export default ModalData;
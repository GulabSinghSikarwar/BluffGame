import React from "react";
import { ButtonTypes } from "../../../utils/app.enum";
import { getButtonClass, getStatusIcon } from "../../../utils/app.utils";
const Modal = ({
    isOpen,
    onClose,
    title,
    message, onConfirm,
    confirmText = "Yes, I'm sure",
    cancelText = "No, cancel",
    buttonType = ButtonTypes.WARNING,  // Default to warning
}) => {
    if (!isOpen) return null;

    return (
        <div
            id="popup-modal"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="p-4 md:p-5 text-center">
                        {/* <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg> */}
                        {
                            <div className=" w-full flex justify-center mb-4">
                                {
                                    getStatusIcon(buttonType)
                                } 
                            </div>
                        }
                         <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    {title}
                                </h3>

                        <p className="text-gray-500 dark:text-gray-400">{message}</p>
                        <div className="mt-4 flex justify-center space-x-3">
                            <button
                                onClick={onConfirm}
                                className={`${getButtonClass(buttonType)} font-medium rounded-lg text-sm px-5 py-2.5`}
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

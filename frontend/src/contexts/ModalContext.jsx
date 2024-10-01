import React, { createContext, useContext, useState } from "react";
import Modal from "../components/utils/Modal/Moadal";
import { ButtonTypes } from "../utils/app.enum";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalProps, setModalProps] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { },
    });

    /**
    * Opens a modal with specified options.
    * 
    * @param {Object} modalOptions - Options to configure the modal.
    * @param {string} modalOptions.title - The title of the modal.
    * @param {string} modalOptions.message - The message or description to display in the modal.
    * @param {function} modalOptions.onConfirm - A callback function that is triggered when the confirm button is clicked.
    * @param {string} [modalOptions.confirmText="Yes, I'm sure"] - Text to display on the confirm button.
    * @param {string} [modalOptions.cancelText="No, cancel"] - Text to display on the cancel button.
    * 
    * @example
    * openModal({
    *   title: "Are you sure?",
    *   message: "This action cannot be undone.",
    *   onConfirm: () => console.log('Confirmed'),
    *   confirmText: "Yes, proceed",
    *   cancelText: "Cancel",
    * });
    */
    const openModal = (modalOptions) => {
        console.log("start Status 2");
        
        setModalProps({
            isOpen: true,
            ...modalOptions,
            buttonType: modalOptions.buttonType || ButtonTypes.WARNING, // Default to warning if not specified
        });
    };

    const closeModal = () => {
        setModalProps({ ...modalProps, isOpen: false });
    };

    const confirmModal = () => {
        if (modalProps.onConfirm) {
            modalProps.onConfirm();
        }
        closeModal();
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal
                isOpen={modalProps.isOpen}
                onClose={closeModal}
                title={modalProps.title}
                message={modalProps.message}
                onConfirm={confirmModal}
                confirmText={modalProps.confirmText}
                cancelText={modalProps.cancelText}
                buttonType={modalProps.buttonType}  // Pass the button type to the Modal
            />
        </ModalContext.Provider>
    );
};

/**
 * Custom hook to access the modal context.
 * 
 * Provides methods to open and close the modal.
 * 
 * @returns {Object} Modal context object with functions to control the modal.
 * @returns {function} return.openModal - Opens the modal with the specified options.
 * @returns {function} return.closeModal - Closes the currently open modal.
 * 
 * @example
 * const { openModal, closeModal } = useModal();
 * 
 * openModal({
 *   title: "Confirm Action",
 *   message: "Do you want to proceed?",
 *   onConfirm: () => console.log("Confirmed"),
 *   confirmText: "Yes, proceed",
 *   cancelText: "Cancel"
 * });
 */
export const useModal = () => {
    return useContext(ModalContext);
};


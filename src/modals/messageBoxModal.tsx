import React, { useRef } from 'react';

interface MessageBoxModalProps {
    onClose: () => void;
    messageType: 'info' | 'error' | null;
    message: string;
}

const MessageBoxModal: React.FC<MessageBoxModalProps> = ({ onClose, messageType, message }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    const getBackgroundColor = () => {
        if (messageType === 'info') {
            return 'alert-success';
        } else if (messageType === 'error') {
            return 'alert-error';
        } else {
            return 'alert-info';
        }
    };

    return (
        <div className="fixed w-full h-full flex items-center justify-center">
        <div ref={modalRef} className="bg-gray-500 p-6 rounded-lg border border-gray">

            <div className={getBackgroundColor()}>
            {message}
            </div>

            <div className="flex justify-center mt-2">
                <button
                    onClick={onClose}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 bg-gray-500 text-white"
                >
                    Tamam
                </button>
            </div>

        </div>
        </div>
    );
};

export default MessageBoxModal;

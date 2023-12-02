import React, { useState, useEffect, useRef } from 'react';

const ForgetPasswordModal = ({ onClose, onSubmit }:any) => {
    const [email, setEmail] = useState('');
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = () => {
        onSubmit(email);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg border border-gray">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Kullanıcı Adı veya E-Posta giriniz"
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                />
                <button
                    onClick={handleSubmit}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 bg-blue-500 text-white"
                >
                    Gönder
                </button>
                <button
                    onClick={onClose}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 bg-gray-500 text-white"
                >
                    İptal
                </button>
            </div>
        </div>
    );
};

export default ForgetPasswordModal;

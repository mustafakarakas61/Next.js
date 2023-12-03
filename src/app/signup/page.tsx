"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";
import MessageBoxModal from "@/modals/messageBoxModal";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        acceptPassword: "",
        username: "",
    })
    const [loading, setLoading] = React.useState(false);
    const [showMessageBoxModal, setShowMessageBoxModal] = React.useState(false);
    const [messageType, setMessageType] = React.useState<'info' | 'error' | null>(null);
    const [modalMessage, setModalMessage] = React.useState('');

    const openMessageBoxModal = (type: 'info' | 'error' | null, message: string) => {
        setMessageType(type);
        setModalMessage(message);
        setShowMessageBoxModal(true);
    };
    const closeMessageBoxModel = () => {
        setShowMessageBoxModal(false);
        if(messageType === 'info' && modalMessage === "Kayıt işlemini tamamlamak için mail adresinizi kontrol edin.") {
            router.push("/login");
        }
    }


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            openMessageBoxModal('info', "Kayıt işlemini tamamlamak için mail adresinizi kontrol edin.")
        } catch (error: any) {
            openMessageBoxModal('error', error.response.data.error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? <span className="loading loading-spinner text-white"></span> :
                <span className="text-3xl">Kayıt Ol</span>}</h1>
            <hr/>
            <div className="flex flex-row items-center justify-center mt-5">
                <div className="flex flex-col items-center justify-center mr-5">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="name"
                        type="text"
                        value={user.name}
                        onChange={(e) => {
                            setUser({...user, name: e.target.value})
                        }}
                        placeholder="Ad"
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="surname"
                        type="text"
                        value={user.surname}
                        onChange={(e) => {
                            setUser({...user, surname: e.target.value})
                        }}
                        placeholder="Soyad"
                    />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center mr-5">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => {
                            setUser({...user, username: e.target.value})
                        }}
                        placeholder="Kullanıcı Adı"
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                        placeholder="E-Posta"
                    />
                </div>
            </div>

            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center mr-5">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                        placeholder="Şifre"
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="accept-password"
                        type="password"
                        value={user.acceptPassword}
                        onChange={(e) => {
                            setUser({...user, acceptPassword: e.target.value})
                        }}
                        placeholder="Şifre Onayı"
                    />
                </div>
            </div>
            {showMessageBoxModal && (
                <MessageBoxModal
                    onClose={closeMessageBoxModel}
                    messageType={messageType}
                    message={modalMessage}
                />
            )}

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Kayıt Ol
            </button>
            <Link href="/login">Zaten hesabınız var mı? Giriş sayfasını ziyaret edin!</Link>
        </div>
    );
}


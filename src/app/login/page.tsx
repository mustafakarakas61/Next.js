"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";
import ForgetPasswordModal from "@/modals/forgetPasswordModal";
import MessageBoxModal from "@/modals/messageBoxModal";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showForgetPasswordModal, setShowForgetPasswordModal] = React.useState(false);
    const [showMessageBoxModal, setShowMessageBoxModal] = React.useState(false);
    const [messageType, setMessageType] = React.useState<'info' | 'error' | null>(null);
    const [modalMessage, setModalMessage] = React.useState('');

    const openForgetPasswordModal = () => {
        setShowForgetPasswordModal(true);
    };
    const closeForgetPasswordModal = () => {
        setShowForgetPasswordModal(false);
    }

    const openMessageBoxModal = (type: 'info' | 'error' | null, message: string) => {
        setMessageType(type);
        setModalMessage(message);
        setShowMessageBoxModal(true);
    };
    const closeMessageBoxModel = () => {
        setShowMessageBoxModal(false);
    }


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            router.push("/");
            window.location.reload();
        } catch (error: any) {
            openMessageBoxModal('error', error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !buttonDisabled) {
            onLogin();
        }
    }

    const handleForgetPasswordSubmit = async (email: any) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/forgetpassword', {email});
            openMessageBoxModal('info', 'Şifre sıfırlama bağlantısı mailinize gönderildi.');
        } catch (error: any) {
            openMessageBoxModal('error', error.response?.data?.error || "Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user.username, user.password]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? <span className="loading loading-spinner text-white"></span> :
                <span className="text-3xl">Giriş Yap</span>}</h1>
            <hr/>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-5"
                id="username"
                type="text"
                value={user.username}
                onClick={(e) => {
                }}
                onChange={(e) => {
                    setUser({...user, username: e.target.value});
                }}
                onKeyDown={handleKeyPress}
                placeholder="Kullanıcı Adı ve E-Posta"
            />
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onClick={(e) => {
                }
                }
                onChange={(e) => {
                    setUser({...user, password: e.target.value});
                }}
                onKeyDown={handleKeyPress}
                placeholder="Şifre"
            />

            {showMessageBoxModal && (
                <MessageBoxModal
                    onClose={closeMessageBoxModel}
                    messageType={messageType}
                    message={modalMessage}
                />
            )}

            <div className="flex flex-row items-center justify-center space-x-2">
                <button
                    onClick={onLogin}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:border-gray-600"
                >
                    Giriş Yap
                </button>
                <button
                    onClick={openForgetPasswordModal}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:border-gray-600 bg-gray-500 text-white"
                >
                    Şifremi Unuttum
                </button>
            </div>

            {showForgetPasswordModal && (
                <ForgetPasswordModal
                    onClose={closeForgetPasswordModal}
                    onSubmit={handleForgetPasswordSubmit}
                />
            )}

            <Link href="/signup">Hesabınız yok mu? Kayıt sayfasını ziyaret edin!</Link>
        </div>
    );
}


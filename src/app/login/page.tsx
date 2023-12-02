"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";
import ForgetPasswordModal from "@/modals/forgetPasswordModal";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [showForgetPasswordModal, setShowForgetPasswordModal] = React.useState(false);

    const onLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            toast.success("Login success");
            router.push("/");
            window.location.reload();
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
            setErrorMessage(error.response.data.error)
        } finally {
            setLoading(false);
        }
    }

    const openForgetPasswordModal = () => {
        setShowForgetPasswordModal(true);
    };
    const closeForgetPasswordModal = () => {
        setShowForgetPasswordModal(false);
    }
    const handleForgetPasswordSubmit = async (email) => {
        try{
            setLoading(true)
            const response = await axios.post('/api/users/forgetpassword', {email});
            toast.success('Şifre sıfırlama bağlantısı gönderildi.');
        } catch (error) {
            setErrorMessage(error.response?.data?.error  || "Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user.username, user.password]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? <span className="loading loading-spinner text-white"></span>:<span className="text-3xl">Giriş Yap</span>}</h1>
            <hr/>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-5"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => {
                    setUser({...user, username: e.target.value});
                    setErrorMessage(null);
                }}
                placeholder="Kullanıcı Adı ve E-Posta"
            />
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => {
                    setUser({...user, password: e.target.value});
                    setErrorMessage(null)
                }}
                placeholder="Şifre"
            />
            {
                errorMessage ? (
                    <div className="alert alert-error h-5 w-auto mt-2 pr-2 pb-8 text-sm mb-5">
                        <span>{errorMessage}</span>
                    </div>
                ) : null
            }

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


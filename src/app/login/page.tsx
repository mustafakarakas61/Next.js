"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

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
            <label htmlFor="username">Kullanıcı Adı veya E-Posta</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => {
                    setUser({...user, username: e.target.value});
                    setErrorMessage(null);
                }}
                placeholder="Kullanıcı Adı ve E-Posta"
            />
            <label htmlFor="password">Şifre</label>
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

            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Giriş Yap
            </button>
            <Link href="/signup">Hesabınız yok mu? Kayıt sayfasını ziyaret edin!</Link>
        </div>
    );
}


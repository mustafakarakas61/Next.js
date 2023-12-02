"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

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
    const [errorMessage, setErrorMessage] = useState(null);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);
            setErrorMessage(error.response.data.error)
            toast.error(error.message);

            setUser({
                name: "",
                surname: "",
                email: "",
                password: "",
                acceptPassword: "",
                username: "",
            });
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
                            setErrorMessage(null)
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
                            setErrorMessage(null)
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
                            setErrorMessage(null)
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
                            setErrorMessage(null)
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
                            setErrorMessage(null)
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
                            setErrorMessage(null)
                        }}
                        placeholder="Şifre Onayı"
                    />
                </div>
            </div>
            {
                errorMessage ? (
                    <div className="alert alert-error h-5 w-auto mt-2 pr-2 pb-8 text-sm mb-5">
                        <span>{errorMessage}</span>
                    </div>
                ) : null
            }

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


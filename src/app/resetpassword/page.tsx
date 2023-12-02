"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import axios from 'axios';

export default function ResetPasswordPage () {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = useState("");
    const [password, setPassword] = React.useState({
        password: "",
        acceptPassword: "",
    })
    const [reset, setReset] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onResetUserPassword = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token, password: password.password, acceptPassword: password.acceptPassword})
            setReset(true);
            router.push("/login")
        } catch (error:any) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? <span className="loading loading-spinner text-white"></span> :
                <span className="text-3xl">Yeni Şifrenizi Oluşturun</span>}</h1>
            <hr/>
            <div className="flex flex-col items-center justify-center mt-5">
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        value={password.password}
                        onChange={(e) => {
                            setPassword({...password, password: e.target.value})
                            setErrorMessage(null)
                        }}
                        placeholder="Şifre"
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="accept-password"
                        type="password"
                        value={password.acceptPassword}
                        onChange={(e) => {
                            setPassword({...password, acceptPassword: e.target.value})
                            setErrorMessage(null)
                        }}
                        placeholder="Şifre Onayı"
                    />
            </div>
            {
                errorMessage ? (
                    <div className="alert alert-error h-5 w-auto mt-2 pr-2 pb-8 text-sm mb-5">
                        <span>{errorMessage}</span>
                    </div>
                ) : null
            }

            <button
                onClick={onResetUserPassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Sıfırla
            </button>
        </div>
    );
};

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
        username: "",
    })
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);
            setErrorMessage(error.response.data.error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? <span className="loading loading-spinner text-white"></span> :
                <span className="text-3xl">Signup</span>}</h1>
            <hr/>
            <label htmlFor="name">name</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => {
                    setUser({...user, name: e.target.value})
                    setErrorMessage(null)
                }}
                placeholder="name"
            />
            <label htmlFor="surname">surname</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="surname"
                type="text"
                value={user.surname}
                onChange={(e) => {
                    setUser({...user, surname: e.target.value})
                    setErrorMessage(null)
                }}
                placeholder="surname"
            />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => {
                    setUser({...user, username: e.target.value})
                    setErrorMessage(null)
                }}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => {
                    setUser({...user, email: e.target.value})
                    setErrorMessage(null)
                }}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => {
                    setUser({...user, password: e.target.value})
                    setErrorMessage(null)
                }}
                placeholder="password"
            />

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
                Signup
            </button>
            <Link href="/login">Already have an account? Visit login page!</Link>
        </div>
    );
}


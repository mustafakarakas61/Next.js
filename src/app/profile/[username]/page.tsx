"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function UserProfile({params}: any) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/users/me")

                if(res.data.data != null) {
                    setData(res)
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }


            } catch (error: any) {
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        fetchUser();
    }, [isLoggedIn]);

    const getLoginPage = () => {
        if (!isLoggedIn) {
            router.push("/login")
           return true
        } else {
           return false
        }
    }

    if(loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between">
                <span className="loading loading-spinner text-white min-h-screen"></span>
            </div>
        );
    } else if (isLoggedIn){
        return (
            <div className="flex min-h-screen flex-col items-center justify-between">
                <div className="absolute top-20 right-0 p-20 w-96 h-96 bg-white dark:bg-black">
                    PROFILE
                </div>
                <div
                    className="absolute left-20 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <div className="absolute top-0 flex flex-col items-center justify-center min-h-screen py-2">
                        <p className="text-2xl mb-4">Hoşgeldiniz</p>
                        <hr/>
                        <p className="text-4xl">
                                <span className="text-white">{
                                    data != null ? (<span>{data.data.data?.name} {data.data.data?.surname}</span>) : null
                                }</span>
                            <span className="p-2 ml-2 rounded bg-blue-500 text-black">{params.username}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between">
                <span className="loading loading-spinner text-white min-h-screen">{getLoginPage()}</span>
            </div>
        );
    }
}

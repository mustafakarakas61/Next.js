"use client"

import {useEffect, useState} from "react";
import axios from "axios";

export default function AboutPage() {
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/users/me")

                if (res.data?.data) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    })
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            {loading ? (
                <span className="loading loading-spinner text-white"></span>
            ) : isLoggedIn ?(
                <div className="flex">
                    <div className="bg-white  w-96 h-96 text-black">
                        1
                    </div>
                    <div className="bg-base-300/70 w-96 h-96">
                        2
                    </div>
                    <div className="text-black bg-secondary w-full h-96">
                        3
                    </div>
                </div>
            ): (
                <p>linkedIn <a href="https://www.linkedin.com/in/mustafakarakas61/">@mustafakarakas61</a> </p>
            )}
        </main>
    );
}
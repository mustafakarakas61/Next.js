"use client"

import {useEffect, useState} from "react";
import axios from "axios";

export default function CustomersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/users/me")

                if(res.data?.data?.isAdmin){
                    setIsAdminLoggedIn(true)
                } else {
                    setIsAdminLoggedIn(false)
                }

                if (isAdminLoggedIn) {
                    const fetchUsers = async () => {
                        try {
                            const res = await axios.get("/api/users/customers")
                            setUsers(res.data.data)
                            // console.log(res.data.data)
                        } catch (error) {
                            console.error(error)
                        }
                    }

                    await fetchUsers();
                }

            } catch (error) {
                setIsAdminLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        fetchUser();
    }, [isAdminLoggedIn])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center overflow-x-auto h-96">
                {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                ) : isAdminLoggedIn ? (
                    <div className="items-center justify-center overflow-x-auto h-96">
                        <table className="flex table table-pin-rows">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                users.map(({_id, email, username}, index) => (
                                    <tr key={_id} className="hover:bg-blue-300">
                                        <td>{index + 1}</td>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Bu sayfayı sadece yetkili kişiler görüntüleyebilir</p>
                )}
            </div>
        </main>
    )
}
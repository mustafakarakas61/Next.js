"use client"

import {useEffect, useState} from "react";
import axios from "axios";

export default function CustomersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get("/api/users/me")
                setIsLoggedIn(true)

                if (isLoggedIn) {
                    const fetchUsers = async () => {
                        try {
                            const res = await axios.get("/api/users/customers")
                            setUsers(res.data.data)
                            // console.log(res.data.data)
                        } catch (error) {
                            console.error(error)
                        } finally {
                            setLoading(false)
                        }
                    }

                    await fetchUsers();
                }

            } catch (error) {
                setIsLoggedIn(false)
                setLoading(false)
            }
        }

        fetchUser();
    }, [isLoggedIn])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center overflow-x-auto h-96">
                {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                ) : isLoggedIn && users.length > 0 ? (
                    <div className="items-center justify-center overflow-x-auto h-96">
                        <table className = "flex table table-pin-rows">
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
                    <p>No users available, please log in</p>
                )}
            </div>
        </main>
    )
}
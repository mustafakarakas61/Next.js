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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                    ) : isLoggedIn && users.length > 0 ? (
                    <table className = "table">
                        <thead>
                        <tr>
                            <th></th>
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
                ) : (
                    <p>No users available, please log in</p>
                )}
        </div>
    )
}
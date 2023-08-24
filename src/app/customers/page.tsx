"use client"

import {useEffect, useState} from "react";
import axios from "axios";

export default function CustomersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/api/users/customers")
                setUsers(res.data.data)
                // console.log(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUsers();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                {users.length > 0 ? (
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
                                    <th>{index + 1}</th>
                                    <th>{username}</th>
                                    <th>{email}</th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    /*users.map(({_id, email, username}, index) => (
                        <li key={_id}>
                            <p>{index + 1}. <b>Username</b>: {username} | <b>Email</b>: {email}</p>
                        </li>
                    ))*/
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    )
}
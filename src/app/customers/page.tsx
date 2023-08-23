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
                console.log(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUsers();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1><b>Customers</b></h1>
            <ul>
                {users.length > 0 ? (
                    users.map(({_id, email, username}, index) => (
                        <li key={_id}>
                            <p>{index + 1}. <b>Username</b>: {username} | <b>Email</b>: {email}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
        </div>
    )
}
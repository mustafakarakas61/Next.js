"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {NextResponse} from "next/server";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [updatedUser, setUpdatedUser] = useState({
        newUsername: "",
        _id: "",
    })
    const [errorMessage, setErrorMessage] = useState(null)

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
            window.location.reload();
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id);
    }

    const updateUser = async () => {
        try {
            const res = await axios.get("/api/users/me")
            updatedUser._id = res.data.data._id;

            const response = await axios.put('/api/users/me/update', updatedUser)
            console.log("Update successful", response.data)
            window.location.reload();

        } catch (error: any) {
            setErrorMessage(error.message)
            NextResponse.json({error: error.message}, {status: 500})
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            {/*<p>Profile Page</p>*/}

            <label htmlFor="newUsername">Change Username</label>
            <input
                className="input input-bordered input-warning w-60 max-w-xs"
                id="newUsername"
                type="text"
                value={updatedUser.newUsername}
                onChange={(e) => {
                    setUpdatedUser({...updatedUser, newUsername: e.target.value});
                    setErrorMessage(null);
                }
                }
                placeholder="new username"
            />
            {
                errorMessage ? (
                    <div className="alert alert-error h-5 w-full mt-2 pb-8 text-sm text-center">
                        <span>{errorMessage}</span>
                    </div>
                ) : null
            }

            <button
                onClick={updateUser}
                className="btn btn-outline btn-accent mt-5"
            >
                Change
            </button>

            {/*<h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" :
                <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                GetUser Details
            </button>*/}
        </div>
    )
}
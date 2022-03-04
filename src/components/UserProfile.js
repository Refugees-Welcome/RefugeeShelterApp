import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context"

export default function UserProfile(props) {
    const {user} = useContext(AuthContext);
    return (
      <div className="UserProfile">
        <h1> User Profile from {user.username}</h1>
        <p>{user._id}</p>
    </div>
        
    )
}
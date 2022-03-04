import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context"

export default function UserProfile() {
    const {user} = useContext(AuthContext);
console.log(user)
    return (
      <div className="UserProfile">
        <h1> User Profile from {user.username}</h1>
    </div>
        
    )
}
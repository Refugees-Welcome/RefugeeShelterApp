import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserProfile(props) {

    const {user} = useContext(AuthContext);
//     const [content, setContent] = useState(undefined);
//     const { getToken } = useContext(AuthContext);
//     const storedToken = getToken();
//     useEffect((shelter) => {
//       axios.get(`${process.env.REACT_APP_API_URL}/shelter/`, { headers: { Authorization: `Bearer ${storedToken}` } })
//       .then(response => {
//       setContent = response.data.filter(e=> {e.author === user._id})
//     })
//     .catch()
//     },[])
    return (
      <div className="UserProfile">
        <h1> User Profile from {user.username}</h1>
         {/* <Link to={`/shelter/${content._id}`}>edit: {content.name}</Link> */}
      </div>
        
    )
}
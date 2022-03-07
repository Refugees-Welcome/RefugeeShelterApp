import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserProfile(props) {

    const {user} = useContext(AuthContext);
    const [content, setContent] = useState(undefined);
    
    useEffect(()=>{
        props.shelter.filter(
        shelter=> {
          if(shelter.author._id === user._id)
          {
            setContent(shelter)
        return 
        
      }
      })
   },[])
    return (
      <div className="UserProfile">
        <h1> User Profile from {user.username}</h1>
        {/* {props.shelter.filter(
        shelter=> {
          if(shelter.author._id === user._id)
          {setContent(shelter)
            return <Link to={`/shelter/${content._id}`}>edit: {content.name}</Link> 
          }})
        } */}
        {content?  <Link to={`/shelter/${content._id}`}>edit: {content.name}</Link>: <p>currently no shelters</p>}
      </div>
    )
}
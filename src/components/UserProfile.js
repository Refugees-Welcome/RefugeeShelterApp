import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"
import { Link } from "react-router-dom";


export default function UserProfile(props) {

  const { user } = useContext(AuthContext);

  const [authorShelters, setAuthorShelters] = useState([])
  
  useEffect(() => {
    if(user){
          const userFilter = props.shelter.filter(
            (shelter) => shelter.author._id === user._id
          );

          return setAuthorShelters(userFilter);
    } 
  }, [user])
  
if (user === null) {
    return (<div>loading…</div>);
  }

  return (
    <div className="UserProfile">
      <h1 className="userProfile"> User Profile from {user.username}</h1>
      {authorShelters.length === 0?<div>currently no created shelter</div>:
    authorShelters.map(shelter => {return (<div key={shelter._id} className="CreatedShelters"><Link className="linkCreatedShelters" to={`/shelterEdit/${shelter._id}`}>edit: {shelter.name}</Link></div>)
      })}
    </div>
  )
}
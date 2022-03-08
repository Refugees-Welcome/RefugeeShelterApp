import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"
import { Link } from "react-router-dom";

export default function UserProfile(props) {
 
  const { user } = useContext(AuthContext);
  // const { isLoggedIn, isLoading } = useContext(AuthContext);
  const [authorShelters, setAuthorShelters] = useState([])
  
  useEffect(() => {
    if(user && props.shelter){
        console.log("user....", user)
        console.log("props.shelter....", props.shelter)

          const userFilter = props.shelter.filter(
            (shelter) => shelter.author._id === user._id
          );

          return setAuthorShelters(userFilter);
    } 
  }, [user, props.shelter])
  
if (user === null) {
    return (<div>loading…</div>);
  }



// if (isLoading) {
//   return <p>Loading ...</p>
// }




  return (
    <div className="UserProfile">
      <h1 className="userProfile"> User Profile from {user.username}</h1>
      {authorShelters.length === 0?<div>currently no created shelter</div>:
    authorShelters.map(shelter => {return (<div key={shelter._id} className="CreatedShelters"><Link className="linkCreatedShelters" to={`/shelterEdit/${shelter._id}`}>edit: {shelter.name}</Link></div>)
      })}
    </div>
  )
}
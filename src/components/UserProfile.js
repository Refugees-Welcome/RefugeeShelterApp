import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"
import { Link } from "react-router-dom";

export default function UserProfile(props) {

  const { user } = useContext(AuthContext);
  // const { isLoggedIn, isLoading } = useContext(AuthContext);
  const [authorShelters, setAuthorShelters] = useState([])
  const [authorRefugees, setAuthorRefugees] = useState([])

  useEffect(() => {
    compareUserShelter()
    compareUserRefugee()
  }, [])

  const compareUserShelter = () => {
    const userFilterShelters = props.shelter.filter(
      (e) => e.author._id === user._id
    );
    
    return setAuthorShelters(userFilterShelters)
  }

  const compareUserRefugee = () => {
    
    const userFilterRefugees = props.refugee.filter(
      (e) => e.author._id === user._id
    );
    
    return setAuthorRefugees(userFilterRefugees)

  }

  if (user === null) {
    return (<div>loading…</div>);
  }

  // if (isLoading) {
  //   return <p>Loading ...</p>
  // }

  return (<div className="container">
    <div class="row justify-content-center">
    <div className="UserProfile">
      <br></br>

      <h1 className="userProfile"> User Profile from {user.username}</h1>
      <div className="m-10">
        {authorShelters.length === 0 ? <div>currently no created shelter</div> :
          authorShelters.map(shelter => {

            return (<div key={shelter._id} className="CreatedShelters M-10"><Link className="linkCreatedShelters" to={`/shelterEdit/${shelter._id}`}><button className="btn btn-primary">edit Shelter: {shelter.name}</button> </Link></div>)
          })}
      </div>
      <div className="m-10">
        <h2 className="userProfile"> refugees on search you created </h2>
        {authorRefugees.length === 0 ? <div>no refugees listed</div> :
          authorRefugees.map(refugee => {
            return (<div key={refugee._id} className="CreatedRefugees"><Link className="linkCreatedRefugee" to={`/refugeeEdit/${refugee._id}`}><button className="btn btn-primary">edit Refugee: {refugee.name}</button> </Link></div>)
          })}
      </div>
    </div>
    </div>
    </div>
  )
}

// useEffect(() => {
//   if (user && props.refugee) {
//     const userFilterRefugees = props.refugee.filter(
//       (e) => e.author._id === user._id
//     );
//     return setAuthorRefugees(userFilterRefugees)
//   }
// }, [user, props.refugee])

// if (user === null) {
//   return (<div>loading…</div>);
// }



// if (isLoading) {
//   return <p>Loading ...</p>
// }

{/* <h2 className="userProfile"> refugees on search you created </h2>
      {authorRefugees.length === 0 ? <div>no refugees listed</div> :
        authorRefugees.map(refugee => {
          return (<div key={refugee._id} className="CreatedRefugees"><Link className="linkCreatedRefugee" to={`/refugeeEdit/${refugee._id}`}><button className="btn btn-primary">edit Refugee: {refugee.name}</button> </Link></div>)
        })} */}

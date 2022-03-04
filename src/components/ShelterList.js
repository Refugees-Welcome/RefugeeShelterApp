import { Link } from "react-router-dom"

export default function ShelterList(props){
    return(
        <div className="shelterList">
            <h1>Available Shelters</h1>

            { props.shelters.map( shelter => {
                return (
                    <div className="shelter-summary" key={shelter._id}>
                        <h2>{shelter.name}</h2>
                        <h4>Languages: {shelter.languages}</h4>
                        <h4>Address: {shelter.address}</h4>
                        <Link to={`/shelter/${shelter._id}`}>more Details</Link>
                        <br></br>
                    </div>
                    )
                })
            }
        </div>
    )
}
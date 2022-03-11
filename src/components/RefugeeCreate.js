import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"

export default function CreateRefugee(props) {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [onSearch, setOnSearch] = useState(true);
    const [currentlyBasedIn, setBasedIn] = useState("");
    const [error, setErrorMessage] = useState("");

    const { getToken } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const refugeeDetails = {
            name,
            languages,
            contactInfo,
            description,
            author: user._id,
            // onSearch, 
            currentlyBasedIn,
        };

        const storedToken = getToken();

        axios.post(
            `${process.env.REACT_APP_API_URL}/refugee`,
            refugeeDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                props.updateRefugee();
                navigate("/refugee/");
            })
            .catch(e => console.log("error creating new refugee...", e))
    }
    return (
        
        <div className="RefugeeCreate">
        <br></br>
            <h1>I'm on search for a shelter</h1>
             <div className="ShelterEdit">
                <h1>Change for Shelter Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 d-flex justify-content-center">
                        
                        <div className="col-md-6  m-2">
                            <label htmlFor="Name">Name:</label>
                                <input 
                                    type="text"
                                    required={true}
                                    name="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control m-2"
                                    id="Name"
                                />
                            
                        </div>

                        <div className="col-md-6  m-2">
                            <label htmlFor="Languages">Languages:</label>
                                <input htmlFor="Name"
                                    type="text"
                                    required={true}
                                    name="Languages"
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    className="form-control m-2"
                                />
                            
                        </div>

                        <div className="col-md-6  m-2">
                            <label htmlFor="ContactInfo">Contact Info:</label>
                                <input
                                    type="text"
                                    required={true}
                                    name="contactInfo"
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="form-control m-2"
                                />
                            
                        </div>

                        <div className="col-md-6  m-2">
                            <label htmlFor="Description">Description:</label>
                                <textarea
                                    type="text"
                                    required={true}
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control m-2"
                                    cols="40" rows="5"
                                />
                            
                        </div>

                        <div className="col-md-6  m-2">
                            <label htmlFor="Address">currently based near:</label>
                                <input
                                    type="text"
                                    required={true}
                                    name="address"
                                    value={currentlyBasedIn}
                                    onChange={(e) => setBasedIn(e.target.value)}
                                    className="form-control m-2"
                                />
                            
                        
                        
                            <button type="submit" className=" col-md-6 btn btn-primary ">list Refugee</button>
                        
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}
                        {/* <button type="onSearch" value={onSearch} 
//                     onClick={ () => { this.changeText("newtext")}  } 
//                     onChange={(e) => setOnSearch(e.target.value)}>
//                     {onSearch} 
//                 </button> */}
                       
                    
  

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
        <br></br>
        <br></br>
        <br></br>
            <h1>I'm on search for a shelter</h1>
            <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-lg-2 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Name">Name:</label>
                            <input
                                type="text"
                                required={true}
                                name="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Languages">Languages:</label>
                            <input htmlFor="Name"
                                type="text"
                                required={true}
                                name="Languages"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ContactInfo">ContactInfo:</label>
                            <input
                                type="text"
                                required={true}
                                name="contactInfo"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Description">Description:</label>
                            <textarea
                                type="text"
                                required={true}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                cols="40" rows="5"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="currentlyBasedIn">currently in:</label>
                            <input
                                type="text"
                                required={true}
                                name="currentlyBasedIn"
                                value={currentlyBasedIn}
                                onChange={(e) => setBasedIn(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        {/* <button type="onSearch" value={onSearch} 
//                     onClick={ () => { this.changeText("newtext")}  } 
//                     onChange={(e) => setOnSearch(e.target.value)}>
//                     {onSearch} 
//                 </button> */}
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary p-3 mt-2">list Refugee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

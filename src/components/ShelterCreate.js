import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
export default function CreateProject(props) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");
    const [error, setErrorMessage] = useState("");

    const { getToken } = useContext(AuthContext);
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const shelterDetails = {
        name: name,
        languages: languages,
        contactInfo: contactInfo,
        description: description,
        // available,
        address: address
      };
      const storedToken = getToken();

      axios.post(
        `${process.env.REACT_APP_API_URL}/shelter`,
        shelterDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } }
    )
        .then(response => {
            props.updateShelter();
            navigate("/");
        })
        .catch(e => console.log("error creating new shelter...", e))
}

    return(
        <div className="ShelterCreate">
              <h1>I have a shelter that I can share</h1>
              <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-lg-2">
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
                            <label htmlFor="Address">Address:</label>
                            <input
                                type="text"
                                required={true}
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="col-lg-2">
                        </div>
                        <button type="submit" className="btn btn-primary p-3">create shelter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

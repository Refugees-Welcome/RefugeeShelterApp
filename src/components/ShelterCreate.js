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
    
    const handleLoginSubmit = (e) => {
      e.preventDefault();
  
      const shelterDetails = {
        name: name,
        languages: languages,
        contactInfo: contactInfo,
        description: description,
        address: address
      };
      const storedToken = getToken();

      axios.post(
        `${process.env.REACT_APP_API_URL}/shelter`, 
        shelterDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
    .then( () => {
        props.updateShelter();
          navigate("/");
        })
        .catch( error => {
          const msg = error.response.data.errorMessage;
          console.log("error creating new user...", msg);
          setErrorMessage(msg);
        });
    };

    return(
        <div className="ShelterCreate">
              <h1>I have a shelter that I can share</h1>
              <div class="container">
                <div class="col-lg-1"></div>
                <div class="col-lg-2">
                    <form onSubmit={handleLoginSubmit}>
                        <div class="form-group">
                            <label for="Name">Name:</label>
                            <input
                                type="text"
                                required={true}
                                name="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                class="form-control"
                                id="Name"
                            />
                        </div>

                        <div class="form-group">
                            <label for="Languages">Languages:</label>
                            <input for="Name"
                                type="text"
                                required={true}
                                name="Languages"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                class="form-control"
                            />
                        </div>

                        <div class="form-group">
                            <label for="ContactInfo">ContactInfo:</label>
                            <input
                                type="text"
                                required={true}
                                name="contactInfo"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                class="form-control"
                            />
                        </div>

                        <div class="form-group">
                            <label for="Description">Description:</label>
                            <textarea
                                type="text"
                                required={true}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                class="form-control"
                                cols="40" rows="5"
                            />
                        </div>

                        <div class="form-group">
                            <label for="Address">Address:</label>
                            <input
                                type="text"
                                required={true}
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                class="form-control"
                            />
                        </div>

                        <div class="col-lg-2">
                        </div>
                        <button type="submit" class="btn btn-primary p-3">create shelter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

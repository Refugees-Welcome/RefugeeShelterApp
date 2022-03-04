import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShelterCreate(){

    const [name, setName] = useState("");
    const [languages, setLanguage] = useState("");
    const [description, setDescription] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleName = (e) => setName(e.target.value);
    const handleLanguages = (e) => setLanguage(e.target.value);
    const handleContactInfo = (e) => setContactInfo(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleAddress = (e) => setAddress(e.target.value);

    const handleLoginSubmit = (e) => {
      e.preventDefault();
  
      const shelterDetails = {
        name: handleName,
        languages: handleLanguages,
        contactInfo: handleContactInfo,
        description: handleDescription,
        address: handleAddress
      }
  
      axios.post(`${process.env.REACT_APP_API_URL}/shelter`, shelterDetails)
        .then( () => {
          //navigate("/");
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
                <div class="col-sm container-lg"></div>
                <div class="col-sm">
                    <form onSubmit={handleLoginSubmit}>
                <div class="form-group">
                    <label for="Name">Name:</label>
                    <input
                        type="text"
                        required={true}
                        name="Name"
                        value={name}
                        onChange={handleName}
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
                        onChange={handleLanguages}
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
                        onChange={handleContactInfo}
                        class="form-control"
                    />
                </div>

                <div class="form-group">
                    <label for="Description">Description:</label>
                    <input
                        type="text"
                        required={true}
                        name="description"
                        value={description}
                        onChange={handleDescription}
                        class="form-control"
                    />
                </div>

                <div class="form-group">
                    <label for="Address">Address:</label>
                    <input
                        type="text"
                        required={true}
                        name="address"
                        value={address}
                        onChange={handleAddress}
                        class="form-control"
                    />
                </div>

                <button type="submit" class="btn btn-primary p-3">create shelter</button>
                    </form>
                </div>
                <div class="col-sm container-lg"></div>
              </div>
        </div>
    )
}
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

    console.log("create shelter");

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
              <h1>Shelter Create</h1>

              <form onSubmit={handleLoginSubmit}>
                <label>
                Name:
                <input
                    type="text"
                    required={true}
                    name="name"
                    value={name}
                    onChange={handleName}
                />
                </label>

                <label>
                Languages:
                <input
                    type="text"
                    required={true}
                    name="password"
                    value={languages}
                    onChange={handleLanguages}
                />
                </label>

                <label>
                ContactInfo:
                <input
                    type="text"
                    required={true}
                    name="contactInfo"
                    value={contactInfo}
                    onChange={handleContactInfo}
                />
                </label>

                <label>
                Description:
                <input
                    type="text"
                    required={true}
                    name="description"
                    value={description}
                    onChange={handleDescription}
                />
                </label>

                <label>
                Address:
                <input
                    type="text"
                    required={true}
                    name="address"
                    value={address}
                    onChange={handleAddress}
                />
                </label>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
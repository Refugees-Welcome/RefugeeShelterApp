import axios from "axios";
import { useContext, useState } from "react";
import { VideoOverlay } from "react-leaflet";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
export default function ShelterCreate(props) {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");
    const [error, setErrorMessage] = useState("");

    const { getToken } = useContext(AuthContext);

    const handleSubmit = (e) => {
        console.log("ShelterCreate");
        e.preventDefault();

        var shelterDetails = {
            name: name,
            languages: languages,
            contactInfo: contactInfo,
            description: description,
            author: user._id,
            // available,
            address: address,
            location: {
                type: 'Point',
                coordinates: []
            }
        };

        axios
        .get(`https://nominatim.openstreetmap.org/search?&format=geojson&q=${shelterDetails.address}`)
        .then((response) => {
            console.log(response.data.features[0].geometry.coordinates[0]);
            console.log(response.data.features[0].geometry.coordinates[1]);

            shelterDetails.location.coordinates = [response.data.features[0].geometry.coordinates[1], response.data.features[0].geometry.coordinates[0]];

            console.log(shelterDetails)

            axios.post(`${process.env.REACT_APP_API_URL}/shelter`,
                        shelterDetails,
                        { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                props.updateShelter();
                navigate("/");
            })
            .catch(error => console.log("error creating new shelter...", error))
        })
        .catch(error => console.log("error creating new shelter...", error));

        const storedToken = getToken();

    }

    return (
        <div className="ShelterCreate">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>I have a shelter that i can share</h1>
             <div className="ShelterEdit">
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
                            <label htmlFor="Address">Address:</label>
                                <input
                                    type="text"
                                    required={true}
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control m-2"
                                />

                        </div><div className="col-md-6  m-2">
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary p-3 mt-2">list Refugee</button>
                        </div>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

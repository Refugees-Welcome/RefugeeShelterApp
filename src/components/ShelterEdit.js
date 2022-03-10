import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useParams } from "react-router-dom"



export default function ShelterEdit(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useContext(AuthContext);
    const storedToken = getToken();

    const [shelter, setShelter] = useState("")

    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [available, setAvailable] = useState(true);
    const [error, setErrorMessage] = useState("");

    useEffect(() => {

        const findShelter = props.shelter.find(e => { return e._id === id })
        setShelter(findShelter)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const shelterDetails = {
            name: name,
            languages: languages,
            contactInfo: contactInfo,
            description: description,
            address: address
        }

        axios.put(`${process.env.REACT_APP_API_URL}/shelter/${id}`, shelterDetails, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setShelter(response.data);
                props.updateShelter();
                navigate("/");
            })
            .catch(error => {
                const msg = error.response.data.errorMessage;
                console.log("error editing shelter...", msg);
                setErrorMessage(msg);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API_URL}/shelter/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                props.updateShelter();
                navigate("/");
            })
            .catch(error => {
                const msg = error.response.data.errorMessage;
                console.log("error deleting Shelter...", msg);
                setErrorMessage(msg);
            });

    };
    const renderDetails = (shelter) => {
        return (
            <div className="ShelterEdit">
                <h1>Change for Shelter Details</h1>
                
                    <div className="row g-3 d-flex justify-content-center">
                        <div className="col-md-6  m-2">
                            <label htmlFor="Name">Name:</label>
                                <input 
                                    type="text"
                                    required={true}
                                    name="Name"
                                    defaultValue={shelter.name}
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
                                    defaultValue={shelter.languages}
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
                                    defaultValue={shelter.contactInfo}
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
                                    defaultValue={shelter.description}
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
                                    defaultValue={shelter.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control m-2"
                                />
                            
                        </div><div className="col-md-6  m-2">
                        <div className="col d-grid gap-2">
                            
                                <button type="button" onClick={handleSubmit} className="edit btn btn-primary p-3 mt-2 ">edit shelter</button>
                            
                                <button type="button" onClick={handleDelete} className="delete btn btn-danger p-3 ">delete shelter</button>
                        </div>
                        </div>
                    </div>
            </div>
        )
    }
    return (
        <section className="ShelterDetails">
        <br></br>
            {
                renderDetails(shelter)

            }
        </section>
    )
}

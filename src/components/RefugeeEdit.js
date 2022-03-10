import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useParams } from "react-router-dom"



export default function RefugeeEdit(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useContext(AuthContext);
    const storedToken = getToken();

    const [refugee, setRefugee] = useState("")

    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    const [currentlyBasedIn, setCurrentlyBasedIn] = useState("");
    const [onSearch, setOnSearch] = useState(true);
    const [error, setErrorMessage] = useState("");

    useEffect(() => {

        const findRefugee = props.refugee.find(e => { return e._id === id })
        setRefugee(findRefugee)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const refugeeDetails = {
            name: name,
            languages: languages,
            contactInfo: contactInfo,
            description: description,
            currentlyBasedIn: currentlyBasedIn
        }

        axios.put(`${process.env.REACT_APP_API_URL}/refugee/${id}`, refugeeDetails, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setRefugee(response.data);
                props.updaterefugee();
                navigate("/");
            })
            .catch(error => {
                const msg = error.response.data.errorMessage;
                console.log("error editing refugee...", msg);
                setErrorMessage(msg);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API_URL}/refugee/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                props.updaterefugee();
                navigate("/");
            })
            .catch(error => {
                const msg = error.response.data.errorMessage;
                console.log("error deleting refugee...", msg);
                setErrorMessage(msg);
            });

    };
    const renderDetails = (refugee) => {
        return (
            <div className="RefugeeEdit">
                <h1>Change for refugee Details</h1>
                
                    <div className="row g-3 d-flex justify-content-center">
                        <div className="col-md-6  m-2">
                            <label htmlFor="Name">Name:</label>
                                <input 
                                    type="text"
                                    required={true}
                                    name="Name"
                                    defaultValue={refugee.name}
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
                                    defaultValue={refugee.languages}
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
                                    defaultValue={refugee.contactInfo}
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
                                    defaultValue={refugee.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control m-2"
                                    cols="40" rows="5"
                                />
                            
                        </div>

                        <div className="col-md-6  m-2">
                            <label htmlFor="currentlyBasedIn">currently based near:</label>
                                <input
                                    type="text"
                                    required={true}
                                    name="currentlyBasedIn"
                                    defaultValue={refugee.currentlyBasedIn}
                                    onChange={(e) => setCurrentlyBasedIn(e.target.value)}
                                    className="form-control m-2"
                                />
                            
                        </div><div className="col-md-6  m-2">
                        <div className="col d-grid gap-2">
                            
                                <button type="button" onClick={handleSubmit} className="edit btn btn-primary p-3 mt-2 ">edit refugee</button>
                            
                                <button type="button" onClick={handleDelete} className="delete btn btn-danger p-3 ">delete refugee</button>
                        </div>
                        </div>
                    </div>
            </div>
        )
    }
    return (
        <section className="refugeeDetails">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            {
                renderDetails(refugee)

            }
        </section>
    )
}
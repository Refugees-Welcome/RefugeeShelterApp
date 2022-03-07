import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
import { useParams} from "react-router-dom"
import userEvent from "@testing-library/user-event";


export default function ShelterEdit(props) {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { getToken } = useContext(AuthContext);
    const storedToken = getToken();

    const [shelter, setShelter] = useState ("")
    
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState(""); 
    const [available, setAvailable] = useState(true);
    const [error, setErrorMessage] = useState("");

    useEffect(() => {
    const findShelter = props.shelter.find(e => {return e._id === id})
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

const  handleDelete = (e) => {
        
        axios.delete(`${process.env.REACT_APP_API_URL}/shelter/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            props.updateShelter();
            navigate("/profile");
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
                <h1>I have a shelter that I can share</h1>
                <div className="container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="Name">Name:
                                <input
                                    type="text"
                                    required={true}
                                    name="Name"
                                    defaultValue={shelter.name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="Name"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Languages">Languages:
                                <input htmlFor="Name"
                                    type="text"
                                    required={true}
                                    name="Languages"
                                    defaultValue={shelter.languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    className="form-control"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ContactInfo">Contact Info:
                                <input
                                    type="text"
                                    required={true}
                                    name="contactInfo"
                                    defaultValue={shelter.contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="form-control"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Description">Description:
                                <textarea
                                    type="text"
                                    required={true}
                                    name="description"
                                    defaultValue={shelter.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                    cols="40" rows="5"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Address">Address:
                                <input
                                    type="text"
                                    required={true}
                                    name="address"
                                    defaultValue={shelter.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                />
                                </label>
                            </div>

                            <div className="col-lg-2">
                            </div>
                            <button type="submit" className="edit btn btn-primary p-3">edit shelter</button>
                        </form>
                        <form onSubmit={handleDelete}>
                        <button type="submit" className="delete btn btn-primary p-3">delete shelter</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section className="ShelterDetails">
            {shelter ?
                renderDetails(shelter) :
                <p>loading....</p>
            }
        </section>
    )
}

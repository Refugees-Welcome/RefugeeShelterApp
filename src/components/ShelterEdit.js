import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
import { useParams } from "react-router-dom"

export default function ShelterEdit() {


    const { id } = useParams();
    const [details, setDetails] = useState(undefined);
    const { getToken } = useContext(AuthContext);
    const storedToken = getToken();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");
    const [error, setErrorMessage] = useState("");

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/shelter/` + id, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setDetails(response.data);
            })
            .catch()
    }, []);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const shelterDetails = {
            name: name,
            languages: languages,
            contactInfo: contactInfo,
            description: description,
            address: address
        }
 
        axios.post(`${process.env.REACT_APP_API_URL}/refugee/` + id, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setDetails(response.data);
                navigate("/");
            })
            .catch(error => {
                const msg = error.response.data.errorMessage;
                console.log("error editing new user...", msg);
                setErrorMessage(msg);
            });
    };
// Idea
//    const onTodoChange(value){
//         this.setName({
//              name: value
//         });
//     }

    const renderDetails = (details) => {
        return (
            <div className="ShelterEdit">
                <h1>I have a shelter that I can share</h1>
                <div className="container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <label for="Name">Name:
                                <input
                                    type="text"
                                    required={true}
                                    name="Name"
                                    value={details.name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="Name"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label for="Languages">Languages:
                                <input for="Name"
                                    type="text"
                                    required={true}
                                    name="Languages"
                                    value={details.languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    className="form-control"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label for="ContactInfo">Contact Info:
                                <input
                                    type="text"
                                    required={true}
                                    name="contactInfo"
                                    value={details.contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="form-control"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label for="Description">Description:
                                <textarea
                                    type="text"
                                    required={true}
                                    name="description"
                                    value={details.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                    cols="40" rows="5"
                                />
                                </label>
                            </div>

                            <div className="form-group">
                                <label for="Address">Address:
                                <input
                                    type="text"
                                    required={true}
                                    name="address"
                                    value={details.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                />
                                </label>
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
    return (
        <section className="ShelterDetails">
            {details ?
                renderDetails(details) :
                <p>loading....</p>
            }
        </section>
    )
}

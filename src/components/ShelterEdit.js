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

    return(
        <div className="ShelterEdit">
              <h1>Edit Shelter:</h1>
              <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-lg-2">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="Name">Name:</label>
                            <input
                                type="text"
                                required={true}
                                name="Name"
                                value={data.name}
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
                                value={data.languages}
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
                                value={data.contactInfo}
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
                                value={data.description}
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
                                value={data.address}
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
    return (
        <section className="ShelterDetails">
            {details ?
                renderDetails(details) :
                <p>loading....</p>
            }
        </section>
    )
}

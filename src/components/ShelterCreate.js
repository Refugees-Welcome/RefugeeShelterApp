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

    const { getToken } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const shelterDetails = {
            name,
            languages,
            contactInfo,
            description,
            // available, 
            address,
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

    return (
        <div className="CreateShelter">
            <h1>Create a new Shelter</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Languages:
                        <input
                            type="text"
                            name="languages"
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Contact info:
                        <input
                            type="text"
                            name="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
            {/* <button type="available" value={available} 
                    onClick={ () => { this.changeText("newtext")}  } 
                    onChange={(e) => setAvailable(e.target.value)}>
                    {available} 
                </button> */}

                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

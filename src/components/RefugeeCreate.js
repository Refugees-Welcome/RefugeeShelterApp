import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"

export default function CreateRefugee(props) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [onSearch, setOnSearch] = useState(true);
    const [currentlyBasedIn, setBasedIn] = useState("");

    const { getToken } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const refugeeDetails = {
            name,
            languages,
            contactInfo,
            description,
            // onSearch, 
            currentlyBasedIn,
        };

        const storedToken = getToken();

        axios.post(
            `${process.env.REACT_APP_API_URL}/refugee`,
            refugeeDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                props.updateRefugee();
                navigate("/refugee/");
            })
            .catch(e => console.log("error creating new refugee...", e))
    }

    return (
        <div className="CreateRefugee">
            <h1>List as Refugee on Search</h1>

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
            {/* <button type="onSearch" value={onSearch} 
                    onClick={ () => { this.changeText("newtext")}  } 
                    onChange={(e) => setOnSearch(e.target.value)}>
                    {onSearch} 
                </button> */}

                <label>
                    currently in:
                    <input
                        type="text"
                        name="currentlyBasedIn"
                        value={currentlyBasedIn}
                        onChange={(e) => setBasedIn(e.target.value)}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

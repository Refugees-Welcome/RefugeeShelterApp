import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
export default function EditProject(props) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");
    const [error, setErrorMessage] = useState("");

    const [data, setData] = useState();

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/shelter`)
          .then((response) => setData(response.data))
          .catch((err) => console.log(err));
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
  
      axios.post(`${process.env.REACT_APP_API_URL}/shelter/:id`, shelterDetails)
        .then( () => {
          navigate("/");
        })
        .catch( error => {
          const msg = error.response.data.errorMessage;
          console.log("error creating new user...", msg);
          setErrorMessage(msg);
        });
    };

    return(
        <div className="ShelterEdit">
              <h1>I have a shelter that I can share</h1>
              <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-lg-2">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label for="Name">Name:</label>
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
                            <label for="Languages">Languages:</label>
                            <input for="Name"
                                type="text"
                                required={true}
                                name="Languages"
                                value={data.languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label for="ContactInfo">ContactInfo:</label>
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
                            <label for="Description">Description:</label>
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
                            <label for="Address">Address:</label>
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

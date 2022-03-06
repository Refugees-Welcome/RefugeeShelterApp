import axios from "axios";
import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context"
import { useParams } from "react-router-dom"

export default function ShelterEdit() {

    const { id } = useParams();

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [description, setDescription] = useState("");
    // const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");
    const [error, setErrorMessage] = useState("");
    const { getToken } = useContext(AuthContext)
    const [data, setData] = useState(undefined);
    const storedToken = getToken();
    console.log("shelterEdit");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/refugee/`+id,{ headers: { Authorization: `Bearer ${storedToken}` } })
        .then( response => {
            setData(response.data);
        })
        .catch()
      }, [id]);

    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const shelterDetails = {
        name: name,
        languages: languages,
        contactInfo: contactInfo,
        description: description,
        address: address
      }
  
      axios.post(`${process.env.REACT_APP_API_URL}/refugee/`+id,{ headers: { Authorization: `Bearer ${storedToken}` } })
      .then( response => {
          setData(response.data);
          navigate("/");
        })
        .catch( error => {
          const msg = error.response.data.errorMessage;
          console.log("error editing new user...", msg);
          setErrorMessage(msg);
        });
    };
    const renderDetails = (data) =>{
    return(
        <div className="ShelterEdit">
              <h1>I have a shelter that I can share</h1>
              <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-lg-2">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label for="Name">Name:{data.name}</label>
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
                            <label for="Languages">Languages:{data.languages}</label>
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
                            <label for="ContactInfo">Contact Info:{data.contactInfo}</label>
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
                            <label for="Description">Description:{data.description}</label>
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
                            <label for="Address">Address:{data.address}</label>
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
    )}
    return (
        <section className="RefugeeDetailsEdit">
          { data ?
            renderDetails(data) :
            <p>loading....</p>
          }
        </section>
      )
}

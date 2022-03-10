import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth.context"
import './list.css';

export default function ShelterDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(undefined);
    const { getToken } = useContext(AuthContext);
    const storedToken = getToken();

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/shelter/` + id, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setDetails(response.data);
            })
            .catch()
    }, [id]);

    const renderDetails = (details) => {
        return (
            <div className="ShelterDetail">
                <div className="container d-flex justify-content-between">
                    
                    <div className="col-md-6 rounded border border-warning mapped">
                        <div className="form-group">
                            <h1 className="Name">Name: <br></br>{details.name}</h1>

                        </div>
                        <br></br>
                        <div className="form-group">
                            <h4 className="Languages">Languages:<br></br> {details.languages}</h4>

                        </div>
                        <br></br>
                        <div className="form-group">
                            <p className="ContactInfo">ContactInfo:<br></br> {details.contactInfo}</p>

                        </div>
                        <br></br>
                        <div className="form-group">
                            <p className="Description">Description: <br></br>{details.description}</p>

                        </div>
                        <br></br>
                        <div className="form-group">
                            <p className="Address">Address:<br></br> {details.address}</p>

                        </div>
                        <br></br>
                        <div className="col-6">
                        </div>
                        
                    </div>
                    <div className="col-md-6 rounded border border-warning mt-1 mb-1"><img className="img-fluid" src="/images/openDoor.jpg" alt=""/></div>
                </div>
            </div>
        )
    }
    return (
        <section className="ShelterDetails">
        <br></br>
            {details ?
                renderDetails(details) :
                <p>loading....</p>
            }
        </section>
    )
}
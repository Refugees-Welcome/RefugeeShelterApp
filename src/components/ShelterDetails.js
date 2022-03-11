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
                            <h1 className="Name text-start">Name: <br></br></h1>
                            <h1 className="text-start mb-4">{details.name}</h1>

                        </div>
                        <br></br>
                        <div className="form-group ">
                            <h4 className="Languages text-start">Languages:<br></br> </h4>
<h4 className="text-start mb-4">{details.languages}</h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <h4 className="ContactInfo text-start">ContactInfo:<br></br> </h4>
<h4 className="text-start mb-4">{details.contactInfo}</h4>
                        </div>
                        <br></br>
                        <div className="form-group ">
                            <h4 className="Description text-start">Description: <br></br></h4>
<h4 className="text-start mb-4">{details.description}</h4>
                        </div>
                        <br></br>
                        <div className="form-group ">
                            <h4 className="Address text-start">Address:<br></br></h4>
<h4 className="text-start mb-4">{details.address}</h4>
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
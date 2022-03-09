import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth.context"

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
                <div className="container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">
                        <div className="form-group">
                            <h4 className="Name">Name:{details.name}</h4>

                        </div>

                        <div className="form-group">
                            <h4 className="Languages">Languages:{details.languages}</h4>

                        </div>

                        <div className="form-group">
                            <h4 className="ContactInfo">ContactInfo:{details.contactInfo}</h4>

                        </div>

                        <div className="form-group">
                            <h4 className="Description">Description:{details.description}</h4>

                        </div>

                        <div className="form-group">
                            <h4 className="Address">Address:{details.address}</h4>

                        </div>

                        <div className="col-lg-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section className="ShelterDetails">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            {details ?
                renderDetails(details) :
                <p>loading....</p>
            }
        </section>
    )
}
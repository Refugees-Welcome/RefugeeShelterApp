import { Link } from "react-router-dom"
import './map.css';
import { useState, useRef, useEffect } from "react";
import GoogleMap from './maps';
import './list.css';

export default function ShelterList(props) {

    var ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(function () {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    const render = (status) => {
        return <h1>{status}</h1>;
    };

    return (
        <div className="shelterList">
        <br></br>
            <h1>Refugees Welcome</h1>
            <GoogleMap
                onLoad={map => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                }}
                onUnmount={map => {
                    // do your stuff before map is unmounted
                }}
            />
            <h1>Available Shelters</h1>

            {/* <div className="row">
            { props.shelters.map( shelter => {
                return ( <div className="col-4" key={shelter._id}><h2>{shelter.name}</h2>
                <h4>Languages: {shelter.languages}</h4>
                <h4>Address: {shelter.address}</h4>
                <Link key={shelter._id} to={`/shelter/${shelter._id}`}>more Details</Link></div>
                )
            }
            )}
</div> */}
            <div className="container">
                <div className="row d-flex justify-content-center" >

                    {props.shelters.map(shelter => {
                        return (
                            <div className=" col-sm-3 rounded border border-warning  shelter-summary mapped" key={shelter._id}>
                                <h2>{shelter.name}</h2>
                                <h4>Languages: {shelter.languages}</h4>
                                <h4>Address: {shelter.address}</h4>
                                <Link className="listLink" key={shelter._id} to={`/shelter/${shelter._id}`}><div className="d-grid gap-2 "><button className="btn btn-warning  listButton">get Details</button></div></Link>
                            </div>
                        )
                    }

                    )}
                </div>
                
            </div>
            
        </div>
    )
}
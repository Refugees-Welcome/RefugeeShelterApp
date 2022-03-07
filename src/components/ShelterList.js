import { Link } from "react-router-dom"
import './map.css';
import { useState, useRef, useEffect } from "react";
import GoogleMap from './maps';

export default function ShelterList(props){

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
            <h1>Available Shelters</h1>
            <GoogleMap
                onLoad={map => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                }}
                onUnmount={map => {
                    // do your stuff before map is unmounted
                }}
            />

            { props.shelters.map( shelter => {
                return (
                    <>
                    <div className="shelter-summary" key={shelter._id}>
                        <h2>{shelter.name}</h2>
                        <h4>Languages: {shelter.languages}</h4>
                        <h4>Address: {shelter.address}</h4>
                        <Link to={`/shelter/${shelter._id}`}>more Details</Link>
                        <br></br>
                    </div>
                    
                </>)
            }

            )}
            </div>
            )
    }
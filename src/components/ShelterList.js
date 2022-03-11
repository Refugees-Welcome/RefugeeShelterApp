import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from "axios";
import './list.css';

export default function ShelterList(props) {
    console.log(props.shelters)
    const render = (status) => {
        return <h1>{status}</h1>;
    };

    const [address, setAddress] = useState("");

    // useEffect(() => {

    // }, []);

    const position = [53.551086, 9.993682]

    var mapOptions = {
        center: [17.385044, 78.486671],
        zoom: 15
     }

    var i=0;

    return (
        <>
        <div className="shelterList">
          <h1>Available Shelters</h1>

          <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: 600, width: 2500 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <h1>Available Shelters</h1>

            {  props.shelters && 
                props.shelters.map( shelter => {
                    if (shelter.location.coordinates.length < 1)
                    {
                        shelter.location.coordinates = [53.551086, 9.993682]
                    }
                    console.log(shelter.location.coordinates)
                    console.log("created marker" + i++)

                return (
                    <>
                    <Marker position={shelter.location.coordinates}>
                        <Popup>
                            <b>{shelter.name}</b><br></br>
                            {shelter.description}<br></br>
                            {shelter.languages}<br></br>
                            {shelter.contactInfo}<br></br>
                            {shelter.address}
                        </Popup>
                    </Marker>
                    </>
                )
            }
            )}
            </MapContainer>

            <div className="row d-flex justify-content-center">

            {  props.shelters && 
                props.shelters.map(shelter => {
                return (
                <div className="col-sm-3 rounded border border-warning mapped" key={shelter._id}>
                    <h2>Name: {shelter.name}</h2>
                    <br></br>
                    <h4>Languages: {shelter.languages}</h4>
                    <br></br>
                    <h4>Address: {shelter.address}</h4>
                    <br></br>
                </div>
                );
                })
            }

            </div>

            </div>
            </>
        )
    }

    // <div className="shelter-summary" key={shelter._id}>
    // <h2>{shelter.name}</h2>
    // <h4>Languages: {shelter.languages}</h4>
    // <h4>Address: {shelter.address}</h4>
    // <Link key={shelter._id} to={`/shelter/${shelter._id}`}>more Details</Link>
    // <br></br>
    // </div>
import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from "axios";
import './list.css';
import './map.css';
import './ShelterList.css';
import { Card, Button } from "react-bootstrap";
export default function ShelterList(props) {
    console.log(props.shelters)
    const render = (status) => {
        return <h1>{status}</h1>;
    };

    const position = [53.551086, 9.993682]

    var mapOptions = {
        center: [17.385044, 78.486671],
        zoom: 15
     }

    var i=0;

    return (
        <>
        
        <h1 className="m-4">Available Shelters</h1><div className="mapShelter">
          <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: 600, width: "70vw" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            

            {  props.shelters && 
                props.shelters.map( shelter => {
                    if (shelter.location.coordinates.length < 1)
                    {
                        shelter.location.coordinates = [53.551086, 9.993682]
                    }

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
</div>
            <div className="row d-flex justify-content-center">

            {props.shelters.map(shelter => {
                        return (

                            <Card style={{ width: '18rem', margin: "5px" }}>
                                <Card.Body >
                                    {/* <div className=" col-sm-3 rounded border border-warning  shelter-summary mapped" key={shelter._id}> */}
                                    <Card.Title ><h2>{shelter.name}</h2></Card.Title>
                                    <Card.Text>
                                        <h4>Languages: {shelter.languages}</h4>
                                        <h4>Address: {shelter.address}</h4>

                                        <Link className="listLink" key={shelter._id} to={`/shelter/${shelter._id}`}><Button className="btn btn-warning">get Details</Button></Link>
                                    </Card.Text>
                                    {/* </div> */}
                                </Card.Body>
                            </Card>
                        )
                    }

                    )}

            

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

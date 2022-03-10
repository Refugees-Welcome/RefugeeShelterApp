import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function ShelterList(props){

    const render = (status) => {
        return <h1>{status}</h1>;
    };

    const position = [53.551086, 9.993682]

    return (
        <>
        <div className="shelterList">
          <h1>Available Shelters</h1>

          <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: 600, width: 2500 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                props.shelters.map( shelter => {
                return (
                    <>
                    <Marker position={[17.385044, 78.486671]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    </>
                )
            }
            )}

            </MapContainer>
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
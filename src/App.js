import { useContext, useEffect, useState } from "react"
import './App.css';
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from 'react-router';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import ShelterList from './components/ShelterList';
import ShelterCreate from './components/ShelterCreate';
import RefugeesPage from './components/RefugeesPage';
import Navbar from "./components/Navbar.js";

function App() {

  // useEffect( () => {
  //   fetchShelter();
  // }, [isLoggedIn]);

  // const fetchShelter = () => {

  //   const storedToken = getToken();

  //   axios.get(
  //       `${process.env.REACT_APP_API_URL}/projects`,
  //       { headers: { Authorization: `Bearer ${storedToken}` } }
  //     )
  //     .then(response => {
  //       setProjectsArr(response.data);
  //     })
  //     .catch(e => console.log("error getting list of projects...", e));
  // }
  return (
    <div className="App">

     <Navbar />

     <Routes>
        <Route path="/" element={ <ShelterList /> } />

        __
        <Route path="/refugees" element={
          <IsPrivate>
            <RefugeesPage  />
          </IsPrivate>
        } /> 
        
        <Route path="/signup" element={ 
          <IsAnon>
            <SignupPage />
          </IsAnon>  
        } />

        <Route path="/login" element={ 
          <IsAnon>
            <LoginPage />
          </IsAnon> 
        } />

      </Routes>
    </div>
  );
}

export default App;

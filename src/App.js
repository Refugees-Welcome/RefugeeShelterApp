import { useContext, useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from 'react-router';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import ShelterList from './components/ShelterList';
import ShelterCreate from './components/ShelterCreate';
import RefugeesPage from './components/RefugeesPage';
import { AuthContext } from "./context/auth.context"
import Navbar from "./components/Navbar.js";
import RefugeeCreate from './components/RefugeeCreate'
import UserProfile from "./components/UserProfile";

function App() {
  const [shelterArr, setShelterArr] = useState([]);
  const [refugeesArr, setRefugeesArr] = useState([]);
  const { isLoggedIn, getToken } = useContext(AuthContext);

  useEffect( () => {
    axios.get(
        `${process.env.REACT_APP_API_URL}/shelter`,
      )
      .then(response => {
        setShelterArr(response.data);
      })
      .catch(e => console.log("error getting list of shelter...", e));
  }, []);
  useEffect( () => {
    fetchShelter();
  }, [isLoggedIn]);

  useEffect( () => {
    fetchRefugee();
  }, [isLoggedIn]);

  const fetchShelter = () => {

    const storedToken = getToken();

    axios.get(
        `${process.env.REACT_APP_API_URL}/shelter`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        setShelterArr(response.data);
      })
      .catch(e => console.log("error getting list of projects...", e));
  }

  const fetchRefugee = () => {

    const storedToken = getToken();

    axios.get(
        `${process.env.REACT_APP_API_URL}/refugee`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        setRefugeesArr(response.data);
      })
      .catch(e => console.log("error getting list of projects...", e));
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ 
            <ShelterList shelters={shelterArr}/> 
        } />

      <Route path="/shelter/new" element={
          <IsPrivate>
            <ShelterCreate updateShelter={fetchShelter} />
          </IsPrivate>
        } /> 

        <Route path="/refugee" element={
          <IsPrivate>
            <RefugeesPage  refugees={refugeesArr}/>
          </IsPrivate>
        } /> 
        <Route path="/refugee/new" element={
          <IsPrivate>
            <RefugeeCreate  updateRefugee={fetchRefugee}/>
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
        <Route path="/profile" element={ 
          <IsPrivate>
            <UserProfile />
          </IsPrivate> 
        } />


      </Routes>
    </div>
  );
}

export default App;

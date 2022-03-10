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
import ShelterEdit from './components/ShelterEdit';
import RefugeesPage from './components/RefugeesPage';
import { AuthContext } from "./context/auth.context"
import Navigation from "./components/Navigation.js";
import RefugeeCreate from './components/RefugeeCreate'
import UserProfile from "./components/UserProfile";
import ShelterDetails from "./components/ShelterDetails";
import RefugeeDetails from "./components/RefugeeDetails";
import RefugeeEdit from "./components/RefugeeEdit";

function App() {
  const [shelterArr, setShelterArr] = useState([]);
  const [refugeesArr, setRefugeesArr] = useState([]);
  const { isLoggedIn, getToken } = useContext(AuthContext);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/shelter`,
    )
      .then(response => {
        setShelterArr(response.data);
      })
      .catch(e => console.log("error getting list of shelter...", e));
       }, []);

  useEffect(() => {
    fetchShelter();
  }, [isLoggedIn]);

  useEffect(() => {
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
      <Navigation />
      <Routes>
        <Route path="/" element={
          <ShelterList shelters={shelterArr} />
        } />

        <Route path="/shelter/new" element={
          <IsPrivate>
            <ShelterCreate updateShelter={fetchShelter} />
          </IsPrivate>
        } />

        <Route path="/shelter/:id" element={
          <IsPrivate>
            <ShelterDetails />
          </IsPrivate>
        } />

        <Route path="/shelterEdit/:id" element={
          <IsPrivate>
            <ShelterEdit shelter={shelterArr} updateShelter={fetchShelter} />
          </IsPrivate>
        } />
        <Route path="/refugeeEdit/:id" element={
          <IsPrivate>
            <RefugeeEdit refugee={refugeesArr} updateRefugee={fetchShelter} />
          </IsPrivate>
        } />

        <Route path="/refugee" element={
          <IsPrivate>
            <RefugeesPage refugees={refugeesArr} />
          </IsPrivate>
        } />
        <Route path="/refugees/:id" element={
          <IsPrivate>
            <RefugeeDetails />
          </IsPrivate>
        } />
        <Route path="/refugee/new" element={
          <IsPrivate>
            <RefugeeCreate updateRefugee={fetchRefugee} />
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
            <UserProfile  refugee={refugeesArr} shelter={shelterArr}/>
          </IsPrivate>
        } />
      </Routes>
    </div>
  );
}

export default App;

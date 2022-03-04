import { useContext, useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from 'react-router';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import ShelterList from './components/ShelterList';
import RefugeesPage from './components/RefugeesPage';
import { AuthContext } from "./context/auth.context"

function App() {
  const [shelterArr, setShelterArr] = useState([]);
  const { isLoggedIn, getToken } = useContext(AuthContext);

 

    axios.get(
        `${process.env.REACT_APP_API_URL}/shelter`,
      )
      .then(response => {
        console.log(response)
        setShelterArr(response.data);
      })
      .catch(e => console.log("error getting list of shelter...", e));

  //  useEffect( () => {
  //   fetchRefugee();
  // }, []);

  // const fetchRefugee = () => {

  // useEffect( () => {
  //   fetchRefugee();
  // }, [isLoggedIn]);

  // const fetchRefugee = () => {

  //   const storedToken = getToken();

  //   axios.get(
  //       `${process.env.REACT_APP_API_URL}/refugee`,
  //       { headers: { Authorization: `Bearer ${storedToken}` } }
  //     )
  //     .then(response => {
  //       setProjectsArr(response.data);
  //     })
  //     .catch(e => console.log("error getting list of projects...", e));
  // }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ 
        <ShelterList shelters={shelterArr}/> 
        } />

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

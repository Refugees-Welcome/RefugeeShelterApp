import { Link } from "react-router-dom"
import './list.css';

export default function RefugeesPage(props) {

  return (
    <div className="container">
      <div className="RefugeesPage">
        <br></br>
        <h1> Searching Refugees</h1>
        <br></br>
        <div className="RefugeesList row d-flex justify-content-center">
          {props.refugees.map(refugee => {
            return (
              <div className="col-sm-3 rounded border border-warning refugees-summary mapped" key={refugee._id}>
                <h2>Name: {refugee.name}</h2>
                <br></br>
                <h4>Languages: {refugee.languages}</h4>
                <br></br>
                <h4>currently in: {refugee.currentlyBasedIn}</h4>
                <Link className="listLink" to={`/refugees/${refugee._id}`}><div className="d-grid gap-2"><button className="btn btn-warning listButton">get Details</button></div></Link>
                <br></br>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  )
}

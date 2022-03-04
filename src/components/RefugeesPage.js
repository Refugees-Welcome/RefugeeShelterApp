import { Link } from "react-router-dom"


export default function RefugeesPage(props) {

  return (
    <div className="RefugeesPage">
      <h1> Searching Refugees</h1>

      { props.refugees.map( refugee => {
          return (
            <div className="refugees-summary" key={refugee._id}>
                    <h2>Name: {refugee.name}</h2>
                    <h4>Languages: {refugee.languages}</h4>
                    <h4>currently in: {refugee.currentlyBasedIn}</h4>
              <Link to={`/refugees/${refugee._id}`}>more Details</Link>
              <br></br>
            </div>
          );
        })
      }
    </div>
  )
}

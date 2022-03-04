import { Link } from "react-router-dom"


export default function RefugeesPage(props) {

  return (
    <div className="RefugeesPage">
      <h1>Life of Brian (this is the project list)</h1>

      { props.refugees.map( refugee => {
          return (
            <div className="refugees-summary" key={refugee._id}>
                    <h2>{refugee.name}</h2>
                    <h4>{refugee.languages}</h4>
                    <h4>{refugee.currentlyBasedIn}</h4>
              <Link to={`/refugees/${refugee._id}`}>more Details</Link>
            </div>
          );
        })
      }
    </div>
  )
}

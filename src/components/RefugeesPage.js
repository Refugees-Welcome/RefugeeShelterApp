import { Link } from "react-router-dom"


export default function RefugeesPage(props) {

  console.log(props.projects)

  return (
    <div className="RefugeesPage">
      <h1>Life of Brian (this is the project list)</h1>

      { props.refugees.map( refugees => {
          return (
            <div className="refugees-summary" key={refugees._id}>
                    <h2>{refugees.name}</h2>
                    <h4>{refugees.languages}</h4>
                    <h4>{refugees.currentlyBasedIn}</h4>
              <Link to={`/refugees/${refugees._id}`}>more Details</Link>
            </div>
          );
        })
      }

    </div>
  )
}

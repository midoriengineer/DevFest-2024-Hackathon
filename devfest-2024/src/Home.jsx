import { Link } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <>

      <Header/>
      <br></br>

  <div className="container">
        <h1 className="title">Welcome to NutriPet</h1>
        <p className="subtitle">
          Adopt a virtual pet, learn sustainable eating habits with NutriPet.
        </p>
        <p className="description">
          Choose a pet from GreenPaws Refuge and track your daily food intake. NutriPet provides feedback on your environmental impact, helping you improve your diet in order to save the planet and its inhabitants by reducing your carbon footprint.
        </p>

        {/* Add a button to navigate to the Shop page */}
        <Link to="/shop">
          <button className="shop-button">Go to GreenPaws Refuge</button>
        </Link>
      </div>
    </>
  );
}

export default Home;

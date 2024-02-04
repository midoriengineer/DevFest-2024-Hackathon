import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to NutriPet</h1>
        <p className="subtitle">
          The webapp that helps you adopt a virtual pet and learn about
          sustainable eating habits.
        </p>
        <p className="description">
          NutriPet is a fun and educational webapp that lets you choose a
          virtual pet from the GreenPaws Sanctuary. You can name your pet, feed
          it, play with it, and watch it grow. You can also enter your daily
          food intake and see how it affects your pet's health and happiness, as
          well as the environment. NutriPet will give you tips and feedback on
          how to improve your diet and reduce your carbon footprint.
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

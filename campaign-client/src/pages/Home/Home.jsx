import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="hero min-h-screen text-white"
      style={{
        backgroundImage: "url(https://i.ibb.co/NWxnrK9/campaign.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Start a Campaign</h1>
          <p className="mb-5">
            Empower Dreams, Transform Futures: Join the ChangeMakers Initiative
            and Be the Catalyst for Positive Global Change!
          </p>
          <Link
            to="/my-campaign"
            className="btn btn-outline btn-wide normal-case text-lg text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

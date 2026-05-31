import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import predictionService from "../services/predictionService";
import userService from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const logoutHandler = () => {
    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (!userInfo) return;

    userService.getProfile(userInfo.token).then(setUser).catch(console.error);

    predictionService
      .getPredictions(userInfo.token)
      .then(setPredictions)
      .catch(console.error);
  }, []);

  if (!user) {
    return <h2>User Not Found</h2>;
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-2xl">{user.name[0].toUpperCase()}</span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className="opacity-70">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Link to="/predict" className="btn btn-primary btn-lg">
          🍽️ Predict Food
        </Link>

        <button onClick={logoutHandler} className="btn btn-error btn-lg">
          Logout
        </button>
      </div>

      <div className="card bg-base-200 mt-6 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Prediction History</h2>

          {predictions.length === 0 ? (
            <p>No predictions yet</p>
          ) : (
            predictions.map((item) => (
              <div
                key={item._id}
                className="
       flex
       justify-between
       border-b
       py-2"
              >
                <span>{item.prediction}</span>

                <span>{item.confidence}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

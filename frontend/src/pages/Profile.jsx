import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import predictionService from "../services/predictionService";
import userService from "../services/userService";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const logoutHandler = () => {
    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (!userInfo) return;

    userService.getProfile(userInfo.token).then(setUser).catch(console.error);

    predictionService
      .getAnalytics(userInfo.token)
      .then(setAnalytics)
      .catch(console.error);

    predictionService
      .getPredictions(userInfo.token)
      .then(setPredictions)
      .catch(console.error);
  }, []);
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {predictions.map((item) => (
          <div
            key={item._id}
            className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* IMAGE SECTION */}
            {item.imageUrl ? (
              <figure>
                <img
                  src={item.imageUrl}
                  alt="food"
                  className="h-40 w-full object-cover"
                />
              </figure>
            ) : (
              <div className="h-40 flex items-center justify-center bg-base-300">
                <span className="text-sm opacity-60">No image</span>
              </div>
            )}

            {/* CONTENT */}
            <div className="card-body p-4">
              <h2 className="text-xl font-bold capitalize">
                {item.prediction?.replace("_", " ")}
              </h2>

              <p className="text-primary font-semibold">{item.confidence}%</p>

              <p className="text-xs opacity-60">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <div className="card-actions justify-end mt-2">
                <button
                  onClick={async () => {
                    const user = JSON.parse(localStorage.getItem("user"));

                    await predictionService.deletePrediction(
                      item._id,
                      user.token,
                    );

                    setPredictions(
                      predictions.filter((p) => p._id !== item._id),
                    );

                    toast.success("Deleted");
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

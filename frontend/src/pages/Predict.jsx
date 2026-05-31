import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import predictionService from "../services/predictionService";
import toast from "react-hot-toast";
function Predict() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) return;

    try {
      setLoading(true);

      // 1. Upload image
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
      );

      const imageUrl = uploadRes.data.imageUrl;

      // 2. Send to FastAPI
      const predictRes = await axios.post(
        "http://localhost:8000/predict",
        formData,
      );

      setResult(predictRes.data);

      // 3. Save to MongoDB
      const user = JSON.parse(localStorage.getItem("user"));

      await predictionService.savePrediction(
        {
          prediction: predictRes.data.prediction,
          confidence: predictRes.data.confidence,
          imageUrl: imageUrl,
        },
        user.token,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-4xl p-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl">🍽️ Nepali Food AI</h1>

            <p className="opacity-70">
              Upload an image and identify Nepali foods.
            </p>

            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setImage(file);

                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="rounded-xl max-h-80 shadow-lg"
                  />
                </div>
              )}

              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Predicting..." : "Predict Food"}
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="mt-8">
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Top Prediction</div>

                <div className="stat-value text-primary">
                  {result.prediction}
                </div>

                <div className="stat-desc">{result.confidence}% confidence</div>
              </div>
            </div>

            <div className="card bg-base-200 mt-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Top Predictions</h2>

                {result.top_predictions.map((item, index) => {
                  const confidence = parseFloat(
                    item.confidence || item.Confidance,
                  );

                  return (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">
                          {item.class.replace("_", " ")}
                        </span>

                        <span>{confidence}%</span>
                      </div>

                      <progress
                        className="progress progress-primary w-full"
                        value={confidence}
                        max="100"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;

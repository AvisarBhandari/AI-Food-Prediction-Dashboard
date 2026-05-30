import { Link } from "react-router-dom";

function Home() {
  const classes = [
    "momo",
    "dal_bhat",
    "sel_roti",
    "chowmein",
    "thukpa",
    "chatamari",
    "yomari",
  ];

  return (
    <div className="container mx-auto px-6 py-10 space-y-12">
      {/* HERO SECTION */}
      <div className="hero bg-base-200 rounded-2xl shadow-lg">
        <div className="hero-content text-center py-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">🍽️ Nepali Food AI</h1>

            <p className="py-6 text-lg opacity-80">
              Upload an image of Nepali food and our AI model will classify it
              into one of the supported dishes.
            </p>

            <Link to="/predict" className="btn btn-primary btn-lg">
              Try Prediction
            </Link>
          </div>
        </div>
      </div>

      {/* SUPPORTED CLASSES */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Supported Food Classes</h2>

        <p className="opacity-70 mb-6">
          The model is trained only on the following Nepali food categories:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {classes.map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-xl transition"
            >
              <div className="card-body p-4 text-center">
                <span className="text-lg font-semibold capitalize">
                  {item.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WARNING / NOTE SECTION */}
      <div className="alert alert-warning shadow-lg">
        <div>
          <span>
            ⚠️ The model is trained ONLY on these classes. Uploading unrelated
            food images may result in incorrect predictions.
          </span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>

          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Upload Image</li>

            <li className="step step-primary">AI Model Processes</li>

            <li className="step step-primary">Get Prediction</li>

            <li className="step">Save History (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

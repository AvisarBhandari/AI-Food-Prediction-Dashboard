import Prediction from "../models/Prediction.js";

export const savePrediction = async (req, res) => {
  try {
    const { prediction, confidence, imageUrl } = req.body;

    const saved = await Prediction.create({
      user: req.user._id,
      prediction,
      confidence,
      imageUrl,
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPrediction = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(predictions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalPredictions = await Prediction.countDocuments({
      user: userId,
    });

    const avgConfidence = await Prediction.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          average: {
            $avg: "$confidence",
          },
        },
      },
    ]);

    const favoriteFood = await Prediction.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$prediction",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    res.json({
      totalPredictions,

      averageConfidence: avgConfidence[0]?.average || 0,

      favoriteFood: favoriteFood[0]?._id || "N/A",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      return res.status(404).json({
        message: "Prediction not found",
      });
    }

    // security check (important)
    if (prediction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await prediction.deleteOne();

    res.json({ message: "Prediction deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
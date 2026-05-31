import Prediction from "../models/Prediction.js";

export const savePrediction = async (req, res) => {
  try {
    const { prediction, confidence } = req.body;

    const saved = await Prediction.create({
      user: req.user._id,
      prediction,
      confidence,
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
    }).sort({
      createdAt: -1,
    });

    res.json(predictions);
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

const res = require("express/lib/response");
const PortFolio = require("../../models/portfolio");

const addPortfolio = async () => {
  try {
  } catch {
    res.status(400).json({ error: "Something went Wrong.." });
  }
};

const updatePortfolio = async () => {
  try {
  } catch {
    res.status(400).json({ error: "Something went Wrong.." });
  }
};

const readPortfolio = async () => {
  try {
  } catch {
    res.status(400).json({ error: "Something went Wrong.." });
  }
};

const deletePortfolio = async () => {
  try {
  } catch {
    res.status(400).json({ error: "Something went Wrong.." });
  }
};

module.exports = {
  addPortfolio,
  updatePortfolio,
  readPortfolio,
  deletePortfolio,
};

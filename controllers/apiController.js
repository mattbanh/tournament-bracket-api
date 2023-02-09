const getAPIInfo = async (req, res) => {
  res.status(200).json({ message: "Welcome to the tournament bracket app" });
};

module.exports = { getAPIInfo };

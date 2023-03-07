const authStatus = async (req, res) => {
  try {
    res.json({ isAuthenticated: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = authStatus;

const logout = async (req, res) => {
  try {
    await res.cookie('accessToken', '', { maxAge: 0 });

    return res.json({ message: 'cookie cleared' });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = logout;

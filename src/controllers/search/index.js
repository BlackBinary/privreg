module.exports.index = (req, res) => {
  const {
    query: {
      text,
      size,
      from,
      quality,
      popularity,
      maintenance,
    },
  } = req;

  return res.status(200)
    .json({
      text,
      size,
      from,
      quality,
      popularity,
      maintenance,
    });
};

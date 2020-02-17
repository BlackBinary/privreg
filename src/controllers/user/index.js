module.exports.whoami = (req, res) => {
  console.log(req);
  return res.status(200).json({});
};

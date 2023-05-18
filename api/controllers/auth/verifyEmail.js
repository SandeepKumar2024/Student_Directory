const verifyEmail = (req, res) => {
  const pattern = /aec\.ac\.in$/;
  const email = req.body.email;
  const domain = email.split("@")[1];
  //test
  const isMatched = pattern.test(domain);

  if (!isMatched) return res.send("Wrong email");

  return res.status(200).send("Email verified");
};

module.exports = verifyEmail;

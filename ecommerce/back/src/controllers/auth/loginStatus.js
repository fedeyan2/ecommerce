export default function loginStatus(req, res) {
  const bool = req.isAuthenticated();
  return res.status(bool ? 200 : 401).json(bool);
}

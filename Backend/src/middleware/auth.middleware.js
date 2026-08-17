import jwt from 'jsonwebtoken'
export const middleware = (req, res, next) => {
  try {

    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
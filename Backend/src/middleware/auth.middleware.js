import jwt from 'jsonwebtoken'
export const middleware = (req, res, next) => {
  try {
    console.log("1. middleware hit");

    const token = req.cookies.accessToken;
    console.log("2. token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("3. decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("4. JWT ERROR:", err.message);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
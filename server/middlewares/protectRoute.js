import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Error in protect route" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error in ProtectRoute:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;


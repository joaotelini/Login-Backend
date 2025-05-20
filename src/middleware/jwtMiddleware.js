import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function jwtMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token format",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Token is required",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Erro ao verificar token:", err);
      return res.status(401).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    req.user = decoded;
    next();
  });
}

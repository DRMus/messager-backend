import jwt from "jsonwebtoken";

export default function verifyJWTToken(token: string | string[]) {
  

  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    if (token && typeof token === "string") {
      jwt.verify(token, process.env.JWT_KEY || "", (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        } else if (typeof decodedToken !== "string") {
          resolve(decodedToken);
        }
      });
    } else {
      return reject("incorrect string format");
    }
  });
}

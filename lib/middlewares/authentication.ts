import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";

export default function authenticate(
  // eslint-disable-next-line no-unused-vars
  handler: (arg0: NextApiRequest, arg1: NextApiResponse<Response>) => any,
) {
  return async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      res.status(401).end();
      return;
    }

    try {
      jwt.verify(
        authorizationHeader.replace("Bearer ", ""),
        process.env.TOKEN_SECRET as Secret,
      );
    } catch {
      res.status(401).end();
      return;
    }

    await handler(req, res);
  };
}

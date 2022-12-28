import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";

type Response = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.status(401).end();
      return;
    }

    const token = jwt.sign(
      { name: username },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: "7d" }
    );
    res.status(200).json({ token });
  }
}

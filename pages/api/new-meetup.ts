// /api/new-meetup
// POST /api/new-meetup

import type { NextApiRequest, NextApiResponse } from "next";
import { writeToCollection } from "@/lib/getMongoClient";

type Data = {
  message: string;
};

async function newMeetupHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
    const result = await writeToCollection("meetup", data);
    res.status(201).json({ message: "Meeting Inserted" });
  }
}

export default newMeetupHandler;

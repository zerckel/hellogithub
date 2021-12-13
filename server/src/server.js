import express from "express";
import {PrismaClient} from "@prisma/client"

const axios = require('axios');

import cors from "cors"

const prisma = new PrismaClient()


export function launch(port) {
  const application = express();
  application.use(cors())

  application.get("/api/users/:username", cors({origin: false}), async (request, response) => {

    const username = request.params.username

    const user = await prisma.user.findFirst({
      where: {
        login: {
          contains: username,
          mode: 'insensitive'
        }
      }
    })
    if (user === null) {
      console.log('not in db')
      axios.get(`https://api.github.com/users/${username}`)
              .then(async (r) => {
                prisma.user.create({
                  data: {...r.data}
                })
                response.json(r.data)
              })
    } else {
      console.log('in db')
      response.json(user)
    }

  });

  application.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}

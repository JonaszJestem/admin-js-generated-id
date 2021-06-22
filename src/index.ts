import express from "express";
import AdminBro, { ResourceWithOptions } from "admin-bro";
import * as TypeORMAdapter from "@admin-bro/typeorm";
import ExpressAdapter from "@admin-bro/express";

import { createConnection } from "typeorm";
import { TypeORMUser } from "./user.entity";
import KSUID from "ksuid";

AdminBro.registerAdapter(TypeORMAdapter);

const start = async () => {
  const app = express();
  await createConnection();
  const admin = new AdminBro({
    resources: [
      {
        resource: TypeORMUser,
        options: {
          actions: {
            new: {
              before: async (request) => {
                const userId = await KSUID.random();

                request.payload!.userId = userId.string;

                return request;
              },
            },
          },
        },
      } as ResourceWithOptions,
    ],
  });

  app.use("/admin", await ExpressAdapter.buildRouter(admin));
  app.listen(3000, () => console.log("Started on port 3000"));
};
start();

import express from "express";
import { celebrate, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsControllers";
import ItemsControllers from "./controllers/ItemsControllers";

const routes = express.Router();
const uploads = multer(multerConfig);

const pointsController = new PointsController();
const itemsControllers = new ItemsControllers();

routes.get("/items", itemsControllers.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
  "/points",
  uploads.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      items: Joi.string().required(),
    }),
  }),
  pointsController.create
);

export default routes;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _multer = _interopRequireDefault(require("multer"));

var _multer2 = _interopRequireDefault(require("./config/multer"));

var _PointsControllers = _interopRequireDefault(require("./controllers/PointsControllers"));

var _ItemsControllers = _interopRequireDefault(require("./controllers/ItemsControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express.default.Router();

const uploads = (0, _multer.default)(_multer2.default);
const pointsController = new _PointsControllers.default();
const itemsControllers = new _ItemsControllers.default();
routes.get("/items", itemsControllers.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post("/points", uploads.single("image"), (0, _celebrate.celebrate)({
  body: _celebrate.Joi.object().keys({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required().email(),
    whatsapp: _celebrate.Joi.string().required(),
    city: _celebrate.Joi.string().required(),
    uf: _celebrate.Joi.string().required().length(2),
    latitude: _celebrate.Joi.number().required(),
    longitude: _celebrate.Joi.number().required(),
    items: _celebrate.Joi.string().required()
  })
}), pointsController.create);
var _default = routes;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PointsController {
  async index(req, res) {
    const {
      city,
      uf,
      items
    } = req.query;
    const parsedItems = String(items).split(",").map(item => Number(item.trim()));
    const points = await (0, _connection.default)("points").join("point_items", "points.id", "=", "point_items.point_id").whereIn("point_items.item_id", parsedItems).where("city", String(city)).where("uf", String(uf)).distinct().select("points.*");
    const serializedPoints = points.map(item => {
      return { ...points,
        image_url: `${process.env.APP_API_URL}/uploads/image-points/${item.image}`
      };
    });
    return res.json(serializedPoints);
  }

  async show(req, res) {
    const {
      id
    } = req.params;
    const point = await (0, _connection.default)("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({
        message: "Point not found."
      });
    }

    const serializedPoint = { ...point,
      image_url: `${process.env.APP_API_URL}/uploads/image-points/${point.image}`
    };
    const items = await (0, _connection.default)("items").join("point_items", "items.id", "=", "point_items.item_id").where("point_items.point_id", id);
    return res.json({
      point: serializedPoint,
      items
    });
  }

  async create(req, res) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;
    const trx = await _connection.default.transaction();
    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
    const inserts = await trx("points").insert(point);
    const point_id = inserts[0];
    const pointItems = items.split(",").map(item => Number(item.trim())).map(item_id => {
      return {
        item_id,
        point_id
      };
    });
    await trx("point_items").insert(pointItems);
    trx.commit();
    return res.json({
      id: point_id,
      ...point
    });
  }

}

var _default = PointsController;
exports.default = _default;
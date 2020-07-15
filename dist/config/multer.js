"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  storage: _multer.default.diskStorage({
    destination: _path.default.resolve(__dirname, '..', '..', 'uploads', 'image-points'),

    filename(req, file, callback) {
      const hash = _crypto.default.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;
      callback(null, fileName);
    }

  }),
  limits: {
    fileSize: 1 * 1000 * 1000
  }
};
exports.default = _default;
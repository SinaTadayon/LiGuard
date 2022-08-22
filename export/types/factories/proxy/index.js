"use strict";
const __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
const __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o.default = v;
      });
const __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null)
      for (const k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy__factory =
  exports.IProxy__factory =
  exports.IBaseProxy__factory =
  exports.BaseUUPSProxy__factory =
  exports.BaseProxy__factory =
  exports.ierc1822Sol =
    void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
exports.ierc1822Sol = __importStar(require("./IERC1822.sol"));
var BaseProxy__factory_1 = require("./BaseProxy__factory");
Object.defineProperty(exports, "BaseProxy__factory", { enumerable: true, get: function () { return BaseProxy__factory_1.BaseProxy__factory; } });
var BaseUUPSProxy__factory_1 = require("./BaseUUPSProxy__factory");
Object.defineProperty(exports, "BaseUUPSProxy__factory", { enumerable: true, get: function () { return BaseUUPSProxy__factory_1.BaseUUPSProxy__factory; } });
var IBaseProxy__factory_1 = require("./IBaseProxy__factory");
Object.defineProperty(exports, "IBaseProxy__factory", { enumerable: true, get: function () { return IBaseProxy__factory_1.IBaseProxy__factory; } });
var IProxy__factory_1 = require("./IProxy__factory");
Object.defineProperty(exports, "IProxy__factory", { enumerable: true, get: function () { return IProxy__factory_1.IProxy__factory; } });
var Proxy__factory_1 = require("./Proxy__factory");
Object.defineProperty(exports, "Proxy__factory", { enumerable: true, get: function () { return Proxy__factory_1.Proxy__factory; } });
//# sourceMappingURL=index.js.map
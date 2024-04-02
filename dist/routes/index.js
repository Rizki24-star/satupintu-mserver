"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationRoutes_1 = __importDefault(require("./authenticationRoutes"));
const attributeRetribusiRoutes_1 = __importDefault(require("./attributeRetribusiRoutes"));
const tagihanRoutes_1 = __importDefault(require("./tagihanRoutes"));
const dokuPaymentRoutes_1 = __importDefault(require("./dokuPaymentRoutes"));
const authValidationMiddleware_1 = __importDefault(require("../middleware/authValidationMiddleware"));
const router = express_1.default.Router();
router.use("/auth", authenticationRoutes_1.default);
router.use("/item-retribusi", authValidationMiddleware_1.default, attributeRetribusiRoutes_1.default);
router.use("/tagihan", authValidationMiddleware_1.default, tagihanRoutes_1.default);
router.use("/payment", authValidationMiddleware_1.default, dokuPaymentRoutes_1.default);
exports.default = router;

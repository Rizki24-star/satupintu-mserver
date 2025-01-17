"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const dokuPaymentsControllerts_1 = require("../controllers/dokuPaymentsControllerts");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.use(body_parser_1.default.json());
router.post("/virtual-account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // res.status(200).json({ data: req.body.payment_order });
        const data = yield (0, dokuPaymentsControllerts_1.getVirtualAccount)(req.body.request_id, req.body.payment_order, req.body.bank);
        console.log({ reoutes: data });
        res.status(200).json({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}));
exports.default = router;

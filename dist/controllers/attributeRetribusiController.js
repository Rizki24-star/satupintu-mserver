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
exports.getWajibRetribusi = exports.createItemRetribusi = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const atributeRetribusi_1 = __importDefault(require("../mongo/models/atributeRetribusi"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getWajibRetribusi = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.wajibRetribusi.findMany();
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getWajibRetribusi = getWajibRetribusi;
const createItemRetribusi = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data_khusus_retribusi, kategori_nama, jenis_tagihan, harga } = req;
        const data = new atributeRetribusi_1.default({
            id: new mongoose_1.default.Types.ObjectId(),
            data_khusus_retribusi,
            kategori_nama,
            jenis_tagihan,
            harga,
        });
        return data
            .save()
            .then(() => {
            return {
                message: "Item Retribusi Created Succeessfully",
                itemRetribusi: data,
            };
        })
            .catch((error) => error);
    }
    catch (error) {
        throw error;
    }
});
exports.createItemRetribusi = createItemRetribusi;
const readItemRetribusi = (req, res, next) => { };
const updateItemRetribusi = (req, res, next) => { };
const deleteItemRetribusi = (req, res, next) => { };

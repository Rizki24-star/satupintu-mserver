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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            include: {
                kontrak: {
                    include: {
                        wajib_retribusi: {
                            include: {
                                users: true,
                            },
                        },
                    },
                },
            },
        });
        const tagihanData = data.map((tagihan) => {
            return {
                id: tagihan.id,
                kontrak_id: tagihan.kontrak_id,
                nama: tagihan.nama,
                total_harga: tagihan.total_harga,
                status: tagihan.status,
                name: tagihan.kontrak.wajib_retribusi.users.name,
                email: tagihan.kontrak.wajib_retribusi.users.email,
            };
        });
        return tagihanData;
    }
    catch (error) {
        throw error;
    }
});
exports.get = get;
const readItemRetribusi = (req, res, next) => { };
const updateItemRetribusi = (req, res, next) => { };
const deleteItemRetribusi = (req, res, next) => { };

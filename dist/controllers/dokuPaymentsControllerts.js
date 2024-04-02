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
exports.getVirtualAccount = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
function formatISO8601(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
// Get the current UTC timestamp in "yyyy-MM-ddTh:m:sZ" format
function getFormattedUTCISO8601Timestamp() {
    const now = new Date();
    return formatISO8601(now);
}
// Adjust the timestamp for UTC+7 (WIB)
function adjustTimestampForWIB(timestamp) {
    const originalDate = new Date(timestamp);
    const adjustedDate = new Date(originalDate.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours in milliseconds
    return formatISO8601(adjustedDate);
}
// Example usage
const formattedUtcTimestamp = getFormattedUTCISO8601Timestamp();
const formattedWibTimestamp = adjustTimestampForWIB(formattedUtcTimestamp);
function generateDigest(jsonBody) {
    let jsonStringHash256 = crypto_1.default
        .createHash("sha256")
        .update(jsonBody, "utf-8")
        .digest();
    let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString("base64");
}
function generateSignature(clientId, requestId, requestTimestamp, requestTarget, digest, secret) {
    // Prepare Signature Component
    console.log("----- Component Signature -----");
    let componentSignature = "Client-Id:" + clientId;
    componentSignature += "\n";
    componentSignature += "Request-Id:" + requestId;
    componentSignature += "\n";
    componentSignature += "Request-Timestamp:" + requestTimestamp;
    componentSignature += "\n";
    componentSignature += "Request-Target:" + requestTarget;
    // If body not send when access API with HTTP method GET/DELETE
    if (digest) {
        componentSignature += "\n";
        componentSignature += "Digest:" + digest;
    }
    console.log(componentSignature.toString());
    console.log();
    // Calculate HMAC-SHA256 base64 from all the components above
    let hmac256Value = crypto_1.default
        .createHmac("sha256", secret)
        .update(componentSignature.toString())
        .digest();
    let bufferFromHmac256Value = Buffer.from(hmac256Value);
    let signature = bufferFromHmac256Value.toString("base64");
    // Prepend encoded result with algorithm info HMACSHA256=
    return "HMACSHA256=" + signature;
}
const getVirtualAccount = (request_id, req, bank) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = process.env.DOKU_VA_BASE_URL;
        const clientId = process.env.DOKU_CLIENT_ID;
        const requestId = request_id;
        const requestTimestamp = formattedUtcTimestamp;
        const requestTarget = "/" + bank + "-virtual-account/v2/payment-code";
        const secret = process.env.DOKU_SECRET_KEY;
        const body = req;
        const digest = generateDigest(JSON.stringify(body));
        const headers = {
            "Content-Type": "application/json",
            "Client-Id": clientId,
            "Request-Id": requestId,
            "Request-Timestamp": requestTimestamp,
            Signature: generateSignature(clientId, requestId, requestTimestamp, requestTarget, digest, secret),
        };
        const data = yield axios_1.default.post(apiUrl, body, { headers });
        if (data.status != 200) {
            throw data.data;
            // throw "Permintaan anda tidak dapat ditanggapi, silahkan coba lagi nanti";
        }
        return data.data;
    }
    catch (error) {
        console.log({ error: error });
        throw error;
        // throw "Permintaan anda tidak dapat ditanggapi, silahkan coba lagi nanti";
    }
});
exports.getVirtualAccount = getVirtualAccount;

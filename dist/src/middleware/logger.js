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
exports.logger = void 0;
const moment_1 = __importDefault(require("moment"));
function logger(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const logTime = (0, moment_1.default)();
        console.log(`API LOG at ${logTime} - status code[${res.statusCode}] - method [${req.method}] - url [${req.url}] - path [${req.ip}]`);
        next();
    });
}
exports.logger = logger;
;

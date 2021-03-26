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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var middlewere_1 = require("../middle/middlewere");
exports.router = express_1.default.Router();
var bluebird_1 = __importDefault(require("bluebird"));
var events_list = require('../../events_list.json');
var fs = bluebird_1.default.promisifyAll(require('fs'));
exports.router.get("/", function (_a, res) {
    var _b = _a.query, _c = _b.offset, offset = _c === void 0 ? 0 : _c, _d = _b.limit, limit = _d === void 0 ? 3 : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var readList, temp;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
                case 1:
                    readList = _e.sent();
                    if (!offset && !limit)
                        return [2 /*return*/, res.status(200).json(readList)];
                    temp = [];
                    readList.forEach(function (element) { return temp.push(element); });
                    if (offset < 0)
                        offset = 0;
                    if (offset > temp.length)
                        offset = (temp.length - 1);
                    return [2 /*return*/, res.status(200).json(temp.slice(Number(offset), Number(offset) + Number(limit)))];
            }
        });
    });
});
exports.router.get('/music', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
            case 1:
                readList = _a.sent();
                events = readList.filter(function (item) { return item.type === "music"; });
                res.json(events);
                return [2 /*return*/];
        }
    });
}); });
exports.router.get('/theatre', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
            case 1:
                readList = _a.sent();
                events = readList.filter(function (item) { return item.type === "theatre"; });
                res.json(events);
                return [2 /*return*/];
        }
    });
}); });
exports.router.get('/sport', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
            case 1:
                readList = _a.sent();
                events = readList.filter(function (item) { return item.type === "sport"; });
                res.json(events);
                return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id', function (_a, res) {
    var id = _a.params.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var readList, event;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
                case 1:
                    readList = _b.sent();
                    event = readList.find(function (item) { return item.id == id; });
                    if (!event)
                        res.status(404).json({ message: "resource not found" });
                    res.json(event);
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.post('', middlewere_1.checkTokenHeader, middlewere_1.eventValidator, middlewere_1.myValidationResult, middlewere_1.checkDate, function (_a, res) {
    var _b = _a.body, name = _b.name, type = _b.type, place = _b.place, dateTime = _b.dateTime, price = _b.price;
    return __awaiter(void 0, void 0, void 0, function () {
        var event;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event = {
                        name: name,
                        id: uuid_1.v4(),
                        type: type,
                        place: place,
                        dateTime: dateTime,
                        price: price
                    };
                    events_list = events_list.concat(event);
                    return [4 /*yield*/, fs.writeFileSync('events_list.json', JSON.stringify(events_list, null, 2))];
                case 1:
                    _c.sent();
                    return [2 /*return*/, res.status(201).json(event)];
            }
        });
    });
});
exports.router.delete('/:eventID', middlewere_1.checkTokenHeader, function (_a, res) {
    var eventID = _a.params.eventID;
    return __awaiter(void 0, void 0, void 0, function () {
        var readUserList, readEventList, toDelete, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, middlewere_1.readFromJson('users_list.json', res)];
                case 1:
                    readUserList = _b.sent();
                    return [4 /*yield*/, middlewere_1.readFromJson('events_list.json', res)];
                case 2:
                    readEventList = _b.sent();
                    toDelete = readEventList.findIndex(function (item) { return item.id == eventID; });
                    if (toDelete == -1)
                        return [2 /*return*/, res.status(404).json({ message: "resource not found" })];
                    readUserList.forEach(function (user) {
                        user.tickets.forEach(function (element) {
                            element.event.dateTime = element.event.id == eventID ? "canceled" : element.event.dateTime;
                        });
                    });
                    readEventList.splice(toDelete, 1);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fs.writeFileSync('users_list.json', JSON.stringify(readUserList, null, 2))];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: err_1 })];
                case 6:
                    middlewere_1.writeOnJson('events_list.json', readEventList, res);
                    return [2 /*return*/];
            }
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscribe_controllers_1 = require("../controllers/subscribe.controllers");
const router = (0, express_1.Router)();
router.post("/", subscribe_controllers_1.subscribeUser);
exports.default = router;

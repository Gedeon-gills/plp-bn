"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controllers_1 = require("../controllers/contact.controllers");
const router = (0, express_1.Router)();
router.post("/", contact_controllers_1.sendContactMessage);
exports.default = router;

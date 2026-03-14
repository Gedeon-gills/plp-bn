"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const subscribe_routes_1 = __importDefault(require("./routes/subscribe.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/contact", contact_routes_1.default);
app.use("/api/subscribe", subscribe_routes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected");
    app.listen(9000, () => console.log("Server running on port 9000"));
});

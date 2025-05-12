"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playerRoutes_1 = __importDefault(require("./routes/playerRoutes"));
const matchRoutes_1 = __importDefault(require("./routes/matchRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json('Established connection!');
});
app.use('/players', playerRoutes_1.default);
app.use('/matches', matchRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

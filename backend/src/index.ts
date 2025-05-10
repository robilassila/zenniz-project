import express, { Request, Response } from 'express';
import playerRoutes from './routes/playerRoutes';
import matchRoutes from './routes/matchRoutes'

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.json('Established connection!');
});

app.use('/players', playerRoutes)
app.use('/matches', matchRoutes)


app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
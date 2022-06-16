import express, {Express, Request, Response} from "express";
import { CreateRouteUseCase } from "../../../application/usecase/create-route.use-case";
import { ListAllRoutesUseCase } from "../../../application/usecase/list-all-routes.use-case copy";
import { RouteInMemoryRepository } from "../../db/route-in-memory.repository";

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const routeRepository = new RouteInMemoryRepository();

app.get('/routes', async (_req: Request, res: Response) => {
  const listAllRoutesUseCase = new ListAllRoutesUseCase(routeRepository);
  const output = await listAllRoutesUseCase.execute();
  res.status(200).json(output);
})

app.post('/routes', async (req: Request, res: Response) => {
  const createUseCase = new CreateRouteUseCase(routeRepository);
  const output = await createUseCase.execute(req.body);
  res.status(201).json(output);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

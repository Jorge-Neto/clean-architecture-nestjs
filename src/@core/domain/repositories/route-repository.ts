import { Route } from "../entities/route.entity";

export interface RouteRepositoryInterface {
    insert(route: Route): Promise<void>;
    findAll(): Promise<Route[]>;
}

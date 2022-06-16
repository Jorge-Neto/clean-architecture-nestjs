import { Route } from "../../domain/entities/route.entity";
import { RouteRepositoryInterface } from "../../domain/repositories/route-repository";

export class RouteInMemoryRepository implements RouteRepositoryInterface {

    items: Route[] = [];
    async insert(route: Route): Promise<void> {
        this.items.push(route);
        return Promise.resolve();
    }

    async findAll(): Promise<Route[]> {
        return this.items;
    }
}

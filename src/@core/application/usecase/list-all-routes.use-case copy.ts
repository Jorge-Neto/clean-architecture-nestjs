import { LatLng } from "../../domain/entities/route.entity";
import { RouteRepositoryInterface } from "../../domain/repositories/route-repository";

type CreateRouteOutput = {
    id: string;
    title: string;
    startPosition: LatLng;
    endPosition: LatLng;
    points?: LatLng[];
}[];

export class ListAllRoutesUseCase {
    constructor(private routeRepository: RouteRepositoryInterface) { }

    async execute(): Promise<CreateRouteOutput> {
        const routes = await this.routeRepository.findAll();
        return routes.map(r => r.toJSON());
    }
}

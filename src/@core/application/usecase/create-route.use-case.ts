import { LatLng, Route } from "../../domain/entities/route.entity";
import { RouteRepositoryInterface } from "../../domain/repositories/route-repository";

type CreateRouteInput = {
    title: string;
    startPosition: LatLng;
    endPosition: LatLng;
    points?: LatLng[];
}

type CreateRouteOutput = {
    id: string;
    title: string;
    startPosition: LatLng;
    endPosition: LatLng;
    points?: LatLng[];
}

export class CreateRouteUseCase {
    constructor(private routeRepository: RouteRepositoryInterface) { }

    async execute(input: CreateRouteInput): Promise<CreateRouteOutput> {
        const route = new Route(input);
        await this.routeRepository.insert(route);
        return route.toJSON();
    }
}

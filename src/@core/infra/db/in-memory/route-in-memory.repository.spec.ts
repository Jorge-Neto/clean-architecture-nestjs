import { Route, RouteProps } from '../../../domain/entities/route.entity';
import { RouteInMemoryRepository } from './route-in-memory.repository';

describe('RouteInMemoryRepository', () => {
  it('should be defined', () => {
    expect(new RouteInMemoryRepository()).toBeDefined();
  });
  it('should insert a new route', async () => {
    const repository = new RouteInMemoryRepository();
    const routeProps: RouteProps = {
      title: 'Test',
      startPosition: { lat: 0, lng: 0 },
      endPosition: { lat: 1, lng: 2 },
    };
    const route = new Route(routeProps);
    await repository.insert(route);
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([route]);
  });
});

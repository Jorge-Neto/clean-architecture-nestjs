import { DataSource } from 'typeorm';
import { RouteSchema } from './route.schema';
import { Route } from '../../../domain/entities/route.entity';

describe('RouteSchema Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [RouteSchema],
    });
    await dataSource.initialize();
    const route = Route.create({
      title: 'title',
      startPosition: { lat: 1, lng: 2 },
      endPosition: { lat: 3, lng: 4 },
      points: [{ lat: 3, lng: 4 }],
    });
    const routeRepo = dataSource.getRepository(Route);
    await routeRepo.save(route);
  });
});

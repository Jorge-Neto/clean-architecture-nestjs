import { Route, RouteProps } from '../../../domain/entities/route.entity';
import { DataSource } from 'typeorm';
import { RouteSchema } from './route.schema';
import { RouteTypeOrmRepository } from './route-typeorm-repository';

describe('RouteTypeOrmRepository', () => {
  it('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [RouteSchema],
    });

    await dataSource.initialize();
  });

  it('should insert a new route', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [RouteSchema],
    });
    await dataSource.initialize();

    const ormRepository = dataSource.getRepository(Route);
    const repository = new RouteTypeOrmRepository(ormRepository);
    const routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const route = Route.create(routeProps);
    await repository.insert(route);

    const routeFound = await ormRepository.findOneBy({ id: route.id });
    expect(routeFound.toJSON()).toStrictEqual(route.toJSON());
  });
});

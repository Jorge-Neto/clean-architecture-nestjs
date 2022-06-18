import { RouteRepositoryInterface } from '../../../domain/repositories/route-repository';
import { Repository } from 'typeorm';
import { Route } from '../../../domain/entities/route.entity';

export class RouteTypeOrmRepository implements RouteRepositoryInterface {
  constructor(private ormRepository: Repository<Route>) {}

  async insert(route: Route): Promise<void> {
    await this.ormRepository.save(route);
  }
  findAll(): Promise<Route[]> {
    return this.ormRepository.find();
  }
}

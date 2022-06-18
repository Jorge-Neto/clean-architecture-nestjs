import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from '../@core/application/usecase/create-route.use-case';
import { ListAllRoutesUseCase } from '../@core/application/usecase/list-all-routes.use-case';
import { RouteRepositoryInterface } from '../@core/domain/repositories/route-repository';
import { RouteInMemoryRepository } from '../@core/infra/db/in-memory/route-in-memory.repository';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { RouteSchema } from '../@core/infra/db/typeorm/route.schema';
import { RouteTypeOrmRepository } from '../@core/infra/db/typeorm/route-typeorm-repository';
import { DataSource } from 'typeorm';
import { Route } from '../@core/domain/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new RouteTypeOrmRepository(dataSource.getRepository(Route));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (repository: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(repository);
      },
      inject: [RouteTypeOrmRepository],
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (repository: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(repository);
      },
      inject: [RouteTypeOrmRepository],
    },
  ],
})
export class RoutesModule {}

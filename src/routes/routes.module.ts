import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from 'src/@core/application/usecase/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/usecase/list-all-routes.use-case';
import { RouteRepositoryInterface } from 'src/@core/domain/repositories/route-repository';
import { RouteInMemoryRepository } from 'src/@core/infra/db/in-memory/route-in-memory.repository';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (repository: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(repository);
      },
      inject: [RouteInMemoryRepository],
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (repository: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(repository);
      },
      inject: [RouteInMemoryRepository],
    },
  ],
})
export class RoutesModule {}

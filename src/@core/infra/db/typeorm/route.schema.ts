import { EntitySchema } from 'typeorm';
import { Route } from '../../../domain/entities/route.entity';

export const RouteSchema = new EntitySchema<Route>({
  name: 'route',
  target: Route,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    title: {
      type: 'text',
      length: 255,
    },
    startPosition: {
      type: 'simple-json',
    },
    endPosition: {
      type: 'simple-json',
    },
    points: {
      type: 'simple-json',
    },
  },
});

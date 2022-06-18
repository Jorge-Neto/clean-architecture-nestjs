import { LatLng, Route, RouteProps } from './route.entity';

describe('Route Tests', () => {
  test('constructor', () => {
    let routeProps: RouteProps = {
      title: 'title',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
    };
    let route = Route.create(routeProps);
    expect(route.props).toStrictEqual({ ...routeProps, points: [] });

    routeProps = {
      title: 'title',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
      points: [{ lat: 10, lng: 10 }],
    };
    route = Route.create(routeProps);
    expect(route.id).toBeDefined();
    expect(route.props).toStrictEqual({
      ...routeProps,
      points: [{ lat: 10, lng: 10 }],
    });

    routeProps = {
      title: 'title updated',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
      points: [{ lat: 10, lng: 10 }],
    };
    route = Route.create(routeProps);
    expect(route.props).toStrictEqual({
      ...routeProps,
      points: [{ lat: 10, lng: 10 }],
    });
  });
  test('updateTitle method', () => {
    const routeProps: RouteProps = {
      title: 'title',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
    };
    const route = Route.create(routeProps);
    route.updateTitle('title updated');
    expect(route.title).toBe('title updated');
  });

  test('updatePosition method', () => {
    const routeProps: RouteProps = {
      title: 'title',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
    };
    const route = Route.create(routeProps);
    const startPosition: LatLng = { lat: 10, lng: 10 };
    const endPosition: LatLng = { lat: 30, lng: 40 };
    route.updatePosition(startPosition, endPosition);
    expect(route.startPosition).toBe(startPosition);
    expect(route.endPosition).toBe(endPosition);
  });

  test('updatePoints method', () => {
    const routeProps: RouteProps = {
      title: 'title',
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 2 },
    };
    const route = Route.create(routeProps);
    const points: LatLng[] = [{ lat: 2, lng: 2 }];
    route.updatePoints(points);
    expect(route.points).toHaveLength(1);
    expect(route.points).toStrictEqual(points);
  });
});

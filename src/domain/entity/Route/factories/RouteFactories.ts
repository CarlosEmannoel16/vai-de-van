import { Route } from '../Route';

export interface IRouteFactories {
  create: (data: IRouteFactories.ParamsCreate) => Route;
}

export namespace IRouteFactories {
  export type ParamsCreate = {
    id?: string;
    name: string;
    km: number;
    kmValue: number;
  };
}
export class RouteFactories {
  static create(data: IRouteFactories.ParamsCreate): Route {
    return new Route(
      data.id,
      data.name,
      data.km,
      data.kmValue,
    );
  }
}

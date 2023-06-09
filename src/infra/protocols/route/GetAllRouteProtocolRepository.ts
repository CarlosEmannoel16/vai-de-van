export interface IGetAllRouteProtocolRepository {
  getAll: () => Promise<IGetAllRouteProtocolRepository.Result[]>;
}

export namespace IGetAllRouteProtocolRepository {
  export type Result = {
    id: string;
    name: string;
    km: number;
    kmValue: number | null;
    originId: string;
    destinyId: string;
  };
}

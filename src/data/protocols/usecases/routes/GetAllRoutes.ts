export interface IGetAllRoutes {
  execute: () => Promise<IGetAllRoutes.Result[]>;
}

export namespace IGetAllRoutes {
  export type Result = {
    id: string;
    name: string;
    km: number;
    kmValue: number | null;
    tripStops : {
      idCity: string;
      nameCity: string;
      distanceLastStop: number;
      isInitialStop: boolean;
      isFinalStop: boolean;
    }[]
  };
}

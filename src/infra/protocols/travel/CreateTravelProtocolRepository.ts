import { Travel } from "@prisma/client";

export interface ICreateTravelProtocolRepository {
  create(
    data: ICreateTravelProtocolRepository.Params,
  ): Promise<ICreateTravelProtocolRepository.Result>;
}

export namespace ICreateTravelProtocolRepository {
  export type Result = Travel;
  export type Params = {
    arrivalDate: string
    departureDate: Date
    driverId: string
    idVechicle: string;
    routeId: string;
  };
}

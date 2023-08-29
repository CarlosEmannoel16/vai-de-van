import { FindTravelById } from '@/data/usecases/travels/FindTravelByIdUseCase';
import { ICreateTravels } from '@/domain/usecases/travels/CreateTravels';
import { IListAllTravels } from '@/domain/usecases/travels/LisatAllTravels';
import { IGetByIdRouteProtocolRepository } from '@/infra/protocols/route/GetByIdRouteProtocolRepository';
import { ICreateTripStopsProtocolRepository } from '@/infra/protocols/tripStops/CreateTripStopsProtocolRepository';
import ControllerException from '@/presentation/helpers/ControllerException';
import { IController } from '@/presentation/protocols/IController';
import { IResponse } from '@/presentation/utils/response';
import { Request, Response } from 'express';

export class FindTravelByIdController implements IController {
  constructor(private readonly findTravelByIdUseCase: FindTravelById) {}

  async handle(req: Request, res: Response): Promise<Response<IResponse>> {
    try {
      const data = await this.findTravelByIdUseCase.execute(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      const { message, status, statusCode } =
      ControllerException.handleError(error);
    return res.status(statusCode).json({ message, status });
    }
  }
}
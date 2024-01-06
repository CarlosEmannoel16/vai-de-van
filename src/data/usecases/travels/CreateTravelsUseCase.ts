import { ICreateTravels } from '@/data/protocols/usecases/travels/CreateTravels';
import { IUserProtocolRepository } from '@/infra/protocols';
import { IGetByIdRouteProtocolRepository } from '@/domain/Route/repository/GetByIdRouteProtocolRepository';
import { ITravelProtocolRepository } from '@/domain/Travel/repositories';
import { IVehicleProtocolRepository } from '@/infra/protocols/vechicle';
import { v4 } from 'uuid';
import { TravelFactory } from '@/domain/Travel/factory/TravelFactory';
export class CreateTravels implements ICreateTravels {
  constructor(
    private readonly travelRepository: ITravelProtocolRepository,
    private readonly routesRepository: IGetByIdRouteProtocolRepository,
    private readonly userRepository: IUserProtocolRepository,
    private readonly vehicleRepository: IVehicleProtocolRepository,
  ) {}
  async execute(data: ICreateTravels.Params): Promise<any> {
    const route = await this.routesRepository.getById(data.routeId);
    if (!route) throw new Error('Rota não encontrada');

    const vehicle = await this.vehicleRepository.getById(data.idVehicle);
    if (!vehicle) throw new Error('Veículo não encontrado');


    const driver = await this.userRepository.getDriverById(data.driverId);


    const travel = TravelFactory.createTravel({
      arrivalDate: new Date(data.arrivalDate),
      departureDate: new Date(data.departureDate),
      name: data.description || 'Viagem sem nome',
      vehicle,
      driver,
      route,
      id: v4(),
    });


    await this.travelRepository.create(travel);
  }
}

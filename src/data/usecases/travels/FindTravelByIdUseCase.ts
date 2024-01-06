import { IListAllTravels } from '@/data/protocols/usecases/travels/LisatAllTravels';
import { ITravelProtocolRepository } from '@/domain/Travel/repositories';
import { Travel } from '@prisma/client';

export class FindTravelById {
  constructor(private readonly travelRepository: ITravelProtocolRepository) {}
  async execute(id: string): Promise<IListAllTravels.Params[]> {
    return this.travelRepository.findById(id);
  }
}

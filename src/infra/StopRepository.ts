import { PrismaClient } from '@prisma/client';
import { IUpdateStopRepository } from './protocols/stops/UpdateStopRepository';
import { StopInterface } from '@/domain/Stop/interface/StopInterface';
import { StopFactory } from '@/domain/Stop/factory/StopFactory';
import { ICreateStopRepository } from './protocols/stops/CreateStopRepository';
import { IGetAllStopsRepository } from './protocols/stops/GetAllStopsRepository';
import { IChangeStatusStopRepository } from './protocols/stops/ChangeStatusStopRepository';
import { IGetStopRepository } from './protocols/stops/GetStopRepository';
import { IGetStopsByIdsRepository } from './protocols/stops/GetStopsByIdsRepository';

const stop = new PrismaClient().stop;

export class StopRepository
  implements
    ICreateStopRepository,
    IGetAllStopsRepository,
    IChangeStatusStopRepository,
    IUpdateStopRepository,
    IGetStopRepository,
    IGetStopsByIdsRepository
{
  async getByIds(ids: string[]): Promise<StopInterface[]> {
    const result = await stop.findMany({ where: { id: { in: ids } } });
    return result.map(stop => {
      return StopFactory.create({
        id: stop.id,
        name: stop.name,
        status: 'enable',
        coordinates: stop.coordinates,
      });
    });
  }
  async getOne(id: string): Promise<StopInterface> {
    const result = await stop.findUnique({ where: { id } });
    return StopFactory.create({
      id: result.id,
      name: result.name,
      status: 'enable',
      coordinates: result.coordinates,
    });
  }

  async create(data: StopInterface): Promise<StopInterface> {
    const result = await stop.create({
      data: {
        id: data.id,
        name: data.name,
        image: data.image,
        coordinates: data.coordinates,
      },
    });

    return StopFactory.create({
      id: result.id,
      name: result.name,
      status: 'enable',
      coordinates: result.coordinates,
    });
  }

  async changeStatus(id: string): Promise<any> {
    return stop.update({ where: { id }, data: { disabled: true } });
  }
  async update(data: StopInterface): Promise<StopInterface> {
    await stop.update({
      where: { id: data.id },
      data: {
        name: data.name,
        image: data.image,
        coordinates: data.coordinates,
      },
    });
    return data;
  }
  async getAll(): Promise<StopInterface[]> {
    const result = await stop.findMany();
    return result.map(stop => {
      return StopFactory.create({
        id: stop.id,
        name: stop.name,
        status: 'enable',
        coordinates: stop.coordinates,
      });
    });
  }
}

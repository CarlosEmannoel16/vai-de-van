import { PrismaClient } from '@prisma/client';
import {
  IGetUserByIdProtocolRepository,
  ICreateUserProtocolRepository,
  IGetUserByCpfProtocolRepository,
  IGetUserByNameProtocolRepository,
  IGetUserByEmailProtocolRepository,
  IGetAllUsersProtocolRepository,
  IDeleteUserProtocolRepository,
} from '@/infra/protocols';
import { ICreateDriverProtocolRepository } from './protocols/drivers/createDriver';
import { IUpdateUserProtocolRepository } from './protocols/user/UpdateUserProtocolRepository';
import { UserModel } from '@/domain/models';

const prisma = new PrismaClient();
export class UserRepository
  implements
    ICreateUserProtocolRepository,
    IGetUserByIdProtocolRepository,
    IGetUserByNameProtocolRepository,
    IGetUserByCpfProtocolRepository,
    IGetUserByEmailProtocolRepository,
    IGetAllUsersProtocolRepository,
    ICreateDriverProtocolRepository,
    IUpdateUserProtocolRepository,
    IDeleteUserProtocolRepository
{
  async delete(id: string): Promise<boolean> {
    const result = await prisma.user.delete({
      where: { id },
      include: { Driver: true },
    });
    return result ? true : false;
  }
  async update(
    data: IUpdateUserProtocolRepository.Params,
  ): Promise<IUpdateUserProtocolRepository.Result> {
    const { id, cpf, date_of_birth, email, name, password, phone, type } = data;
    const user = prisma.user.update({
      data: {
        cpf,
        date_of_birth,
        email,
        name,
        password,
        phone,
        type,
      },
      where: {
        id: id,
      },
    });
    return user;
  }
  async createDriver(
    data: ICreateDriverProtocolRepository.Params,
  ): Promise<ICreateDriverProtocolRepository.Result> {
    const { cnh, cpf, date_of_birth, email, name, password, phone } = data;
    const driver = await prisma.user.create({
      data: {
        cpf,
        date_of_birth: new Date(date_of_birth),
        email,
        name,
        password,
        phone,
        type: 'DRIVER',
        Driver: { create: { cnh } },
      },
    });
    return driver;
  }
  async create({
    cpf,
    date_of_birth,
    email,
    name,
    password,
    phone,
    type,
  }: ICreateUserProtocolRepository.Params): Promise<ICreateUserProtocolRepository.Result> {
    const user = await prisma.user.create({
      data: { cpf, date_of_birth, email, name, password, phone, type },
    });
    return user;
  }
  async getById(idUser: string): Promise<UserModel> {
    const user = await prisma.user.findFirst({
      select: {
        Driver: {
          select: {
            cnh: true,
            cnhDateOfIssue: true,
            cnhExpirationDate: true,
            id: true,
          },
        },
        Vehicle: true,
        type: true,
        cpf: true,
        email: true,
        id: true,
        name: true,
        date_of_birth: true,
        update_at: true,
        password: true,
        phone: true,

      },
      where: { id: idUser },
    });
    return user;
  }

  async getUserByName(
    nameUser: string,
  ): Promise<IGetUserByNameProtocolRepository.Result | any> {
    const user = await prisma.user.findFirst({ where: { name: nameUser } });
    if (!user) return {};

    const { email, id, name, phone, type, cpf, date_of_birth } = user;
    return {
      email,
      id,
      name,
      phone,
      type,
      cpf,
      date_of_birth,
    };
  }

  async getByCpf(
    cpfUser: string,
  ): Promise<IGetUserByCpfProtocolRepository.Result | any> {
    const user = await prisma.user.findFirst({ where: { cpf: cpfUser } });
    if (!user) return {};
    const { cpf, date_of_birth, email, id, name, phone, type } = user;
    return { cpf, date_of_birth, email, id, name, phone, type };
  }

  async getUserByEmail(
    emailUser: string,
  ): Promise<IGetUserByEmailProtocolRepository.Result | any> {
    const user = await prisma.user.findFirst({ where: { email: emailUser } });
    if (!user) return {};
    const { cpf, date_of_birth, email, id, name, phone, type, password } = user;
    return { cpf, date_of_birth, email, id, name, phone, type, password };
  }

  async getAll(): Promise<IGetAllUsersProtocolRepository.Result[]> {
    const users = await prisma.driver.findMany({
      select: {
        User: {
          select: {
            cpf: true,
            email: true,
            created_at: true,
            date_of_birth: true,
            id: true,
            name: true,
            phone: true,
            type: true,
            update_at: true,
          },
        },
        cnh: true,
        Travel: true,
        Vehicle: true,
      },
    });

    return users;
  }
}

import { ICreateDriverUseCase } from '@/data/protocols/usecases/driver/CreateDriver';
import { PersonFactory } from '@/domain/Person/factory/PersonFactory';
import { IUserProtocolRepository } from '@/infra/protocols';
import { IDriverProtocolRepository } from '@/infra/protocols/drivers';
import { v4 } from 'uuid';

export class CreateDriverUseCase implements ICreateDriverUseCase {
  constructor(
    private readonly userRepository: IUserProtocolRepository,
    private readonly driverRepository: IDriverProtocolRepository,
  ) {}
  async create(
    data: ICreateDriverUseCase.request,
  ): Promise<ICreateDriverUseCase.response> {
    const errors = [];
    const existsCpf = await this.userRepository.getUserByParams({
      cpf: data.cpf,
    });
    const existsEmail = await this.userRepository.getUserByParams({
      email: data.email,
    });

    if (existsCpf) errors.push('CPF já cadastrado');
    if (existsEmail) errors.push('Email já cadastrado');
    if (errors.length > 0) throw new Error(`Erros: ` + errors.join(', '));

    const personFactory = new PersonFactory();

    const driver = personFactory.driver({
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phone,
      id: v4(),
      cnh: data.cnh,
      dateOfBirth: new Date(data.date_of_birth),
    });

    const result = await this.driverRepository.create(driver);
    return {
      cpf: result.cpf,
      date_of_birth: result.dateOfBirth.toISOString(),
      email: result.email,
      id: result.id,
      name: result.name,
      password: result.password,
      phone: result.phone,
      cnh: result.cnh,
      cnhDateOfIssue: result.cnhDateOfIssue.toISOString(),
      cnhExpirationDate: result.cnhExpirationDate.toISOString(),
    };
  }
}

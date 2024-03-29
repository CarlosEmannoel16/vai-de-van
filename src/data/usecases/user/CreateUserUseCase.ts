import { InvalidGenericError } from '@/data/errors/InvalidGenericError';
import { ICreateUser } from '@/data/protocols/usecases/user';
import PersonFactory from '@/domain/Person/factory/PersonFactory';
import { IUserProtocolRepository } from '@/infra/protocols/user';

export class CreateUserUseCase implements ICreateUser {
  constructor(private readonly userRepository: IUserProtocolRepository) {}

  async execute(data: ICreateUser.Params): Promise<ICreateUser.Result> {
    const existsUser = await this.userRepository.getByCpf(data.cpf);
    const existsUserWithEmail = await this.userRepository.getUserByEmail(
      data.email,
    );

    if (existsUserWithEmail.email)
      throw new InvalidGenericError('E-mail Já cadastrado');

    if (existsUser.name) throw new InvalidGenericError('Cpf já cadastrado');

    const user = PersonFactory.user({
      cpf: data.cpf,
      name: data.name,
      email: data.email,
    })

   await this.userRepository.create(user);
    return user;
  }
}

import { DriverInterface } from '@/domain/Person/protocols/DriverInterface';

export interface IDriverProtocolRepository {
  create(data: DriverInterface): Promise<DriverInterface>;
  findById(id: string): Promise<DriverInterface>;
  findAll(): Promise<DriverInterface[]>;
  getByCpf(cpf: string): Promise<DriverInterface>;
  getByCnh(cnh: string): Promise<DriverInterface>;
  getByEmail(email: string): Promise<DriverInterface>;

  checkExistsByCpf(cpf: string): Promise<boolean>;
  checkExistsByCnh(cnh: string): Promise<boolean>;
  checkExistsByEmail(email: string): Promise<boolean>;
}

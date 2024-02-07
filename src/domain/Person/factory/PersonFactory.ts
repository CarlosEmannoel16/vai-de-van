import { Customer } from '../entity/Customer';
import { Driver } from '../entity/Driver';
import { User } from '../entity/User';
import { CustomerInterface } from '../protocols/CustomerInterface';
import { DriverInterface } from '../protocols/DriverInterface';
import { UserInterface } from '../protocols/UserInterface';

export interface PersonFactoryInterface {
  driver(data: PersonProps): DriverInterface;
  customer(data: PersonProps): CustomerInterface;
  user(data: PersonProps): UserInterface;
}

export interface PersonProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  cnh?: string;
  password?: string;
  dateOfBirth?: Date;
  phone?: string;
  dateOfCreate?: Date;
  dateOfUpdate?: Date;
}

export class PersonFactory implements PersonFactoryInterface {
  driver(data: PersonProps): DriverInterface {
    return new Driver({ ...data, cnh: data.cnh });
  }
  customer(data: PersonProps): CustomerInterface {
    return new Customer(data);
  }
  user(data: PersonProps): UserInterface {
    return new User(data);
  }
}

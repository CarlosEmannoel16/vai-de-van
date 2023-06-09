import { DeleteUserById } from "@/data/usecases/user";
import { IDeleteUser } from "@/domain/usecases/user/DeleteUser";
import { makeUserRepository } from "../repositories";

export const makeDeleteUserUseCase = (): IDeleteUser =>{
    return new DeleteUserById(makeUserRepository(), makeUserRepository())
}
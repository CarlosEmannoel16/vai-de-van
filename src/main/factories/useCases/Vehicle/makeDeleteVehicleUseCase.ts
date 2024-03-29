import { DeleteVehicleUseCase } from "@/data/usecases/vehicle/DeleteVehicle";
import { IDeleteVehicleUseCase } from "@/data/protocols/usecases/vechicle/DeleteVehicleUseCase";
import { VehicleRepository } from "@/infra/VehicleRepository";

export const makeDeleteVehicleUseCase = (): IDeleteVehicleUseCase=>{
    return new DeleteVehicleUseCase(new VehicleRepository())
}

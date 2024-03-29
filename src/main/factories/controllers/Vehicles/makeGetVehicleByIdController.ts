import { GetVehicleByIdUseCase } from "@/data/usecases/vehicle/GetVehicleById"
import { VehicleRepository } from "@/infra/VehicleRepository"
import { GetVehicleByIdController } from "@/presentation/controller/vehicle/GetVehicleByIdController"

export const makeGetVehicleByIdController = () => {
    return new GetVehicleByIdController(new GetVehicleByIdUseCase(new VehicleRepository()))
}

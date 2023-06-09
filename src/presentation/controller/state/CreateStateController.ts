import { IController } from '@/presentation/protocols/IController';
import { IResponse } from '@/presentation/utils/response';
import { Request, Response } from 'express';
import { ICreateState } from '@/domain/usecases/state/CreateState';
import { createStateValidation } from './validation/yupValidationSate';
import { httpResponse } from '@/presentation/helpers/httpResponse';

export class CreateStateController implements IController {
  constructor(private readonly createStateUseCase: ICreateState) {}

  async handle(req: Request, res: Response): Promise<Response<IResponse>> {
    try {
      createStateValidation.validate(req.body, {
        abortEarly: false,
      });
      const { name, uf } = req.body;
      const result = await this.createStateUseCase.execute({ name, uf });
      return res.status(200).json(httpResponse(result, 'ok'));
    } catch (error) {}
  }
}

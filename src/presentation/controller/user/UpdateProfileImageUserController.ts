import { Request, Response } from 'express';
import { IController } from '@/presentation/protocols/IController';
import { IResponse, ResponseStatus } from '../../utils/response';
import ControllerException from '../../helpers/ControllerException';
import { IRequest } from '@/main/utils';

export class UpdateProfileImageUserController implements IController {
  constructor() {}
  async handle(req: IRequest): Promise<Response<IResponse>> {
    try {
    } catch (error) {
      const { message, status, statusCode } = ControllerException.handleError(
        error as Error,
      );
      return {

      }
    }
  }
}

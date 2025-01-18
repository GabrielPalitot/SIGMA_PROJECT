import { Request, Response } from "express";
import IotDeviceRepository from "../repositories/IotDeviceRepository";
import { postgresHandler } from "..";

class IotDeviceController {
  async create(request: Request, response: Response) {
    const iotDeviceRepository = postgresHandler
      .getDataSource()
      .getRepository(IotDeviceRepository);
  }
}

export default new IotDeviceController();

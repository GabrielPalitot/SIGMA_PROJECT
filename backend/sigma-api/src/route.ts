import { Router } from "express";
import IotDeviceController from "./controllers/IotDeviceController";

const router = Router();

router.post("/iot-device", IotDeviceController.create);

export { router };

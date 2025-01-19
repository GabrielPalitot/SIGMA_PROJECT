import { Request, Response } from "express";
// import { postgresHandler } from "..";

// interface ISaveData {
//   id_esp: string;
//   solo_humidity: number;
//   temperature: number;
//   pressure: number;
//   has_rain: boolean;
// }

export class MeasurementController {
  public saveData = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { measurements } = request.body;
      return response.status(201).json({
        id_esp: "12345",
        solo_humidity: 0,
        temperature: 25,
        pressure: 45,
        has_rain: true,
      });
    } catch (error) {
      console.log(error);
      // Retorna uma resposta de erro caso algo dê errado
      return response.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
export default new MeasurementController();

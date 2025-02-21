import {
  IotDeviceDTOType,
  ResponseIotDeviceArrayDTOType,
  ResponseIotDeviceDTOType,
} from "../../controllers/iotDevice/schema";
import { IIotDeviceRepository } from "../../repositories/iotDevice/IotDeviceRepositoryInterface";
class IotDeviceService {
  constructor(private readonly iotDeviceRepository: IIotDeviceRepository) {}

  async createIotDevice(
    params: IotDeviceDTOType,
  ): Promise<ResponseIotDeviceDTOType> {
    const data = await this.iotDeviceRepository.createIotDevice(params);
    const { state, city } = await this.getStateAndCityByLatitudeAndLongitude(
      data.latitude,
      data.longitude,
    );
    const response: ResponseIotDeviceDTOType = {
      id_esp: data.id_esp,
      latitude: data.latitude,
      longitude: data.longitude,
      state: state,
      city: city,
      id_identity_user: data.id_identity_user,
      created_at: data.created_at.toISOString(),
      updated_at: data.updated_at.toISOString(),
    };
    return response;
  }

  async getIotDevice(params: string): Promise<ResponseIotDeviceDTOType | null> {
    const data = await this.iotDeviceRepository.findById(params);
    if (!data) return null;
    const { state, city } = await this.getStateAndCityByLatitudeAndLongitude(
      data.latitude,
      data.longitude,
    );
    const response: ResponseIotDeviceDTOType = {
      id_esp: data.id_esp,
      latitude: data.latitude,
      longitude: data.longitude,
      state: state,
      city: city,
      id_identity_user: data.id_identity_user,
      created_at: data.created_at.toISOString(),
      updated_at: data.updated_at.toISOString(),
    };
    return response;
  }

  async getIotDevices(): Promise<ResponseIotDeviceArrayDTOType> {
    const result = await this.iotDeviceRepository.findAll();

    const enrichedData = await Promise.all(
      result.map(async (item) => {
        const { state, city } =
          await this.getStateAndCityByLatitudeAndLongitude(
            item.latitude,
            item.longitude,
          );

        return {
          ...item,
          state,
          city,
          created_at: item.created_at.toISOString(),
          updated_at: item.updated_at.toISOString(),
        };
      }),
    );

    return enrichedData;
  }

  async updateIotDevice(id: string, iotDevice: Partial<IotDeviceDTOType>) {
    return this.iotDeviceRepository.updateIotDevice(id, iotDevice);
  }

  async deleteIotDevice(id: string) {
    return this.iotDeviceRepository.deleteIotDevice(id);
  }

  async getStateAndCityByLatitudeAndLongitude(
    latitude: number,
    longitude: number,
  ) {
    try {
      console.log(latitude);
      console.log(longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      console.log(url);

      const response = await fetch(url, {
        headers: {
          "User-Agent": "SigmaProject/1.0 (your_email@example.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Nominatim Response:", data); // <-- Log para depuração

      if (!data || !data.address) {
        throw new Error(
          "Address not found. Check if the latitude and longitude are correct.",
        );
      }

      const state = data.address.state || "State not found";
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "City not found";

      return { state, city };
    } catch (error) {
      console.error("Error in search for city and state", error);
      return { state: "No data", city: "No data" };
    }
  }
}

export default IotDeviceService;

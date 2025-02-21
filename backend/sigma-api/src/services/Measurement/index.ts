import {
  MeasurementsArrayDTOType,
  MeasurementTimestampDTOType,
  ResponseMeasurementsArrayDTOType,
} from "../../controllers/measurements/schema";
import Measurement from "../../models/Measurement";
import { IMeasurementRepository } from "../../repositories/measurement/MeasurementRepositoryInterface";

export interface MeasurementTimestamp {
  id_esp: string;
  timestampInit: Date;
  timestampEnd: Date;
}

class MeasurementService {
  // === [1] Parâmetros do modelo de Van Genuchten (exemplo da Tabela 2) ===
  private static readonly THETA_R = 0.141; // θr
  private static readonly THETA_S = 0.38389; // θs
  private static readonly ALPHA = 0.022594; // α
  private static readonly N = 20.524; // n

  // Ajustes para ETc
  private static readonly KC = 0.85;
  private static readonly LATITUDE = -3.71839; // Exemplo de latitude
  private static readonly G_S = 0.082; // Constante solar (MJ/m²/min)

  private static readonly THETA_FC = 0.26; // θfc
  private static readonly THETA_CR = 0.18; // θcr
  private static readonly DEPHT = 50; // θcr

  constructor(private readonly measurementRepository: IMeasurementRepository) {}

  /**
   * [2] Converte umidade em % (m/m) para tensão (kPa)
   * Fórmula: U = 36,88 × |T|^(-0.102)
   * => |T| = (36,88 / U)^(1/0.102)
   */
  private convertMassMoistureToTension(uPercent: number): number {
    if (uPercent <= 0) {
      uPercent = 1;
    }
    console.log("DEPOIS");
    console.log(uPercent);

    const tension = Math.pow(36.88 / uPercent, 1 / 0.102);
    return tension;
  }

  /**
   * [3] Modelo de Van Genuchten para obter umidade volumétrica (θ)
   * θ(ψ) = θr + (θs - θr) / [1 + (α |ψ|)^n]^(1 - 1/n)
   */
  private vanGenuchten(tensionKPa: number): number {
    const psi = Math.abs(tensionKPa);
    const base =
      1 + Math.pow(MeasurementService.ALPHA * psi, MeasurementService.N);
    const exponent = 1 - 1 / MeasurementService.N;

    const theta =
      MeasurementService.THETA_R +
      (MeasurementService.THETA_S - MeasurementService.THETA_R) /
        Math.pow(base, exponent);

    return theta;
  }

  /**
   * [4] Retorna o número do dia do ano (1 a 365/366)
   */
  public getDayOfYear(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const msInDay = 24 * 60 * 60 * 1000;
    const diff = date.getTime() - startOfYear.getTime();
    return Math.floor(diff / msInDay) + 1;
  }

  /**
   * [5] Cálculo de ETc usando Hargreaves-Samani (exemplo simplificado).
   * et0 = 0.0023 × (Tmean + 17.8) × √(Tmax - Tmin) × Ra
   * ETc = et0 × Kc
   */
  public calculateEtc(
    tmax: number,
    tmin: number,
    tmean: number,
    latitude: number,
    dayOfYear: number,
    kc: number,
  ): number {
    // Declinação solar (delta)
    const delta = 0.409 * Math.sin(((2 * Math.PI) / 365) * dayOfYear - 1.39);

    // Distância relativa Terra-Sol (dr)
    const d_r = 1 + 0.033 * Math.cos(((2 * Math.PI) / 365) * dayOfYear);

    // phi em radianos
    const phi = (Math.PI / 180) * latitude;

    // Ângulo horário do nascer/pôr do sol (omega_s)
    const omega_s = Math.acos(-Math.tan(phi) * Math.tan(delta));

    // Radiação extraterrestre (Ra)
    const R_a =
      ((24 * 60) / Math.PI) *
      MeasurementService.G_S *
      d_r *
      (omega_s * Math.sin(phi) * Math.sin(delta) +
        Math.cos(phi) * Math.cos(delta) * Math.sin(omega_s));

    // Hargreaves-Samani => ET0
    const et0 = 0.0023 * (tmean + 17.8) * Math.sqrt(tmax - tmin) * R_a;

    // Ajuste pelo coeficiente de cultura
    const etc = et0 * kc;
    return etc;
  }

  /**
   * [6]Retorna tmax, tmin, tmean a partir das medições de um período definido,
   * filtrando por id_esp e usando getMeasurementsByTimestamp.
   *
   * @param id_esp       UUID do dispositivo
   * @param timestampInit data/hora inicial (ex: "2023-01-01T00:00:00Z")
   * @param timestampEnd  data/hora final   (ex: "2023-01-04T00:00:00Z")
   * @param nRegistros    Quantidade máxima de registros a analisar (default=1000)
   * @returns { tmax, tmin, tmean }
   */
  public async getETCParams(
    id_esp: string,
    timestampInit: string,
    timestampEnd: string,
  ): Promise<{ tmax: number; tmin: number; tmean: number }> {
    // 1) Buscar medições do repositório com base em um intervalo de tempo
    console.log("TIMESTAMP DE INICIO KRL");
    console.log(timestampInit);
    console.log("TIMESTAMP DE FIMMMMMM KRL");
    console.log(timestampEnd);
    const measurements = await this.getMeasurementsByTimestamp({
      id_esp,
      timestampInit,
      timestampEnd,
    });

    if (measurements.length === 0) {
      throw new Error(
        "Não há medições para calcular ETc no período especificado.",
      );
    }

    // 3) Extrair temperaturas
    const temperatures = measurements.map((m) => m.temperature);

    // 4) Calcular tmin, tmax e tmean
    const tmin = Math.min(...temperatures);
    const tmax = Math.max(...temperatures);
    const sum = temperatures.reduce((acc, val) => acc + val, 0);
    const tmean = sum / temperatures.length;

    return { tmax, tmin, tmean };
  }

  /**
   * [7] Cálculo final do IWN (Equation A3), usando ETc dos últimos 2 dias.
   *    IWN = [ Σ(ETc_i - R_i) - ΔA ] / Ef
   * Exemplo simples:
   *  - Soma ETc dos 2 dias (supondo chuva R=0 ou obtendo de outro lugar).
   *  - Converte umidade % -> tensão -> θ (opcional, se precisar no cálculo).
   */
  public async calculateIWN(idEsp: string): Promise<{
    iwn: number;
    irriga: boolean;
  }> {
    // 3) Obter dados dos últimos 2 dias para esse dispositivo
    const now = new Date();
    console.log(now);
    // const now = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

    // Busca medições de "idEsp" entre twoDaysAgo e now
    const measurementsToday = await this.getMeasurementsByTimestamp({
      id_esp: idEsp,
      timestampInit: twoDaysAgo.toISOString(),
      timestampEnd: now.toISOString(),
    });

    const uPercent =
      measurementsToday[measurementsToday.length - 1].solo_humidity;
    console.log("ANTES");
    console.log(uPercent);
    // const uPercent = 24;

    // 1) Converter umidade (massa) -> tensão
    const uTensionKPa = this.convertMassMoistureToTension(uPercent);

    // 2) Tensão -> umidade volumétrica
    const umidadeAtual = this.vanGenuchten(uTensionKPa);

    // 4) Calcular ETc para cada dia
    // hoje
    const { tmax, tmin, tmean } = await this.getETCParams(
      idEsp,
      sevenDaysAgo.toISOString(),
      now.toISOString(),
    );
    const dayNumber = this.getDayOfYear(now);
    const etc1 = this.calculateEtc(
      tmax,
      tmin,
      tmean,
      MeasurementService.LATITUDE,
      dayNumber,
      MeasurementService.KC,
    );
    //dois dias atrás
    const etc2Params = await this.getETCParams(
      idEsp,
      eightDaysAgo.toISOString(),
      twoDaysAgo.toISOString(),
    );

    const etc2 = this.calculateEtc(
      etc2Params.tmax,
      etc2Params.tmin,
      etc2Params.tmean,
      MeasurementService.LATITUDE,
      dayNumber - 1,
      MeasurementService.KC,
    );

    const sumEtc = etc1 + etc2;

    // 5) Chuva (R) e deltaA podem ser buscados do DB. Exemplo fixo = 0:
    const R_total = 0;
    const deltaA =
      (MeasurementService.THETA_FC - umidadeAtual) * MeasurementService.DEPHT; // Se precisar, calcule com θ inicial e θ final
    const E_f = 1; // Eficiência de irrigação

    // 6) Cálculo final => IWN = (Σ(ETc_i - R_i) - ∆A) / E_f
    const iwn = (sumEtc - R_total - deltaA) / E_f;
    let irriga = false;
    if (umidadeAtual < MeasurementService.THETA_CR) {
      irriga = true;
    }
    // Retorna tudo que quiser
    return {
      iwn,
      irriga,
    };
  }

  async createMeasurements(
    params: MeasurementsArrayDTOType,
  ): Promise<ResponseMeasurementsArrayDTOType> {
    const data: Partial<Measurement>[] = params.map((item) => ({
      id_esp: item.id_esp,
      measurement_time: new Date(item.measurement_time),
      solo_humidity: item.solo_humidity,
      temperature: item.temperature,
      air_humidity: item.air_humidity,
      pressure: item.pressure,
      has_rain: item.has_rain,
    }));

    const result = await this.measurementRepository.createMeasurements(data);

    const response = result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));

    return response;
  }

  async getAll(): Promise<ResponseMeasurementsArrayDTOType> {
    const result = await this.measurementRepository.findAll();
    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }

  async getByIoTDevice(id: string): Promise<ResponseMeasurementsArrayDTOType> {
    const result = await this.measurementRepository.findByIoTDevice(id);
    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }

  async getMeasurementsByTimestamp(params: MeasurementTimestampDTOType) {
    const { id_esp, timestampInit, timestampEnd } = params;

    const paramsToDb: Partial<MeasurementTimestamp> = {
      id_esp,
      timestampInit: timestampInit ? new Date(timestampInit) : undefined,
      timestampEnd: timestampEnd ? new Date(timestampEnd) : undefined,
    };

    const result = await this.measurementRepository.findByTimestamp(paramsToDb);

    return result.map((item) => ({
      ...item,
      measurement_time: item.measurement_time.toISOString(),
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));
  }
}

export default MeasurementService;

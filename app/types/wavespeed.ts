export interface WaveSpeedModel {
  model_id: string;
  name: string;
  base_price: number;
  description: string;
  type: string;
  api_schema?: {
    api_schemas?: any[];
  };
}

export interface WaveSpeedResponse<T> {
  code: number;
  message: string;
  data: T;
}

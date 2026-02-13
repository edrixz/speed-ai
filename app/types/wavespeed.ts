// app/types/wavespeed.ts

// Định nghĩa tham số trong JSON Schema (để dùng cho Dynamic Form sau này)
export interface WaveSpeedSchemaParam {
  type: string;
  description?: string;
  default?: any;
  enum?: any[];
  minimum?: number;
  maximum?: number;
  [key: string]: any;
}

// Định nghĩa cấu trúc API của từng model
export interface WaveSpeedApiSchema {
  type: string; // e.g., "model_run"
  method: string; // e.g., "POST"
  server: string; // e.g., "https://api.wavespeed.ai"
  api_path: string; // e.g., "/api/v3/wavespeed-ai/flux-dev"
  request_schema?: {
    properties: Record<string, WaveSpeedSchemaParam>;
    required?: string[];
  };
}

// Định nghĩa Model Object chuẩn theo Docs
export interface WaveSpeedModel {
  model_id: string; // "wavespeed-ai/hunyuan-video/t2v"
  name: string; // "wavespeed-ai/hunyuan-video/t2v"
  base_price: number; // 0.4
  description: string; // "The advanced text-to-video model..."
  type: string; // "text-to-video", "text-to-image", v.v.
  api_schema?: {
    api_schemas?: WaveSpeedApiSchema[];
  };
}

// Định nghĩa Response chuẩn
export interface WaveSpeedResponse<T> {
  code: number; // 200
  message: string; // "success"
  data: T;
}

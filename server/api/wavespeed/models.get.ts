// server/api/wavespeed/models.get.ts
import type { WaveSpeedResponse, WaveSpeedModel } from "~/types/wavespeed";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // 1. Kiểm tra API Key có tồn tại không
  if (!config.wavespeedApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Server Config Error: Missing WaveSpeed API Key",
    });
  }

  try {
    // 2. Gọi API chuẩn theo tài liệu: GET /api/v3/models
    const response = await $fetch<WaveSpeedResponse<WaveSpeedModel[]>>(
      "https://api.wavespeed.ai/api/v3/models",
      {
        headers: {
          Authorization: `Bearer ${config.wavespeedApiKey}`, // Chuẩn Bearer Token
          "Content-Type": "application/json",
        },
      },
    );

    // 3. Trả về nguyên vẹn response
    return response;
  } catch (error: any) {
    console.error("WaveSpeed API Error:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: "Failed to fetch models from WaveSpeed",
      data: error?.data, // Trả về chi tiết lỗi từ WaveSpeed nếu có
    });
  }
});

// server/api/wavespeed/run.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  // Body gửi lên sẽ gồm:
  // - url: Endpoint của model (ví dụ: /api/v3/wavespeed-ai/flux-dev)
  // - method: POST/GET
  // - payload: Các tham số (prompt, size,...)

  if (!config.wavespeedApiKey) {
    throw createError({ statusCode: 500, statusMessage: "Missing API Key" });
  }

  try {
    // Gọi sang WaveSpeed
    const response = await $fetch(`https://api.wavespeed.ai${body.url}`, {
      method: body.method || "POST",
      headers: {
        Authorization: `Bearer ${config.wavespeedApiKey}`,
        "Content-Type": "application/json",
      },
      body: body.payload,
    });

    return response;
  } catch (error: any) {
    console.error("Run Model Error:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || "Failed to run model",
      data: error?.data,
    });
  }
});

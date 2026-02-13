// server/api/models.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch("https://api.wavespeed.ai/api/v3/models", {
      headers: {
        Authorization: `Bearer ${config.wavespeedApiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch WaveSpeed models",
    });
  }
});

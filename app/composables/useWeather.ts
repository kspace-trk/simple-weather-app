export const useWeather = () => {
  const config = useRuntimeConfig()
  const tokyoWeather = ref<WeatherAPI>()

  const getTokyoWeather = async (): Promise<void> => {
    tokyoWeather.value = await $fetch<WeatherAPI>(`${config.public.baseURL}/api/forecast/city/130010`)
  }

  return {
    tokyoWeather,
    getTokyoWeather
  }
}

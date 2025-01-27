export const useWeather = () => {
  const config = useRuntimeConfig()
  const tokyoWeather = ref<WeatherAPI>()
  const todayTokyoWeather = ref<Forecast>()

  const getTokyoWeather = async (): Promise<void> => {
    tokyoWeather.value = await $fetch<WeatherAPI>(`${config.public.baseURL}/api/forecast/city/130010`)
    todayTokyoWeather.value = tokyoWeather.value.forecasts[0]
  }

  return {
    tokyoWeather,
    todayTokyoWeather,
    getTokyoWeather
  }
}

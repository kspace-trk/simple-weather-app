export const useWeather = () => {
  const tokyoWeather = ref<WeatherAPI>()

  const getTokyoWeather = async (): Promise<void> => {
    tokyoWeather.value = await $fetch<WeatherAPI>('https://weather.tsukumijima.net/api/forecast/city/130010')
  }

  return {
    tokyoWeather,
    getTokyoWeather
  }
}

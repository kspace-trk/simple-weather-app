export const useWeather = () => {
  const config = useRuntimeConfig()
  const tokyoWeather = ref<WeatherAPI>()
  const todayTokyoWeather = ref<Forecast>()

  const getTokyoWeather = async (): Promise<void> => {
    tokyoWeather.value = await $fetch<WeatherAPI>(`${config.public.baseURL}/api/forecast/city/130010`)
    todayTokyoWeather.value = tokyoWeather.value.forecasts[0]
  }

  const calcMaxRainChance = (forecast: Ref<Forecast> | undefined): string => {
    if (!forecast) return '--%'

    const chances = [
      forecast.value.chanceOfRain.T00_06,
      forecast.value.chanceOfRain.T06_12,
      forecast.value.chanceOfRain.T12_18,
      forecast.value.chanceOfRain.T18_24
    ]

    // すべての値が'--%'の場合は'--%'を返す
    if (chances.every(chance => chance === '--%')) {
      return '--%'
    }

    // 数値に変換可能な値のみを抽出して最大値を求める
    const maxChance = Math.max(...chances
      .map(chance => parseInt(chance))
      .filter(num => !isNaN(num)))

    return `${maxChance}%`
  }

  return {
    tokyoWeather,
    todayTokyoWeather,
    getTokyoWeather,
    calcMaxRainChance
  }
}

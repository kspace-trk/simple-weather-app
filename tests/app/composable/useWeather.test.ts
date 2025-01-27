import { describe, test, expect, vi } from 'vitest'
import { useWeather } from '~/composables/useWeather'
import { registerEndpoint } from '@nuxt/test-utils/runtime'

describe('useWeather composable', () => {
  test('getTokyoWeather関数は東京の天気情報を取得する', async () => {
    const mockWeatherData = {
      title: '東京都 東京 の天気',
      forecasts: [
        {
          date: '2024-01-01',
          telop: '晴れ'
        }
      ]
    }

    // APIレスポンスのモック化
    registerEndpoint('/api/forecast/city/130010', () => (mockWeatherData))

    const { tokyoWeather, getTokyoWeather } = useWeather()

    // 初期値はundefined
    expect(tokyoWeather.value).toBeUndefined()

    // 天気情報を取得
    await getTokyoWeather()

    // モックデータが正しくセットされていることを確認
    expect(tokyoWeather.value).toEqual(mockWeatherData)
  })
})

import { describe, test, expect, vi } from 'vitest'
import { useWeather } from '~/composables/useWeather'
import { registerEndpoint } from '@nuxt/test-utils/runtime'

describe('useWeather composable', () => {
  const mockWeatherData: WeatherAPI = {
    publicTime: '2024-01-01T11:00:00+09:00',
    publicTimeFormatted: '2024/01/01 11:00:00',
    publishingOffice: '気象庁',
    title: '東京都 東京 の天気',
    link: 'https://weather.tsukumijima.net/forecast/city/130010',
    description: {
      publicTime: '2024-01-01T11:00:00+09:00',
      publicTimeFormatted: '2024/01/01 11:00:00',
      headlineText: '特に注意すべき事項はありません。',
      bodyText: '東京地方は、高気圧に覆われて晴れています。',
      text: '東京地方は、高気圧に覆われて晴れています。'
    },
    forecasts: [
      {
        date: '2024-01-01',
        dateLabel: '今日',
        telop: '晴れ',
        detail: {
          weather: '晴れ',
          wind: '北の風',
          wave: '0.5メートル'
        },
        temperature: {
          min: {
            celsius: '12',
            fahrenheit: '53.6'
          },
          max: {
            celsius: '24',
            fahrenheit: '75.2'
          }
        },
        chanceOfRain: {
          T00_06: '10%',
          T06_12: '10%',
          T12_18: '10%',
          T18_24: '10%'
        },
        image: {
          title: '晴れ',
          url: 'https://weather.tsukumijima.net/assets/images/sunny.png',
          width: 80,
          height: 80
        }
      }
    ],
    location: {
      area: '関東',
      prefecture: '東京都',
      district: '東京地方',
      city: '東京'
    },
    copyright: {
      title: '気象庁 Japan Meteorological Agency',
      link: 'https://www.jma.go.jp/jma/',
      image: {
        title: '気象庁',
        link: 'https://www.jma.go.jp/jma/',
        url: 'https://www.jma.go.jp/assets/images/logo.png',
        width: 120,
        height: 30
      },
      provider: [
        {
          link: 'https://weather.tsukumijima.net/',
          name: '天気予報 API（livedoor 天気互換）',
          note: 'こちらはlivedoor 天気互換APIです。'
        }
      ]
    }
  }

  test('getTokyoWeather関数は東京の天気情報を取得する', async () => {
    // APIレスポンスのモック化
    registerEndpoint('/api/forecast/city/130010', () => (mockWeatherData))

    const { tokyoWeather, todayTokyoWeather, getTokyoWeather } = useWeather()

    // 初期値はundefined
    expect(tokyoWeather.value).toBeUndefined()
    expect(todayTokyoWeather.value).toBeUndefined()

    // 天気情報を取得
    await getTokyoWeather()

    // モックデータが正しくセットされていることを確認
    expect(tokyoWeather.value).toEqual(mockWeatherData)
    expect(todayTokyoWeather.value).toEqual(mockWeatherData.forecasts[0])
  })

  describe('calcMaxRainChance関数', () => {
    const { calcMaxRainChance } = useWeather()

    test('引数がundefinedの場合は--%を返す', () => {
      expect(calcMaxRainChance(undefined)).toBe('--%')
    })

    test('すべての時間帯が--%の場合は--%を返す', () => {
      const forecast = ref<Forecast>({
        ...mockWeatherData.forecasts[0]!,
        chanceOfRain: {
          T00_06: '--%',
          T06_12: '--%',
          T12_18: '--%',
          T18_24: '--%'
        }
      })
      expect(calcMaxRainChance(forecast)).toBe('--%')
    })

    test('すべての時間帯が同じ確率の場合はその値を返す', () => {
      const forecast = ref<Forecast>({
        ...mockWeatherData.forecasts[0]!,
        chanceOfRain: {
          T00_06: '30%',
          T06_12: '30%',
          T12_18: '30%',
          T18_24: '30%'
        }
      })
      expect(calcMaxRainChance(forecast)).toBe('30%')
    })

    test('異なる確率が混在する場合は最大値を返す', () => {
      const forecast = ref<Forecast>({
        ...mockWeatherData.forecasts[0]!,
        chanceOfRain: {
          T00_06: '10%',
          T06_12: '50%',
          T12_18: '30%',
          T18_24: '20%'
        }
      })
      expect(calcMaxRainChance(forecast)).toBe('50%')
    })

    test('--%と数値が混在する場合は数値の最大値を返す', () => {
      const forecast = ref<Forecast>({
        ...mockWeatherData.forecasts[0]!,
        chanceOfRain: {
          T00_06: '--%',
          T06_12: '40%',
          T12_18: '--%',
          T18_24: '20%'
        }
      })
      expect(calcMaxRainChance(forecast)).toBe('40%')
    })
  })
})

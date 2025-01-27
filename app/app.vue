<script setup lang="ts">
const { todayTokyoWeather, getTokyoWeather, calcMaxRainChance } = useWeather()

await getTokyoWeather()

if (!todayTokyoWeather.value) {
  throw new Error('天気情報の取得に失敗しました')
}

console.log('今日の東京の天気:', todayTokyoWeather.value)
console.log('最高降水確率:', calcMaxRainChance(todayTokyoWeather))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <div class="space-y-8">
        <!-- 天気情報カード -->
        <UCard class="text-center">
          <div class="space-y-4">
            <div class="text-lg text-gray-500 dark:text-gray-400">東京</div>
            
            <div class="flex justify-center">
              <UIcon name="i-heroicons-sun-20-solid" class="w-24 h-24 text-yellow-400" />
            </div>

            <div class="text-4xl font-bold">24°C</div>
            
            <div class="text-gray-600 dark:text-gray-300">晴れ</div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">風速</div>
                <div class="font-medium">3m/s</div>
              </div>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">降水確率</div>
                <div class="font-medium">10%</div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- 更新ボタン -->
        <div class="text-center">
          <UButton 
            icon="i-heroicons-arrow-path-20-solid"
            color="gray" 
            variant="ghost"
            label="更新" 
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

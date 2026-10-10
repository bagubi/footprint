import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCountStore = defineStore("count", () => {
  // state
  const sum = ref(6);
  const caffeineLevel = ref(60);
  const bugCount = ref(99);
  const moodLevel = ref("good");

  // getters
  const bigSum = computed(() => sum.value * 10);
  const uppermoodLevel = computed(() => moodLevel.value.toUpperCase());

  // actions
  function increment(value: number) {
    if (sum.value < 15) {
      sum.value += value;
    }
  }

  function decrement(value: number) {
    sum.value -= value;
  }

  return {
    sum,
    caffeineLevel,
    bugCount,
    moodLevel,
    bigSum,
    uppermoodLevel,
    increment,
    decrement,
  };
});

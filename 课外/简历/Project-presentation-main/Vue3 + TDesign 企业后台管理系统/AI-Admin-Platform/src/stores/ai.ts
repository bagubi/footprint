// src/stores/ai.ts---AI 历史记录
import { defineStore } from "pinia";
import { ref } from "vue";

export interface AiQaItem {
  id: number;
  question: string;
  answer: string;
  time: string;
}

export const useAiStore = defineStore("ai", () => {
  const qaHistory = ref<AiQaItem[]>([]);
  const weeklyReport = ref("");

  function addQa(item: Omit<AiQaItem, "id" | "time">) {
    qaHistory.value.unshift({
      ...item,
      id: Date.now(),
      time: new Date().toLocaleString(),
    });
  }

  function setWeeklyReport(text: string) {
    weeklyReport.value = text;
  }

  return { qaHistory, weeklyReport, addQa, setWeeklyReport };
});

<template>
  <div class="box">
    <h4>子组件</h4>
    <input
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
}
</style>

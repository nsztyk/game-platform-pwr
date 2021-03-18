<template>
  <label :for="id" class="mb-1">{{ labelText }}</label>
  <input
    class="bg-transparent border-b-2 outline-none pb-1 font-normal mb-6"
    :type="type"
    :name="id"
    :id="id"
    :placeholder="placeholderText"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

enum inputType {
  password = "password",
  text = "text",
}

export default defineComponent({
  name: "FormInput",
  props: {
    modelValue: {
      type: String,
    },
    type: {
      type: String as PropType<inputType>,
      required: true,
      // Todo delete validator ?
      validator: (value: inputType) => !!inputType[value],
    },
    labelText: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      required: true,
    },
  },
});
</script>

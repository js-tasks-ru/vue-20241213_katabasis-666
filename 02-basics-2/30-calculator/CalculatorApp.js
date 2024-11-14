import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref('')
    const secondOperand = ref('')
    let result = ref('')

    const sum = () => {
      result.value = firstOperand.value + secondOperand.value
      clearInput()
    }
    const subtract = () => {
      result.value = firstOperand.value - secondOperand.value
      clearInput()
    }

    const multiply = () => {
      result.value = firstOperand.value * secondOperand.value
      clearInput()
    }

    const divide = () => {
      result.value = firstOperand.value / secondOperand.value
      clearInput()
    }

    const clearInput = () => {
      firstOperand.value = ''
      secondOperand.value = ''
    }

    return {
      firstOperand,
      secondOperand,
      sum,
      result,
      subtract,
      multiply,
      divide,
      clearInput,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input @click="sum" type="radio" name="operator" value="sum"/>➕</label>
        <label><input @click ="subtract" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input @click="multiply" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input @click="divide" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})


<template>
  <div>

    <div> APP.vue文件的内容</div>
    <div>App.vue person:{{ message }}</div>
    <SetUpCom ref="setUpComRef" :modelValue="message" @update:modelValue="updateModelValue"></SetUpCom>
    <NoSetUpCom ref="noSetUpComRef"></NoSetUpCom>
    <hr />
    <CustomInput v-model="message"></CustomInput>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import SetUpCom from './components/SetUpCom.vue';
import CustomInput from './components/CustomInput.vue'
import NoSetUpCom from './components/NoSetUpCom.vue';
import { ref, reactive, onMounted } from 'vue'

const setUpComRef = ref(null)
const noSetUpComRef = ref(null)
const listData = ref([])
//js生成随机字符串
function randomString(len: number) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
// @ts-ignore
listData.value = Array.from({
  length: 3
}, (_, index) => {
  return {
    index: index,
    name: randomString(10), //
    element: _,
  }
})

onMounted(() => {
  console.log("setUpComRef", setUpComRef.value);
  console.log("noSetUpComRef", noSetUpComRef.value);
})
let message = reactive({
  name: "张三",
  age: 18
})

// let person=ref("hello")

function updateModelValue(newValue: any) {
  message.name = newValue
}
// const person=ref("hello")
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

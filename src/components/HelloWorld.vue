
<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  <a-upload v-model="fileList" @preview="handlePreview"></a-upload>
  <a-space>
    <a-button v-for="(btn) in localImageNames" @click="handleBtnClick(btn)">{{ btn }}</a-button>
    <a-image :src="currentLocalImage"></a-image>
  </a-space>
  <img src="../assets/a.png">
  <img src="" id="hero-image">
  <a-divider></a-divider>


<div style="border: 2px dotted green;">
  <div style="margin-top: 20px;height: 100px; border: 2px solid red;">
    
  </div>
</div>
</template>

<script setup lang="ts">

import { UploadFile } from 'ant-design-vue/es/upload/interface';
import { ref, onMounted, computed, watch, watchEffect, reactive } from 'vue'

import * as _ from 'lodash-es'
import { debounce } from 'lodash-es'
// import aImagePath from '/src/assets/a.png'
// console.log("aImagePath", aImagePath);
console.log("debounce", _.debounce)

function a(name: string) {
  import(`../assets/${name}.jpg`).then(res => {
    console.log("res", res);
    currentLocalImage.value = res.default
  })
}
// import hellowordcss from  "/src/assets/css/helloword.css"

// console.log("hellowordcss",hellowordcss);//导入完成的内容g
import style from "/src/assets/css/helloword.css?inline"
import { Item } from 'ant-design-vue/es/menu';
console.log("style", style);//导入完成的内容g



const props = defineProps({
  msg: String,
  count: Number,
  item: {
    type: Object,
    default: () => ({})
  }
})

// const props=defineProps(['msg','count'])
// defineProps({
//   msg: String,
//   count: Number
// })

const fileList = ref([])
const imageUrl = ref("")
const localImageNames = ref<string[]>(['a', 'b', 'c', 'd'])
const sentinelsRef = ref()
let pageSize = 20;
let page = 0;
interface ImageItem {
  // 添加索引签名
  [key: string]: any;
  id: string;
}
let imageList = ref<ImageItem[]>([])
const currentLocalImage = ref<string>("")

const count = ref(0)
const imagesListComputed = computed(() => {
  const rows = []
  for (let i = 0; i < imageList.value.length; i += 3) {
    rows.push(imageList.value.slice(i, i + 3))
  }
  return rows;

})

function handlePreview(file: UploadFile<any>) {
  console.log(file);
}
onMounted(() => {
  console.log("onMounted", this)
  // fetch("https://source.unsplash.com/random/?people").then(res => {
  //   console.log(res)
  //   imageUrl.value = res.url
  // })

  // document.getElementById('hero-image').src=aImagePath;

  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      /**
       *  当目标元素出现在视图内
       */
      if (entry.isIntersecting) {
        //load新的数据
        console.log("load新的数据");
        fetch(`https://api.unsplash.com/search/photos?query=dog&client_id=88ozHtaLmSdwzi6N3sUvx2AjM9GSPXumFY2mGwEiQ2w&per_page=${pageSize}&page=${page}`)
          .then(res => res.json()).then(data => {
            for (let item of (data.results as ImageItem[])) {
              //imageList.value.push(item)
            }
          })
      }
    }
  }, {
    threshold: 0.5
  })
  //获取dom元素
  //第一个问题 vue中能够使用document吗？  可以
  //第二个问题 ref如何得到dom对象？ ref可以用在dom元素上吗？ 
  // console.log("sentinelsRef.value",sentinelsRef.value)
  // console.log("document.getElementById('sentinels')",document.getElementById('sentinels'))
  //observer.observe(sentinelsRef.value)

})

function handleBtnClick(btn: string) {

  //  let url= new URL(`../assets/${btn}.jpg`,import.meta.url)
  //  console.log("url",url);
  //  currentLocalImage.value=url.href

  console.log("btn", btn);

}


// const student = reactive({
//   name: "张三",
//   age: 18,
//   address: {
//     city: "北京"
//   }
// })

interface Item {
  [key: string]: any
}
const student = reactive<Item[]>([{
  name: "张三",
  age: 18,
  address: {
    city: "北京"
  }
}, {}, {}, {
}])
function changeCity() {
  //写法一：下面的写法不能触发wattchEffect
  // student.address.city = Math.random().toString(36).slice(2)
  //写法二：下面的写法可以触发wattchEffect
  // student.address={
  //   city: Math.random().toString(36).slice(2)
  // }
  // student.push({
  //   name: Math.random().toString(36).slice(2),
  //   age: 18,
  // })
  student[0].name = Math.random().toString(36).slice(2) 
  console.log(student);
}
watchEffect((onCleanup) => {
  onCleanup(() => {
    console.log("onCleanup");
  })
  console.log("watchEffect,", student[0].name);

})

// watch(props.item, _.debounce((newVal, oldVal) => {
//   console.log("props.item", props.item);
//   console.log("newVal", newVal);
//   console.log("oldVal", oldVal);
// },1000), {
//   deep: true,
//   immediate: true
// })





</script>



<style scoped >
.read-the-docs {
  color: #888;
}

.sentinels {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border: 2px solid red;
}
</style>

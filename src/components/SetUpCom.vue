<template>
    <div>this is a setup component</div>

    <div>
        <div v-for="(item, index ) in dataSource">
            <a-row>
                <a-col :span="8">{{ item.number }}</a-col>
                <a-col :span="8">{{ item.age }}</a-col>
                <a-col :span="8">{{ computedFunc(item) }}</a-col>
            </a-row>
        </div>
        <a-button @click="clickFunc"></a-button>

        <input v-model="computedModelValue.name" />
    </div>
</template>


<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

const dataSource = ref([
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        number: 2,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        number: 3,
        address: '西湖区湖底公园1号',
    },
])
const columns = ref([
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '个数',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: '计算结果',

        key: 'computedRes',
    },
])

const dataObj = {
    key: '2',
    name: '胡彦祖',
    age: 42,
    number: 3,
    address: '西湖区湖底公园1号',
};
function computedRes(item: typeof dataObj) {
    return item.age * item.number
}


const computedFunc = computed(() => {
    console.log("计算属性重新计算");

    return function (item: typeof dataObj) {
        console.log("开始计算item", item);

        return item.age * item.number
    }
})

function clickFunc() {
    //随机生成 0或1

    const randomNum = Math.random();
    const result = Math.round(randomNum);

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    dataSource.value[result].number = randomNumber;
    console.log("随机修改的数据", result, randomNumber);

}
const count = ref(0)
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

onMounted(() => {
    const modelValue = console.log("modelValue", props.modelValue);
})

// @ts-ignore

function changed(event) {



    debugger
    console.log("modelValue", props.modelValue);

    emits('update:modelValue', event.target.value)
}

const computedModelValue=computed({
    get() {
        //modelValue可能是父组件v-model绑定到的reactive创建的代理对象，也可能是绑定的ref解包后的值类型
       let modelValueProxy= new Proxy(props.modelValue, {
            get(target, key, receiver) {
               
                return Reflect.get(target, key, receiver)
            },
            // @ts-ignore
            set(target, key, value, receiver) {
                // 这里不直接修改props中的modelValue对象中的属性的值，而是通过emits触发父组件的update:modelValue事件，由父组件修改modelValue对象中的属性的值
                //return Reflect.set(target, key, value, receiver)
                emits('update:modelValue', value)
            }
        })

        return modelValueProxy;
    },
    set(value) {
        console.log("触发计算属性的set方法执行");
        emits('update:modelValue', value)
    }
})
</script>
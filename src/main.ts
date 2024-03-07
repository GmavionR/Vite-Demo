import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import "./namespace/index"

import Antd from 'ant-design-vue'


var app = createApp(App) 
app.use(Antd)

app.mount("#app")






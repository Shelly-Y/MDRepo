// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import echarts from 'echarts'
import axios from 'axios';
Vue.prototype.$axios = axios;

import "babel-polyfill"
// 引用bootstrap
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'




/*引入下面三行*/
import {Tabs,TabPane, Collapse, CollapseItem, Row, Col,Divider,Button,ButtonGroup, Radio,RadioGroup,RadioButton} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Divider);
Vue.use(ButtonGroup);
Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

<template>
<div>
<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="语音业务质量分析" name="first">

    <div class="connect">
        <Connect></Connect>
         </div>
     <div class="business">
        <Business></Business>
         </div>

    </el-tab-pane>

    <el-tab-pane label="语音业务质量列表" name="second"></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Connect from '../components/Connect'
import Business from '../components/Business'
  export default {
    name:'Home',
    components:{
      Connect,
      Business,
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>






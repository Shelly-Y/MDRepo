<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',
  components:{

  }
}
</script>

<style>
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;

}

/* 导航栏头部 */
.el-tabs__item{
  height: 30px;
  line-height: 20px;
  font-size: 13px;
   padding-top: 5px;
   padding-right: 15px;
   padding-bottom: 0px;
   padding-left: 15px;
}
/* 导航活跃颜色 */
.el-tabs__item.is-active{
  color: #54A7FF
}

/* 折叠区头部颜色字体及背景色 */
.el-collapse-item__header{
  color: #54A7FF;
  font-weight:650;
background-color: #F3F3F3;
padding-left: 15px;
}

/* 折叠区背景色及位置*/
.el-collapse-item__wrap{
  background-color: #F3F3F3;
  padding-left: 15px;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding-left: 15px;
}

.connect{
  margin-left: auto;
   padding-top: 0px;
   padding-right: 15px;
   padding-bottom: 15px;
   padding-left: 15px;
}
.business{
  margin-left: auto;
   padding-top: 0px;
   padding-right: 15px;
   padding-bottom: 15px;
   padding-left: 15px;
}

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /* 时间控件 */
  .Wdate{
    border:1px solid white;
    width: 63%;
    height: 5%;
  }

/* 按钮 */
.el-button{
  padding: 6px 35px;
  font-size: 14px;
  font-weight: 550;
}

.el-button--default{
  border: 1px solid#409EFF;
  color: #409EFF;
}

/* 按钮组 */
.el-radio-button__inner{
  border: 1px solid white;
  color:#54A7FF;
  font-weight: 550;
  padding: 10px 16px;
    font-size: 12px;
}

/* 单选⚪框标签设置 */
.el-radio__label{
  font-size: 12px;
  color:#606266;
}

/* 单选⚪框设置 */
.el-radio__inner {
    border: 1px solid #409EFF;
    border-radius: 100%;
    width: 12px;
    height: 12px;
    background-color: #FFF;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 10px;
}

/* 时间控件前: 选择开始时间和结束时间 */
.time-pre{
   padding-right: 6%;
   font-size: 11px;
   color:	#999999;
}
/* 时间控件input 字体大小和颜色*/
  input {
    color:  #54A7FF;
    font-size: 10.3333px;
  }

</style>



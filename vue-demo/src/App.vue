<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/Home'
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

.el-tabs__item{
  height: 30px;
  line-height: 20px;
  font-size: 10px;
   padding-top: 5px;
   padding-right: 15px;
   padding-bottom: 0px;
   padding-left: 15px;
}
.el-tabs__item.is-active{
  color: #54A7FF
}
.el-collapse-item__header{
  color: #54A7FF;
  font-weight:650;
background-color: #F3F3F3;
padding-left: 15px;
}
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
  .Wdate{
    border:1px solid white;
    width: 63%;
    height: 5%;

  }
  input {
    color:  #54A7FF;
    font-size: 8.3333px;

  }
.el-button{
  padding: 6px 35px;
  font-size: 14px;
  font-weight: 550;

}
.el-button--default{
  border: 1px solid#409EFF;
  color: #409EFF;
}
.spans{
   padding-right: 6%;
   font-size: 11px;
   color:	#999999;
}

</style>



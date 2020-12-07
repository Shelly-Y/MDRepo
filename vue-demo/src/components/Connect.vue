<!-- 接通率展现组件 -->
<template>
  <el-collapse v-model="conn" @change="handleChange">
  <el-collapse-item>
 <!-- 折叠区头部 svg内加入蓝色小方块-->
 <template slot="title"><span style="padding-right: 8px"><svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-stop-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
</svg></span> 接通率展现</template>

  <!-- 折叠区内容 第一列时间控件板块 -->
  <div class="column1">
     <!-- 时间选择 使用插件My97TimePicker 设置只读和选择，不可输入 -->
   <div style="padding-top: 4px"><span class = "time-pre" >选择开始时间</span> <input id="startTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true});" /></div>
   <div style="padding-top: 6px"><span class = "time-pre" >选择结束时间</span> <input id="endTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true,startDate:'#F{$dp.$D(\'startTime\',{d:+1})}'})" /></div>
   <div style="padding-top: 60px"> <el-button type="primary" @click="getEchartData()">分 析</el-button> <span style="padding-left: 15%"><el-button @click="clean()">重 置</el-button></span></div>
  </div>
 <!-- 折叠区内容 第二列 分隔线 -->
  <div class="column2"><el-divider id = "divider1" direction="vertical" ></el-divider></div>
   <!-- 折叠区内容 第三列 圆环图1 -->
  <div class="column3">
    <div id="echart1" ref="chart1" style="padding-top: 6px;width:130px;height:130px"></div>
    </div>
  <!-- 折叠区内容 第四列 文本 -->
  <div class="column4">
    <div > 呼叫成功率分析 <br></div>
      <div class ="talkbubble">
        系统呼叫成功总数<span style="color:blue;font-size:10%;"> {{echart1.callAll}} </span>次，<br>
        主叫<span style="color:blue;">{{echart1.mainCall}} </span>次，主叫接通率<span >{{echart1.mainRate}}</span>，设备正常。<br>
        被叫<span >{{echart1.called}} </span>次，呼叫成功率<span >{{echart1.calledRate}}</span>，设备正常。<br>
        </div>
    </div>
   <!-- 折叠区内容 第五列 圆环图2 -->
<div class = "column5">
 <div id="echart2" ref="chart2"  style="padding-top: 6px;;width: 130px;height: 130px"> </div>
</div>

    <!-- 折叠区内容 第六列 文本 -->
  <div class = "column6" >
       <div > 呼叫成功率分析</div>
        <div class ="talkbubble">
        系统试呼总数<span >{{echart2.tryAll}} </span>次，<br>
        呼叫成功<span >{{echart2.successCall}} </span>次，呼叫成功率<span>{{echart2.successRate}}</span>，设备正常。<br>
        呼叫失败<span >{{echart2.failCall}} </span>次，呼叫失败率<span>{{echart2.failRate}}</span>，<a href="url">查看失败原因</a>。<br>
        </div>
    </div>
  </el-collapse-item>
  </el-collapse>
</template>


<script>
import axios from 'axios';
let echarts = require('echarts');
  export default {
    name:'Connect',
    data() {
      return {
      conn: ['1'], //默认闭合

   //圆环图1文本区数据
     echart1:{
      callAll:'',  //系统总呼叫成功数
      mainCall:'', // 主叫数
      mainRate:'', // 主叫成功率
      called:'',   // 被叫数
      calledRate:'', // 被叫成功率
     },
    //圆环图2文本区数据
     echart2:{
      tryAll:'',  // 系统试呼总数
      successCall:'', // 试呼成功数
      successRate:'',   // 试呼成功率
      failCall:'',    // 试呼失败数
      failRate:'',   // 试呼失败率
     },
     // 圆环图1 初始化参数设置
       option1 :{
          tooltip: {
        trigger: 'none',
        fontSize:'10',
        formatter: '({d}%)'
    },

    legend: {
        right:"28%",
        top:"30%",
        fontSize:"8",
        icon:"circle",
    },
      color: ["#03DDEB","#F2BA0F"],

    series: [
        {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,

            label: {
                show: true,
                position: 'inner',
                formatter: '{d}%',
                textStyle:{
                  fontSize:"8",
                  fontWight:400,
                }
            },
            data: []
        }
    ]
    },

    // 圆环图2初始化参数设置
     option2: {
          tooltip: {
        trigger: 'none',
        fontSize:'10',
        formatter: '({d}%)'
    },

    legend: {
        right:"20%",
        top:"30%",
        fontSize:"8",
        icon:"circle",

    },

    color: ["#008FFF","#FF7723"],

    series: [
        {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,

            label: {
                show: true,
                position: 'inner',
                formatter: '{d}%',
                textStyle:{
                  fontSize:"8",
                  fontWight:500,
                }
            },
            data: []
        }]
    },
    };
    },
    computed:{

    },
mounted() {
    //this.getEchartData();
//this.getBigObj();
  },
    methods: {
      handleChange(val) {
        console.log(val);
      },

    /**
     * 重置时间及图数据为空
     */
     clean(){
       Object.assign(this.$data,this.$options.data());
     $('#startTime').val('');
       $('#endTime').val('');
       let chart1 = this.$refs.chart1;
       let chart2 = this.$refs.chart2;
        let myChart1 = this.$echarts.init(chart1);
        let myChart2 = this.$echarts.init(chart2);
     myChart1.setOption(this.option1);
     myChart2.setOption(this.option2);
     },

/**
 * 获取圆环图方法
 */
      getEchartData() {
  let chart1 = this.$refs.chart1;
  let chart2 = this.$refs.chart2;

    if (chart1) {

      // 初始化图
        let myChart1 = this.$echarts.init(chart1);
        let myChart2 = this.$echarts.init(chart2);

     myChart1.setOption(this.option1);
     myChart2.setOption(this.option2);

/**
 * 获取json数据
 {
"data0":[{"name":"主叫","value": "9548120"},
        {"name":"被叫","value": "4109080"}],
"data1":[
         {"name":"呼叫成功","value":"10909200"},
         {"name":"呼叫失败","value":"1090800"}]
}

{
"echart1":{"callAll":"13657200","mainCall": "9548120","called": "4109080","mainRate":"69.91%","callRate":"30.09%"},
"echart2":{"tryAll":"12000000","successCall":"10909200","failCall":"1090800","successRate":"90.91%","failRate":"9.09%"}
}

 */
debugger
    axios.get('../../static/connect.json').then((res) => {
     let echart1=res.data.echart1;
     let echart2=res.data.echart2;
     let datalist0=[];
     let datalist1=[];

      this.echart1.callAll = echart1.callAll;
      this.echart1.mainCall = echart1.mainCall;
      this.echart1.called = echart1.called;
      this.echart1.mainRate = echart1.mainRate;
      this.echart1.calledRate = echart1.calledRate;

      this.echart2.tryAll = echart2.tryAll;
      this.echart2.successCall = echart2.successCall;
      this.echart2.failCall = echart2.failCall;
      this.echart2.failRate = echart2.failRate;
      this.echart2.successRate = echart2.successRate;

      let nameList1=["主叫","被叫"];
      let nameList2=["呼叫成功","呼叫失败"];
for(let i=0;i<nameList1.length;i++){
 let m1={},m2={};
 if (nameList1[i]=="主叫"){
 m1["name"] = nameList1[i];
 m1["value"] = echart1.mainCall;
 m2["name"] = nameList2[i];
 m2["value"] = echart2.successCall;
  datalist0.push(m1);
  datalist1.push(m2);
 }
  if (nameList1[i]=="被叫"){
 m1["name"] = nameList1[i];
 m1["value"] = echart1.called;
 m2["name"] = nameList2[i];
 m2["value"] = echart2.failCall;
  datalist0.push(m1);
  datalist1.push(m2);
 }

}
    //  for(let i=0;i<echart0.length;i++){
    //    let m1={};
    //    let m2={};
    //     m1["name"]=echart0[i].name;
    //     m2["name"]=echart1[i].name;
    //     m1["value"]=echart0[i].value;
    //     m2["value"]=echart1[i].value;
    //    if(echart0[i].name=="主叫"){
    //      this.echart1.mainCall=echart0[i].value;
    //      //console.log(echart0);
    //      this.echart1.mainRate = Math.round(parseFloat(this.echart1.mainCall) * 100/parseFloat(this.echart1.callAll)*100)/100 + '%';
    //       datalist0.push(m1);
    //      }
    //   if(echart0[i].name=="被叫"){
    //     this.echart1.called=echart0[i].value;
    //     this.echart1.calledRate = Math.round(parseFloat(this.echart1.called) * 100/parseFloat(this.echart1.callAll)*100)/100 + '%';
    //      datalist0.push(m1);
    //     }
    //     if(echart1[i].name=="呼叫成功"){
    //       this.echart2.successCall=echart1[i].value; this.echart2.successRate = Math.round(parseFloat(this.echart2.successCall) * 100/parseFloat(this.echart2.tryAll)*100)/100 + '%'
    //        datalist1.push(m2);
    //       }
    //   if(echart1[i].name=="呼叫失败"){
    //     this.echart2.fail=echart1[i].value;  this.echart2.fRate = Math.round(parseFloat(this.echart2.fail) * 100/parseFloat(this.echart2.tryAll)*100)/100 + '%'
    //      datalist0.push(m2);
    //     }
    //   }
    myChart1.setOption({
				series:{
					data:datalist0,
				}
      });
        myChart2.setOption({

				series:{
					data:datalist1,
				}
			});
      })

  }

    this.$on("hook:destroyed", () => {
   window.removeEventListener("resize", function () {
   myChart1.resize();
   myChart2.resize();
      });
      });
     },

    }
  }

</script >

<style scoped>
#divider1{
      width: 1px;
    height: 10em;
}
.column1 {
  float: left;
  width: 18%;
  padding-bottom:1.5%
}
.column2 {
  float: left;
  width: 0.33%;
}
.column3 {
  float: left;
  width: 10%;;
  padding-left:1%;
}
.column4 {
  float: left;
  width: 28%;
  padding-left:1%;
}
.column5 {
  float: left;
  width: 10%;
  padding-left:2%;
}
.column6 {
  float: left;
  width: 28%;
  padding-left:2%;
}
.talkbubble{
       background-color: white;
        width:100%;height:100%;
        border-radius: 3px;line-height: 25px;
        padding:13px;
        position: relative;
        color:	#444242;
}
.talkbubble::before {
        content:" ";
        border-left: 0px solid white;
        border-top:10px solid transparent;
        border-right:10px solid white;
        border-bottom:10px solid transparent;
        position: absolute;left:-10px;top:30px;
}


</style>

<template>
  <el-collapse v-model="conn" @change="handleChange">
  <el-collapse-item>
 <template slot="title"><span style="padding-right: 8px"><svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-stop-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
</svg></span> 接通率展现
    </template>
<div id="cvue">
  <div class="column1">
   <div style="padding-top: 4px"><span class = "spans" >选择开始时间</span> <input id="startTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true});" /></div>
   <div style="padding-top: 6px"><span class = "spans" >选择结束时间</span> <input id="endTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true,startDate:'#F{$dp.$D(\'startTime\',{d:+1})}'})" /></div>
   <div style="padding-top: 60px"> <el-button type="primary" @click="getEchartData()">分 析</el-button> <span style="padding-left: 15%"><el-button @click="clean()">重 置</el-button></span></div>
  </div>

  <div class="column2"><el-divider id = "divider1" direction="vertical" ></el-divider></div>
  <div class="column3">
    <div id="echart1" ref="chart1" style="padding-top: 6px;width:130px;height:130px"></div>
    </div>
  <div class="column4">
    <div id="head2"> 呼叫成功率分析 </div>
      <div class ="talkbubble">
        系统呼叫成功总数<span style="color:blue;font-size:10%;">{{echart1.callAll}} </span>次，<br>
        主叫<span style="color:blue;">{{echart1.mainCall}} </span>次，主叫接通率<span >{{echart1.mainRate}}</span>，设备正常。<br>
        被叫<span >{{echart1.called}} </span>次，呼叫成功率<span >{{echart1.callRate}}</span>，设备正常。<br>
        </div>
    </div>
<div class = "column5">
 <div id="echart2" ref="chart2"  style="padding-top: 6px;;width: 130px;height: 130px"> </div>
</div>

  <div class = "column6" >
       <div id="head2"> 呼叫成功率分析</div>
      <div class ="talkbubble">
        系统试呼总数<span >{{echart2.tryAll}} </span>次，<br>
        呼叫成功<span >{{echart2.success}} </span>次，呼叫成功率<span>{{echart2.sRate}}</span>，设备正常。<br>
        呼叫失败<span >{{echart2.fail}} </span>次，呼叫失败率<span>{{echart2.fRate}}</span>，<a href="url">查看失败原因</a>。<br>
        </div>
    </div>
</div>
  </el-collapse-item>
  </el-collapse>
</template>


<script >
import axios from 'axios';
var echarts = require('echarts');

  export default {

    name:'Connect',

    data() {

      return {
      conn: ['1'],

     // myDataObj:{}
     echart1:{
      callAll:'',
      mainCall:'',
      mainRate:'',
      called:'',
      callRate:'',
     },
     echart2:{
      tryAll:'',
      success:'',
      sRate:'',
      fail:'',
      fRate:'',
     },
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


            data: [

            ]
        }
    ]
    },
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

            data: [

            ]
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
     clean(){
       Object.assign(this.$data,this.$options.data());
    $('#startTime').val('');
       $('#endTime').val('');
       let chart1 = this.$refs.chart1;
       let chart2 = this.$refs.chart2;
        var myChart1 = this.$echarts.init(chart1);
        var myChart2 = this.$echarts.init(chart2);
     myChart1.setOption(this.option1);
     myChart2.setOption(this.option2);
     },


      getEchartData() {
  let chart1 = this.$refs.chart1;
  let chart2 = this.$refs.chart2;

  let a = document.getElementById(startTime);
  console.log(a);
    if (chart1) {
        var myChart1 = this.$echarts.init(chart1);
        var myChart2 = this.$echarts.init(chart2);

     myChart1.setOption(this.option1);
     myChart2.setOption(this.option2);

  axios.get('../../static/connect.json').then((conn) => {
     var d1=conn.data.data0;
     var d2=conn.data.data1;
     var datalist1=[];
     var datalist2=[];
      this.echart1.callAll = conn.data.all0.value;
      this.echart2.tryAll = conn.data.all1.value;

     for(var i=0;i<d1.length;i++){
       var m1={};
       var m2={};
        m1["name"]=d1[i].name;
        m2["name"]=d2[i].name;
        m1["value"]=d1[i].value;
        m2["value"]=d2[i].value;
       if(d1[i].name=="主叫"){
         this.echart1.mainCall=d1[i].value;
         //console.log(d1);
         this.echart1.mainRate = Math.round(parseFloat(this.echart1.mainCall) * 100/parseFloat(this.echart1.callAll)*100)/100 + '%';
          }
      if(d1[i].name=="被叫"){
        this.echart1.called=d1[i].value;
        this.echart1.callRate = Math.round(parseFloat(this.echart1.called) * 100/parseFloat(this.echart1.callAll)*100)/100 + '%';
        }
        if(d2[i].name=="呼叫成功"){
          this.echart2.success=d2[i].value; this.echart2.sRate = Math.round(parseFloat(this.echart2.success) * 100/parseFloat(this.echart2.tryAll)*100)/100 + '%' }
      if(d2[i].name=="呼叫失败"){this.echart2.fail=d2[i].value;  this.echart2.fRate = Math.round(parseFloat(this.echart2.fail) * 100/parseFloat(this.echart2.tryAll)*100)/100 + '%'}
        datalist1.push(m1);
        datalist2.push(m2);
      }
         myChart1.setOption({

				series:{
					data:datalist1,
				}
      });
        myChart2.setOption({

				series:{
					data:datalist2,
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

</script>
<style type="text/css">
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
#head2{
  padding-left: 10px;
  font-size:5%;
  color:	#292727;
}

  .bg-purple {
    background: #d3dce6;
  }
</style>

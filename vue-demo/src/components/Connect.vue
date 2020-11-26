<template>
  <el-collapse v-model="conn" @change="handleChange">
  <el-collapse-item>
 <template slot="title"><span style="padding-right: 8px"><svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-stop-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
</svg></span> 接通率展现
    </template>

  <div class="column1">
   <div style="padding-top: 4px"><span class = "spans" >选择开始时间</span> <input id="sdate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true})" /></div>
   <div style="padding-top: 6px"><span class = "spans" >选择结束时间</span> <input id="edate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true,startDate:'#F{$dp.$D(\'sdate\',{d:+1})}'})" /></div>
   <div style="padding-top: 60px"> <el-button type="primary">分 析</el-button> <span style="padding-left: 15%"><el-button>重 置</el-button></span></div>
  </div>

  <div class="column2"><el-divider id = "divider1" direction="vertical" ></el-divider></div>
  <div class="column3">
    <div ref="chart1" style="padding-top: 6px;width:130px;height:130px"></div>
    </div>
  <div class="column4">
    <div id="head2"> 呼叫成功率分析</div>
      <div class ="talkbubble">
        系统呼叫成功<br> 主叫954120次，主叫接通率65%，设备正常
        </div>
    </div>
<div class = "column5">
 <div ref="chart2"  style="padding-top: 6px;;width: 130px;height: 130px"> </div>
</div>

  <div class = "column6" >
       <div id="head2"> 呼叫成功率分析</div>
      <div class ="talkbubble">
        系统呼叫成功<br> 主叫954120次，主叫接通率65%，设备正常aaaaaa
        </div>
    </div>
  </el-collapse-item>
  </el-collapse>
</template>


<script >
var echarts = require('echarts');
  export default {

    name:'Connect',
    data() {
      return {
        conn: ['1']
      };
    },
mounted() {
    this.getEchartData();
  },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      getEchartData() {
  const chart1 = this.$refs.chart1;
  const chart2 = this.$refs.chart2;
    if (chart1) {
        const myChart1 = this.$echarts.init(chart1);
        const myChart2 = this.$echarts.init(chart2);
        const option1 = {
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
                {value: 9548120, name: '主叫'},
                {value: 4109080, name: '呼叫'},
            ]
        }
    ]
    };
    const option2= {
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
                {value: 10909200, name: '呼叫成功'},
                {value: 1090800, name: '呼叫失败'},
            ]
        }
    ]
    };
     myChart1.setOption(option1);
     myChart2.setOption(option2);
        window.addEventListener("resize", function () {
          myChart1.resize();
          myChart2.resize();
        });
  }

    this.$on("hook:destroyed", () => {
   window.removeEventListener("resize", function () {
   myChart1.resize();
   myChart2.resize();
      });
      });
     },
    },
  }

</script>
<style type="text/css">
#divider1{
      width: 1px;
    height: 10em;
}
.column1 {
  float: left;
  width: 20%;
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

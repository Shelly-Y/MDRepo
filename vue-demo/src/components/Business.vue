<template>
  <el-collapse v-model="busi" @change="handleChange">
  <el-collapse-item>
 <template slot="title"><span style="padding-right: 8px"><svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-stop-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
</svg></span> 语音业务量展现</template>

  <div class = "column1">
    <div >
  <el-radio-group v-model="tabPosition" >
    <el-radio-button label="按时"></el-radio-button>
    <el-radio-button label="按日" ></el-radio-button>
    <el-radio-button label="按月"></el-radio-button>
  </el-radio-group>
    </div >
   <div v-if="tabPosition=='按时'"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            >
   <div style="padding-top: 4px" ><span class = "spans" style="padding-right: 10px" >选择开始时间</span ><span><input id="sdate1" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日HH时',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "spans" style="padding-right: 10px">选择结束时间</span> <span ><input id="edate1" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日HH时',readOnly:true,minDate:'#F{$dp.$D(\'sdate1\')}'})" /></span></div>
 </div>
 <div v-if="tabPosition=='按日'" >
   <div style="padding-top: 4px" ><span class = "spans" style="padding-right: 10px" >选择开始时间</span ><span ><input id="sdate2"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "spans" style="padding-right: 10px">选择结束时间</span> <span ><input id="edate2" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日',readOnly:true,minDate:'#F{$dp.$D(\'sdate2\')}'})" /></span></div>
 </div>
 <div v-if="tabPosition=='按月'" >
   <div style="padding-top: 4px" ><span class = "spans" style="padding-right: 10px" >选择开始时间</span ><span ><input id="sdate3"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "spans" style="padding-right: 10px">选择结束时间</span> <span><input id="edate3" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月',onpicked:function(){$dp.$('edate3_1').value=$dp.cal.getP('y年');},readOnly:true,minDate:'#F{$dp.$D(\'sdate3\')}'})" /></span></div>
 </div>

   <template>
  <el-radio v-model="radio" label="1">显示全部数据</el-radio>
  <el-radio v-model="radio" label="2">仅显示呼叫失败数据</el-radio>e
  </template>
   <div style="padding-top: 60px"> <el-button type="primary" @click="getEchartData()">分 析</el-button> <span style="padding-left: 15%"><el-button>重 置</el-button></span></div>
  </div>
  <div class = "column2"><el-divider id = "divider2" direction="vertical" ></el-divider></div>
  <div class = "column7"><div ref="chart3" style="width: 1000px;height: 280px"></div></div>

  </el-collapse-item>
  </el-collapse>
</template>

<script>
import axios from "axios";
var echarts = require('echarts');
  export default {
    name:'Business',
    props:{

    },
    data() {
      return {
        busi: '1',
        tabPosition: '按月',
        radio: '1',
        dateFormat:'',

      };
    },
    mounted() {
    //this.getEchartData();
  },
    methods: {
      handleChange(val) {
        console.log(val);
      },

      getEchartData() {
       const chart3 = this.$refs.chart3;

        if (chart3) {
   var myChart3 = this.$echarts.init(chart3);
   var option = {
     title: {
    text: "业务量数据对比统计",
    left: "center",
    top: "top",
    textStyle: {
      fontSize: 15,
      color:'#606266',
    },
     },
        color: ['blue'],
         tooltip: {
        trigger: 'item',
        textStyle: {
      fontSize: 8,
       },
        formatter: '{b}月语音{a}:{c}次',
        position:'top',
        },

      xAxis: {
            name:"时间/月",
             data: [],
             axisTick: {
            show: false
          },
             axisLine: {
            show: false
                },
            },

      yAxis: {
              type: 'value',
              name:"业务量/次",
          axisLine: {
            show: false
                },
          axisTick: {
            show: false
          },
        gridIndex: 0,
       splitLine: {
             show: true,
             lineStyle:{
            color: ['#9a9c9e'],
              width: 0.5,
            type: 'dashed'
                 }
            },

        axisLabel: {
            textStyle: {
                color: '#999'
            }}
             },
            series: [{
                name: '业务量',
                type: 'bar',
                barWidth:'20%',
                   itemStyle:{
          barBorderRadius: [5, 5, 0, 0],
           opacity : 0.7,
           emphasis: {
                    opacity : 1,
                 }
         },
                data: [],
            }],

   };
   myChart3.setOption(option);

  axios.get('../../static/month.json').then((res) => {
console.log(res.data.name);
      myChart3.setOption({
        				xAxis:{
					data:res.data.name,
				},
				series:{
					data:res.data.data,
        },
title:{
  text: $dp.$('sdate3').value+'-'+$dp.$('edate3').value+'业务量数据统计'
},
      tooltip: {
        formatter: function (params) {
            var color = params.color;//图例颜色
            var htmlStr ='<div>';
            htmlStr += params.name ;//x轴的名称
            htmlStr += '月语音<br><br>业务量：';
   htmlStr += '<span style="color:'+color+';">';
   htmlStr+=params.value ;
    htmlStr += '</span>';
   htmlStr+= '次';
            htmlStr += '</div>';

            return htmlStr;
        }

        },
			});

		});

  }
  }
    }
  }
</script>

<style >
.column7 {
  float: left;
  width: 70%;
  padding-left:2%;
}
#divider2{
      width: 1px;
    height: 20em;
}
.el-radio-button__inner{
  border: 1px solid white;
  color:#54A7FF;
  font-weight: 550;
  padding: 10px 16px;
    font-size: 12px;
}
.el-radio-group {
    margin-left:30%;
}

.el-radio {
    color: #606266;
    cursor: pointer;
   margin-right: 7%;
   margin-top: 10%;
}


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
.el-radio__label{
  font-size: 12px;
  color:606266;
}

</style>

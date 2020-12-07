
<!-- 语音业务量展现组件 -->
<template>
  <el-collapse v-model="busi" @change="handleChange">
  <el-collapse-item>
  <!-- 折叠区头部 svg内加入蓝色小方块-->
 <template slot="title"><span style="padding-right: 8px"><svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-stop-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
</svg></span> 语音业务量展现</template>
<!-- 折叠区内容 第一列时间控件板块 -->
  <div class = "column1">
    <div >
  <el-radio-group v-model="tabPosition" >
    <el-radio-button label="按时"></el-radio-button>
    <el-radio-button label="按日" ></el-radio-button>
    <el-radio-button label="按月"></el-radio-button>
  </el-radio-group>
  </div >
    <!-- 时间选择部分 使用插件My97TimePicker 设置只读和选择，不可输入 -->

   <div v-if="tabPosition=='按时'">
   <div style="padding-top: 4px"><span class = "time-pre">选择开始时间</span><span><input id="sdate3" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日HH时',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "time-pre">选择结束时间</span><span ><input id="edate3" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日HH时',readOnly:true,minDate:'#F{$dp.$D(\'sdate3\')}'})" /></span></div>
   </div>
 <div v-if="tabPosition=='按日'" >
   <div style="padding-top: 4px" ><span class = "time-pre">选择开始时间</span ><span ><input id="sdate3"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "time-pre">选择结束时间</span><span ><input id="edate3" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月d日',readOnly:true,minDate:'#F{$dp.$D(\'sdate3\')}'})" /></span></div>
 </div>
 <div v-if="tabPosition=='按月'" >
   <div style="padding-top: 4px" ><span class = "time-pre">选择开始时间</span ><span ><input id="sdate3"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月',readOnly:true})" /></span></div>
   <div style="padding-top: 6px"><span class = "time-pre">选择结束时间</span><span><input id="edate3" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy年M月',onpicked:function(){$dp.$('edate3_1').value=$dp.cal.getP('y年');},readOnly:true,minDate:'#F{$dp.$D(\'sdate3\')}'})" /></span></div>
 </div>
<!-- 单选按钮，选择显示全部数据或呼叫失败数据 -->
   <div>
  <el-radio v-model="radio" label="1">显示全部数据</el-radio>
  <el-radio v-model="radio" label="2">仅显示呼叫失败数据</el-radio>
  </div>
  <!-- 分析和重置按钮 分析时显示数据图 重置时清空数据图-->
   <div style="padding-top: 60px"> <el-button type="primary" @click="getEchartData()">分 析</el-button> <span style="padding-left: 15%" @click="clean()"><el-button>重 置</el-button></span></div> </div>
<!-- 折叠区内容第二列，分割线 -->
  <div class = "column2"><el-divider id = "divider2" direction="vertical" ></el-divider></div>
    <!-- 折叠区内容 第三列 显示数据分析图 -->
  <div class = "column7"><div ref="chart3" style="width: 1100px;height: 280px"></div></div>
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
        busi: '1',  // 折叠区头部 默认折叠
        tabPosition: '按月',   // 单选按钮  默认按月
        radio: '1', // 单选按钮 默认显示全部数据
        //柱状图初始化参数
      };
    },
    mounted() {
    //this.getEchartData();
  },
    methods: {
      handleChange(val) {
        console.log(val);
      },
   // 重置折叠区数据内容，时间和数据分析图
    clean(){
     var chart3 = this.$refs.chart3;
     var myChart3 = this.$echarts.init(chart3);
     myChart3.setOption({
  //柱状图标题设置
     title: {
    text: $dp.$('sdate3').value+'-'+$dp.$('edate3').value+'业务量数据统计',
    left: "center",
    top: "top",
    textStyle: {
      fontSize: 15,
      color:'#606266',
    },
     },
      //X轴
      xAxis: {
            name:" ",
             data: [],
             axisTick: {
            show: false
          },
             axisLine: {
            show: false
                },
            },
            series: [{
                name: '业务量',
                type: 'bar',
                barWidth:'20%',
            data: [],
            }],
      });
    },

    //得到柱状图方法
     getEchartData(){
    //初始化
     const chart3 = this.$refs.chart3;
     if (chart3) {
   var myChart3 = this.$echarts.init(chart3);
   myChart3.setOption({
  //柱状图标题设置
     title: {
    text: $dp.$('sdate3').value+'-'+$dp.$('edate3').value+'业务量数据统计',
    left: "center",
    top: "top",
    textStyle: {
      fontSize: 15,
      color:'#606266',
    },
     },
     //柱子颜色
        color: ['blue'],
    //提示框设置
         tooltip: {
        trigger: 'item',
        textStyle: {
      fontSize: 8,
       },
        formatter: '{b}月语音{a}:{c}次',
        position:'top',
        },
      //X轴
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
      //Y轴
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
      //设置网格线为虚线
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
          //柱状图边框圆角设置
          barBorderRadius: [5, 5, 0, 0],
          //柱状图透明度设置 1为不透明，0为透明
          opacity : 0.7,
           emphasis: {
                    opacity : 1,
                 }
         },
         data: [],
        }],
      });
 /**
 * 设置横坐标终点名称及提示框内容
 * 示例：
 * 按时显示，
 * x轴终点： 时间/时    提示框内容拼接：XX年XX月XX日XX时业务量...
 * 效果实现方法：根据日期框输入数据裁剪XX年XX月XX日  时 ，具体时依据x轴坐标获取
 */
  let xAxisName = " ";
  let tooltipPre = " ";
  let tooltipEnd = " ";
console.log(this.tabPosition);
if(this.tabPosition=='按时'){
  xAxisName="时间/时"
  tooltipPre = $dp.$('sdate3').value.substring(0,$dp.$('sdate3').value.indexOf("日"));
  tooltipPre = tooltipPre + "日";
  tooltipEnd = "时";
}else if(this.tabPosition=='按日'){
  xAxisName = "时间/日";
    tooltipPre = $dp.$('sdate3').value.substring(0,$dp.$('sdate3').value.indexOf("月"));
  tooltipPre = tooltipPre + "月";
  tooltipEnd = "日";
}else if(this.tabPosition=='按月'){
  xAxisName = "时间/月";
    tooltipPre = $dp.$('sdate3').value.substring(0,$dp.$('sdate3').value.indexOf("年"));
  tooltipPre = tooltipPre + "年";
  tooltipEnd = "月";
}
/**
 * 获取数据：
 * {
"name":["1","2","3","4","5","6"], #月份，横坐标
"data":[55,36,79,45,79,88]   #业务量，对应的纵坐标
}
 */

axios.get('../../static/month.json').then((res) => {
console.log(res.data.name);
  myChart3.setOption({
	xAxis:{
          name:xAxisName,
					data:res.data.name,
				},
				series:{
					data:res.data.data,
        },
   tooltip: {
        formatter: function (params) {
            var color = params.color;//图例颜色
            var htmlStr ='<div>';
            htmlStr += tooltipPre+params.name+tooltipEnd;//x轴的名称
            htmlStr += '语音<br><br>业务量：';
            htmlStr += '<span style="color:'+color+';">';
            htmlStr+=params.value ;
            htmlStr += '  </span>';
            htmlStr+= '次';
            htmlStr += '</div>';
            return htmlStr;  //实现效果： XX年XX月XX日XX时语音<br>业务量XX次
        }
        },
			});
		});
  }
  }
   }
  }
</script>

<style scoped>

.column1 {
  float: left;
  width: 18%;
  padding-bottom:1.5%
}
.column2 {
  float: left;
  width: 0.33%;
}
/* 柱状图 */
.column7 {

  float: left;
  width: 70%;

}
/* 分隔线 */
#divider2{
      width: 1px;
    height: 20em;
}

/* 单选框组 */
.el-radio-group {
    margin-left:30%;
}
/* 单选框 */
.el-radio {
    color: #606266;
    cursor: pointer;
   margin-right: 6%;
   margin-top: 10%;
}



</style>


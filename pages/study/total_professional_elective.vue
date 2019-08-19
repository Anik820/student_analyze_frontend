<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_total">整体学业情况</BreadcrumbItem>
        <BreadcrumbItem to="/total_professional_elective">专业选修课情况</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 50px'}">
        <div class="main">
          <div class="search">
            <Cascader
              :data="data"
              id="xynjkc"
              trigger="hover"
              style="width: 380px"
              @on-change="changeData"
            ></Cascader>
          </div>
          <div class="chart-content">
            <Card :bordered="false" style="height:500px;width:49%;float:left;">
              <p slot="title">学生专业分布情况</p>
              <div id="pie" style="width:100%;height:350px"></div>
            </Card>
            <Card :bordered="false" style="height:500px;width:49%;float:right;">
              <p slot="title">各学院开设专业情况</p>
              <div id="bar" style="width:100%;height:350px"></div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>


<script>
import { METHODS } from "http";
import api from "@/api/study_api";
import echarts from "echarts";
export default {
  data() {
    return {
      value: [],
      va: [],
      echartsdata: [],
      title_data: [],
      legend_data: [],
      series_data: [],
      chart: "",
      bar_data: [],
      kec: [],
      data: [
        {
          value: "电视学院",
          label: "电视学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "视听传播概论",
                  label: "视听传播概论"
                },
                {
                  value: "欧美名片名著解读",
                  label: "欧美名片名著解读"
                },
                {
                  value: "中外新闻史",
                  label: "中外新闻史"
                },
                {
                  value: "摄影基础",
                  label: "摄影基础"
                },
                {
                  value: "视听节目制作与传播",
                  label: "视听节目制作与传播"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "视听传播概论",
                  label: "视听传播概论"
                },
                {
                  value: "欧美名片名著解读",
                  label: "欧美名片名著解读"
                },
                {
                  value: "中外新闻史",
                  label: "中外新闻史"
                },
                {
                  value: "摄影基础",
                  label: "摄影基础"
                },
                {
                  value: "视听节目制作与传播",
                  label: "视听节目制作与传播"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "视听传播概论",
                  label: "视听传播概论"
                },
                {
                  value: "欧美名片名著解读",
                  label: "欧美名片名著解读"
                },
                {
                  value: "中外新闻史",
                  label: "中外新闻史"
                },
                {
                  value: "摄影基础",
                  label: "摄影基础"
                },
                {
                  value: "视听节目制作与传播",
                  label: "视听节目制作与传播"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "视听传播概论",
                  label: "视听传播概论"
                },
                {
                  value: "欧美名片名著解读",
                  label: "欧美名片名著解读"
                },
                {
                  value: "中外新闻史",
                  label: "中外新闻史"
                },
                {
                  value: "摄影基础",
                  label: "摄影基础"
                },
                {
                  value: "视听节目制作与传播",
                  label: "视听节目制作与传播"
                }
              ]
            }
          ]
        },
        {
          value: "新闻学院",
          label: "新闻学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "广播新闻",
                  label: "广播新闻"
                },
                {
                  value: "新闻传播学导论",
                  label: "新闻传播学导论"
                },
                {
                  value: "图片新闻报道",
                  label: "图片新闻报道"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "广播新闻",
                  label: "广播新闻"
                },
                {
                  value: "新闻传播学导论",
                  label: "新闻传播学导论"
                },
                {
                  value: "图片新闻报道",
                  label: "图片新闻报道"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "广播新闻",
                  label: "广播新闻"
                },
                {
                  value: "新闻传播学导论",
                  label: "新闻传播学导论"
                },
                {
                  value: "图片新闻报道",
                  label: "图片新闻报道"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "广播新闻",
                  label: "广播新闻"
                },
                {
                  value: "新闻传播学导论",
                  label: "新闻传播学导论"
                },
                {
                  value: "图片新闻报道",
                  label: "图片新闻报道"
                }
              ]
            }
          ]
        },
        {
          value: "戏剧影视学院",
          label: "戏剧影视学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "影视录音基础",
                  label: "影视录音基础"
                },
                {
                  value: "戏剧历史与理论",
                  label: "戏剧历史与理论"
                },
                {
                  value: "舞台表演基础",
                  label: "舞台表演基础"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "影视录音基础",
                  label: "影视录音基础"
                },
                {
                  value: "戏剧历史与理论",
                  label: "戏剧历史与理论"
                },
                {
                  value: "舞台表演基础",
                  label: "舞台表演基础"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "影视录音基础",
                  label: "影视录音基础"
                },
                {
                  value: "戏剧历史与理论",
                  label: "戏剧历史与理论"
                },
                {
                  value: "舞台表演基础",
                  label: "舞台表演基础"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "影视录音基础",
                  label: "影视录音基础"
                },
                {
                  value: "戏剧历史与理论",
                  label: "戏剧历史与理论"
                },
                {
                  value: "舞台表演基础",
                  label: "舞台表演基础"
                }
              ]
            }
          ]
        },
        {
          value: "播音主持艺术学院",
          label: "播音主持艺术学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "播音主持创作基础1",
                  label: "播音主持创作基础1"
                },
                {
                  value: "播音主持创作基础2",
                  label: "播音主持创作基础2"
                },
                {
                  value: "广播电视口语表达基础1",
                  label: "广播电视口语表达基础1"
                },
                {
                  value: "广播电视口语表达基础2",
                  label: "广播电视口语表达基础2"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "播音主持创作基础1",
                  label: "播音主持创作基础1"
                },
                {
                  value: "播音主持创作基础2",
                  label: "播音主持创作基础2"
                },
                {
                  value: "广播电视口语表达基础1",
                  label: "广播电视口语表达基础1"
                },
                {
                  value: "广播电视口语表达基础2",
                  label: "广播电视口语表达基础2"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "播音主持创作基础1",
                  label: "播音主持创作基础1"
                },
                {
                  value: "播音主持创作基础2",
                  label: "播音主持创作基础2"
                },
                {
                  value: "广播电视口语表达基础1",
                  label: "广播电视口语表达基础1"
                },
                {
                  value: "广播电视口语表达基础2",
                  label: "广播电视口语表达基础2"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "播音主持创作基础1",
                  label: "播音主持创作基础1"
                },
                {
                  value: "播音主持创作基础2",
                  label: "播音主持创作基础2"
                },
                {
                  value: "广播电视口语表达基础1",
                  label: "广播电视口语表达基础1"
                },
                {
                  value: "广播电视口语表达基础2",
                  label: "广播电视口语表达基础2"
                }
              ]
            }
          ]
        },
        {
          value: "动画与数字艺术学院",
          label: "动画与数字艺术学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "数字声音创作一",
                  label: "数字声音创作一"
                },
                {
                  value: "动画联合创作",
                  label: "动画联合创作"
                },
                {
                  value: "三维角色动画一",
                  label: "三维角色动画一"
                },
                {
                  value: "三维角色动画二",
                  label: "三维角色动画二"
                },
                {
                  value: "三维动画设计稿",
                  label: "三维动画设计稿"
                },
                {
                  value: "三维建模与材质",
                  label: "三维建模与材质"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "数字声音创作一",
                  label: "数字声音创作一"
                },
                {
                  value: "动画联合创作",
                  label: "动画联合创作"
                },
                {
                  value: "三维角色动画一",
                  label: "三维角色动画一"
                },
                {
                  value: "三维角色动画二",
                  label: "三维角色动画二"
                },
                {
                  value: "三维动画设计稿",
                  label: "三维动画设计稿"
                },
                {
                  value: "三维建模与材质",
                  label: "三维建模与材质"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "数字声音创作一",
                  label: "数字声音创作一"
                },
                {
                  value: "动画联合创作",
                  label: "动画联合创作"
                },
                {
                  value: "三维角色动画一",
                  label: "三维角色动画一"
                },
                {
                  value: "三维角色动画二",
                  label: "三维角色动画二"
                },
                {
                  value: "三维动画设计稿",
                  label: "三维动画设计稿"
                },
                {
                  value: "三维建模与材质",
                  label: "三维建模与材质"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "数字声音创作一",
                  label: "数字声音创作一"
                },
                {
                  value: "动画联合创作",
                  label: "动画联合创作"
                },
                {
                  value: "三维角色动画一",
                  label: "三维角色动画一"
                },
                {
                  value: "三维角色动画二",
                  label: "三维角色动画二"
                },
                {
                  value: "三维动画设计稿",
                  label: "三维动画设计稿"
                },
                {
                  value: "三维建模与材质",
                  label: "三维建模与材质"
                }
              ]
            }
          ]
        },
        {
          value: "音乐与录音艺术学院",
          label: "音乐与录音艺术学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "录音艺术概论",
                  label: "录音艺术概论"
                },
                {
                  value: "录音专业英语",
                  label: "录音专业英语"
                },
                {
                  value: "数理基础",
                  label: "数理基础"
                },
                {
                  value: "电影艺术概论",
                  label: "电影艺术概论"
                },
                {
                  value: "录音电子技术基础",
                  label: "录音电子技术基础"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "录音艺术概论",
                  label: "录音艺术概论"
                },
                {
                  value: "录音专业英语",
                  label: "录音专业英语"
                },
                {
                  value: "数理基础",
                  label: "数理基础"
                },
                {
                  value: "电影艺术概论",
                  label: "电影艺术概论"
                },
                {
                  value: "录音电子技术基础",
                  label: "录音电子技术基础"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "录音艺术概论",
                  label: "录音艺术概论"
                },
                {
                  value: "录音专业英语",
                  label: "录音专业英语"
                },
                {
                  value: "数理基础",
                  label: "数理基础"
                },
                {
                  value: "电影艺术概论",
                  label: "电影艺术概论"
                },
                {
                  value: "录音电子技术基础",
                  label: "录音电子技术基础"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "录音艺术概论",
                  label: "录音艺术概论"
                },
                {
                  value: "录音专业英语",
                  label: "录音专业英语"
                },
                {
                  value: "数理基础",
                  label: "数理基础"
                },
                {
                  value: "电影艺术概论",
                  label: "电影艺术概论"
                },
                {
                  value: "录音电子技术基础",
                  label: "录音电子技术基础"
                }
              ]
            }
          ]
        },
        {
          value: "信息与通信工程学院",
          label: "信息与通信工程学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "数据库原理与开发技术",
                  label: "数据库原理与开发技术"
                },
                {
                  value: "现代电视原理B",
                  label: "现代电视原理B"
                },
                {
                  value: "DSP及应用",
                  label: "DSP及应用"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "数据库原理与开发技术",
                  label: "数据库原理与开发技术"
                },
                {
                  value: "现代电视原理B",
                  label: "现代电视原理B"
                },
                {
                  value: "DSP及应用",
                  label: "DSP及应用"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "数据库原理与开发技术",
                  label: "数据库原理与开发技术"
                },
                {
                  value: "现代电视原理B",
                  label: "现代电视原理B"
                },
                {
                  value: "DSP及应用",
                  label: "DSP及应用"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "数据库原理与开发技术",
                  label: "数据库原理与开发技术"
                },
                {
                  value: "现代电视原理B",
                  label: "现代电视原理B"
                },
                {
                  value: "DSP及应用",
                  label: "DSP及应用"
                }
              ]
            }
          ]
        },
        {
          value: "计算机与网络空间安全学院",
          label: "计算机与网络空间安全学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "数据库原理与应用",
                  label: "数据库原理与应用"
                },
                {
                  value: "计算机系统结构",
                  label: "计算机系统结构"
                },
                {
                  value: "逻辑与计算机设计基础",
                  label: "逻辑与计算机设计基础"
                },
                {
                  value: "计算机程序设计1",
                  label: "计算机程序设计1"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "数据库原理与应用",
                  label: "数据库原理与应用"
                },
                {
                  value: "计算机系统结构",
                  label: "计算机系统结构"
                },
                {
                  value: "逻辑与计算机设计基础",
                  label: "逻辑与计算机设计基础"
                },
                {
                  value: "计算机程序设计1",
                  label: "计算机程序设计1"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "数据库原理与应用",
                  label: "数据库原理与应用"
                },
                {
                  value: "计算机系统结构",
                  label: "计算机系统结构"
                },
                {
                  value: "逻辑与计算机设计基础",
                  label: "逻辑与计算机设计基础"
                },
                {
                  value: "计算机程序设计1",
                  label: "计算机程序设计1"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "数据库原理与应用",
                  label: "数据库原理与应用"
                },
                {
                  value: "计算机系统结构",
                  label: "计算机系统结构"
                },
                {
                  value: "逻辑与计算机设计基础",
                  label: "逻辑与计算机设计基础"
                },
                {
                  value: "计算机程序设计1",
                  label: "计算机程序设计1"
                }
              ]
            }
          ]
        },
        {
          value: "数据科学与智能媒体学院",
          label: "数据科学与智能媒体学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "数据结构D",
                  label: "数据结构D"
                },
                {
                  value: "Java语言基础",
                  label: "Java语言基础"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "数据结构D",
                  label: "数据结构D"
                },
                {
                  value: "Java语言基础",
                  label: "Java语言基础"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "数据结构D",
                  label: "数据结构D"
                },
                {
                  value: "Java语言基础",
                  label: "Java语言基础"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "数据结构D",
                  label: "数据结构D"
                },
                {
                  value: "Java语言基础",
                  label: "Java语言基础"
                }
              ]
            }
          ]
        },
        {
          value: "人文学院",
          label: "人文学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "学科专业英语听说1-2",
                  label: "学科专业英语听说1-2"
                },
                {
                  value: "学科专业英语读写1-2",
                  label: "学科专业英语读写1-2"
                },
                {
                  value: "中外文化通论（双语教学）",
                  label: "中外文化通论（双语教学）"
                },
                {
                  value: "汉语语法学",
                  label: "汉语语法学"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "学科专业英语听说1-2",
                  label: "学科专业英语听说1-2"
                },
                {
                  value: "学科专业英语读写1-2",
                  label: "学科专业英语读写1-2"
                },
                {
                  value: "中外文化通论（双语教学）",
                  label: "中外文化通论（双语教学）"
                },
                {
                  value: "汉语语法学",
                  label: "汉语语法学"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "学科专业英语听说1-2",
                  label: "学科专业英语听说1-2"
                },
                {
                  value: "学科专业英语读写1-2",
                  label: "学科专业英语读写1-2"
                },
                {
                  value: "中外文化通论（双语教学）",
                  label: "中外文化通论（双语教学）"
                },
                {
                  value: "汉语语法学",
                  label: "汉语语法学"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "学科专业英语听说1-2",
                  label: "学科专业英语听说1-2"
                },
                {
                  value: "学科专业英语读写1-2",
                  label: "学科专业英语读写1-2"
                },
                {
                  value: "中外文化通论（双语教学）",
                  label: "中外文化通论（双语教学）"
                },
                {
                  value: "汉语语法学",
                  label: "汉语语法学"
                }
              ]
            }
          ]
        },
        {
          value: "政法学院",
          label: "政法学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "法律职业伦理",
                  label: "法律职业伦理"
                },
                {
                  value: "商法概论",
                  label: "商法概论"
                },
                {
                  value: "经济法学",
                  label: "经济法学"
                },
                {
                  value: "知识产权法",
                  label: "知识产权法"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "法律职业伦理",
                  label: "法律职业伦理"
                },
                {
                  value: "商法概论",
                  label: "商法概论"
                },
                {
                  value: "经济法学",
                  label: "经济法学"
                },
                {
                  value: "知识产权法",
                  label: "知识产权法"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "法律职业伦理",
                  label: "法律职业伦理"
                },
                {
                  value: "商法概论",
                  label: "商法概论"
                },
                {
                  value: "经济法学",
                  label: "经济法学"
                },
                {
                  value: "知识产权法",
                  label: "知识产权法"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "法律职业伦理",
                  label: "法律职业伦理"
                },
                {
                  value: "商法概论",
                  label: "商法概论"
                },
                {
                  value: "经济法学",
                  label: "经济法学"
                },
                {
                  value: "知识产权法",
                  label: "知识产权法"
                }
              ]
            }
          ]
        },
        {
          value: "外国语言文化学院",
          label: "外国语言文化学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "英语口语（1）",
                  label: "英语口语（1）"
                },
                {
                  value: "英语口语（2）",
                  label: "英语口语（2）"
                },
                {
                  value: "基础英语写作（1）",
                  label: "基础英语写作（1）"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "英语口语（1）",
                  label: "英语口语（1）"
                },
                {
                  value: "英语口语（2）",
                  label: "英语口语（2）"
                },
                {
                  value: "基础英语写作（1）",
                  label: "基础英语写作（1）"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "英语口语（1）",
                  label: "英语口语（1）"
                },
                {
                  value: "英语口语（2）",
                  label: "英语口语（2）"
                },
                {
                  value: "基础英语写作（1）",
                  label: "基础英语写作（1）"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "英语口语（1）",
                  label: "英语口语（1）"
                },
                {
                  value: "英语口语（2）",
                  label: "英语口语（2）"
                },
                {
                  value: "基础英语写作（1）",
                  label: "基础英语写作（1）"
                }
              ]
            }
          ]
        },
        {
          value: "经济与管理学院",
          label: "经济与管理学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "传媒经济学A",
                  label: "传媒经济学A"
                },
                {
                  value: "政治经济学A",
                  label: "政治经济学A"
                },
                {
                  value: "会计学C",
                  label: "会计学C"
                },
                {
                  value: "管理学原理B",
                  label: "管理学原理B"
                },
                {
                  value: "证券投资学",
                  label: "证券投资学"
                },
                {
                  value: "博弈论",
                  label: "博弈论"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "传媒经济学A",
                  label: "传媒经济学A"
                },
                {
                  value: "政治经济学A",
                  label: "政治经济学A"
                },
                {
                  value: "会计学C",
                  label: "会计学C"
                },
                {
                  value: "管理学原理B",
                  label: "管理学原理B"
                },
                {
                  value: "证券投资学",
                  label: "证券投资学"
                },
                {
                  value: "博弈论",
                  label: "博弈论"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "传媒经济学A",
                  label: "传媒经济学A"
                },
                {
                  value: "政治经济学A",
                  label: "政治经济学A"
                },
                {
                  value: "会计学C",
                  label: "会计学C"
                },
                {
                  value: "管理学原理B",
                  label: "管理学原理B"
                },
                {
                  value: "证券投资学",
                  label: "证券投资学"
                },
                {
                  value: "博弈论",
                  label: "博弈论"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "传媒经济学A",
                  label: "传媒经济学A"
                },
                {
                  value: "政治经济学A",
                  label: "政治经济学A"
                },
                {
                  value: "会计学C",
                  label: "会计学C"
                },
                {
                  value: "管理学原理B",
                  label: "管理学原理B"
                },
                {
                  value: "证券投资学",
                  label: "证券投资学"
                },
                {
                  value: "博弈论",
                  label: "博弈论"
                }
              ]
            }
          ]
        },
        {
          value: "广告学院",
          label: "广告学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "社会学概论",
                  label: "社会学概论"
                },
                {
                  value: "经济学基础",
                  label: "经济学基础"
                },
                {
                  value: "广告心理学",
                  label: "广告心理学"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "社会学概论",
                  label: "社会学概论"
                },
                {
                  value: "经济学基础",
                  label: "经济学基础"
                },
                {
                  value: "广告心理学",
                  label: "广告心理学"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "社会学概论",
                  label: "社会学概论"
                },
                {
                  value: "经济学基础",
                  label: "经济学基础"
                },
                {
                  value: "广告心理学",
                  label: "广告心理学"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "社会学概论",
                  label: "社会学概论"
                },
                {
                  value: "经济学基础",
                  label: "经济学基础"
                },
                {
                  value: "广告心理学",
                  label: "广告心理学"
                }
              ]
            }
          ]
        },
        {
          value: "文化产业管理学院",
          label: "文化产业管理学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "非遗传播与数字化展示",
                  label: "非遗传播与数字化展示"
                },
                {
                  value: "文博创意产品与服务开发",
                  label: "文博创意产品与服务开发"
                },
                {
                  value: "演艺产业",
                  label: "演艺产业"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "非遗传播与数字化展示",
                  label: "非遗传播与数字化展示"
                },
                {
                  value: "文博创意产品与服务开发",
                  label: "文博创意产品与服务开发"
                },
                {
                  value: "演艺产业",
                  label: "演艺产业"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "非遗传播与数字化展示",
                  label: "非遗传播与数字化展示"
                },
                {
                  value: "文博创意产品与服务开发",
                  label: "文博创意产品与服务开发"
                },
                {
                  value: "演艺产业",
                  label: "演艺产业"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "非遗传播与数字化展示",
                  label: "非遗传播与数字化展示"
                },
                {
                  value: "文博创意产品与服务开发",
                  label: "文博创意产品与服务开发"
                },
                {
                  value: "演艺产业",
                  label: "演艺产业"
                }
              ]
            }
          ]
        },
        {
          value: "国际传媒教育学院",
          label: "国际传媒教育学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "传媒市场调查与分析",
                  label: "传媒市场调查与分析"
                },
                {
                  value: "外国新闻史",
                  label: "外国新闻史"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "传媒市场调查与分析",
                  label: "传媒市场调查与分析"
                },
                {
                  value: "外国新闻史",
                  label: "外国新闻史"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "传媒市场调查与分析",
                  label: "传媒市场调查与分析"
                },
                {
                  value: "外国新闻史",
                  label: "外国新闻史"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "传媒市场调查与分析",
                  label: "传媒市场调查与分析"
                },
                {
                  value: "外国新闻史",
                  label: "外国新闻史"
                }
              ]
            }
          ]
        }
      ],
      color: [
        "#516b91",
        "#569ae2",
        "#a5dff9",
        "#94d8e1",
        "#82ddc1",
        "#afe39b",
        "#e5f39b",
        "#ffe88e",
        "rgba(255,175,175,0.43)",
        "rgba(255,175,175,0.76)",
        "rgba(240,124,158,0.73)",
        "#d29dd7",
        "rgba(189,183,240,0.86)",
        "rgba(131,121,207,0.82)",
        "#686eca"
      ] //设置图表颜色
    };
  },

  mounted() {
    
    this.testoptions();
    this.test2options();
    this.init();
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("pie"));
      let mychart2 = this.$echarts.init(document.getElementById("bar"));
      mychart2.resize();
      mychart1.resize();
    };
  },
  methods: {
    init() {
      this.changeData(["电视学院", 16, "视听传播概论"]);
    },
    changeData(value, selectedData) {
      let xy = value[0];
      let nj = value[1];
      let kc = value[2];
      this.kec = kc + "选课情况";

      api.getprofessional_elective(xy, nj, kc).then(res => {
        let coursename = res.class;
        let servicedata = [];
        let bardata = [];
        for (let i = 0; i < res.class.length; i++) {
          let obj = new Object();
          let obj2 = new Object();

          obj.name = res.class[i];
          obj.value = res.stunum[i];
          servicedata[i] = obj;

          obj2.name = res.class[i];
          obj2.value = res.avg[i];
          bardata[i] = obj2;
        }
        console.log("hhhh" + bardata);
        this.title_data = coursename;
        this.legend_data = res.name;
        this.series_data = servicedata;
        this.bar_data = bardata;
        this.testoptions();
        this.test2options();
      });
    },
    testoptions() {
      let mychart1 = echarts.init(document.getElementById("pie"), "macarons");

      // 把配置和数据放这里
      mychart1.setOption({
        title: {
          //text: "课程学生专业分布情况",
          subtext: this.kec,
          x: "center"
        },
        color: this.color,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "",
          x: "center",
          y: "top",
          data: this.legend_data
        },
        series: [
          {
            name: "选课学生专业分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.series_data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      mychart1.resize();
      /* window.addEventListener("resize", function() {
        mychart1.resize();
      }); */
    },
    test2options() {
      let mychart2 = this.$echarts.init(document.getElementById("bar"));

      // 把配置和数据放这里
      mychart2.setOption({
        title: {
          // text: "各学院开设专业数",
          x: "center"
        },
        color: this.color,
        tooltip: {},
        legend: {
          x: "20px",
          y: "top",

          data: this.legend_data
        },
        xAxis: {
          data: this.title_data,

          axisLabel: {
            formatter: function(value) {
              return value.split("").join("\n");
            },
            inside: true,
            interval: 0,
            // rotate: 90,
            //formatter:function(val){
            //    return val.split("").join("\n");
            // }  ,
            textStyle: {
              color: "#000"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#666"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            name: "开设专业数",
            type: "bar",
            data: this.bar_data,
            itemStyle: {
              normal: {
                //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#569ae2"
                  },
                  {
                    offset: 1,
                    color: "rgba(189,183,240,0.86)" //"#a5dff9"
                  }
                ])
              }
            },
            barGap: 10,
            areaStyle: {}
          }
        ]
      });
      mychart2.resize();
    }
  }
};
</script>

<style>
.bread {
  margin: "24px 0";
  position: relative;
  left: 40px;
  top: -33px;
}
.main {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  padding: 20px;
  height: 1080px;
}
.search {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  padding: 20px;
}
.chart-content {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  padding: 20px;
}
</style>
<template>
  <div>
    <Cascader
     :data="data" 
     id="xynjkc" 
     trigger="hover" 
     style="width: 350px"
     @on-change="changeData"></Cascader>
    <div id="tsc" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import api from "../../api/study_api"
import echarts from "echarts"

export default {
  data() {
    return {
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
                  value: "思想道德修养与法律基础",
                  label: "思想道德修养与法律基础"
                },
                {
                  value: "马克思主义基本原理概论",
                  label: "马克思主义基本原理概论"
                },
                {
                  value: "中国近现代史纲要",
                  label: "中国近现代史纲要"
                },
                {
                  value: "毛泽东思想和中国特色社会主义理论体系概论",
                  label: "毛泽东思想和中国特色社会主义理论体系概论"
                },
                {
                  value: "思想政治理论课综合实践",
                  label: "思想政治理论课综合实践"
                },
                {
                  value: "当代世界经济与政治（文科类、艺术类、经管类专业必选）",
                  label: "当代世界经济与政治（文科类、艺术类、经管类专业必选）"
                },
                {
                  value: "形势与政策",
                  label: "形势与政策"
                },
                {
                  value: "大学英语",
                  label: "大学英语"
                },
                {
                  value: "体育",
                  label: "体育"
                },
                {
                  value: "大学生职业生涯规划",
                  label: "大学生职业生涯规划"
                },
                {
                  value: "大学生就业与创业指导",
                  label: "大学生就业与创业指导"
                },
                {
                  value: "大学计算机（文科类2）",
                  label: "大学计算机（文科类2）"
                },
                {
                  value: "网页设计与制作",
                  label: "网页设计与制作"
                },
                {
                  value: "写作与语言艺术",
                  label: "写作与语言艺术"
                },
                {
                  value: "经济学基础",
                  label: "经济学基础"
                },
                {
                  value: "社会学概论",
                  label: "写作与语言艺术"
                },
                {
                  value: "写作与语言艺术",
                  label: "写作与语言艺术"
                },
                {
                  value: "写作与语言艺术",
                  label: "写作与语言艺术"
                },
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
    };
  },
  
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("tsc"));
      mychart1.resize();
    };
  },
  methods: {
    init() {
      this.changeData(["电视学院", 16, "思想道德修养与法律基础"]);
    },
    changeData(value, selectedData) {
      let mychart1 = this.$echarts.init(document.getElementById("tsc"));
  
      let nj = value[1];
      let course = value[2];
      let col = value[0];
      api.gettongshicol_elective(nj, course, col).then(res => {
        
        mychart1.setOption({
          title: {
            text: "学院专业通识课成绩统计"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["学院"]
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: res.专业,
              axisLabel: {
                
                interval: 0, //横轴信息全部显示
                rotate: -15 //-15度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              
              name: "成绩",
              type: "bar",
              data: res.分数,
              itemStyle: {
                  normal: {
                      //每根柱子颜色设置
                      color: function(params) {
                          let colorList = [
                            "#516b91",
                            "#2390d2",
                            "#569ae2",
                            "#60acfc",
                            "#7fbcfc",
                            "#9fcdfd",
                          ];
                          return colorList[params.dataIndex];
                      }
                  }
              },
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        });
        mychart1.resize();
      });
    }
  }
};
</script>
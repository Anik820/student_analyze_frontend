<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
        <BreadcrumbItem to="/selectstudent">学生个人上网行为</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '10px 25px 0 38px'}">
        <div class="div-inputting">
        </div>
        <div class="normal">
          <Card class="selectcard">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-card class="invisible-card"></el-card>
            </el-col>
            <el-col :span="3">
              <h2 class="label">选择条件</h2>
            </el-col>
            <el-col :span="5">
              <el-select v-model="college"
                         placeholder="请选择学院"
                         class="select_person">
                <el-option v-for="item in options_college"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-select v-model="grade"
                         placeholder="请选择年级"
                         class="select_person">
                <el-option v-for="item in options_grade"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input v-model="keyword"
                        placeholder="请输入关键词"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button @click="filterstudents">查询</el-button>
            </el-col>
            <el-col :span="1">
              <el-button @click="torandom">随机选取</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableData" class="table_style" max-height="650">
              <el-table-column type="index"
                               width="200">
              </el-table-column>
              <el-table-column prop="学号"
                               label="学号"
                               width="300">
              </el-table-column>
              <el-table-column prop="姓名"
                               label="姓名"
                               width="250">
              </el-table-column>
              <el-table-column prop="学院"
                               label="学院"
                               width="250">
              </el-table-column>
              <el-table-column prop="dealing"
                               label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="todetail(scope.row)"> 
                    查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </Card>
        </div>
      </Content>
    </Layout>
  </div>
</template>


<script>
import online_api from "@/api/online_api"
import {mapActions} from 'vuex'

export default {
  name: 'selectstudent',
  data () {
    return {

      isCollapsed: false,
      keyword: '',
      grade: '',
      college: '',

      options_college: [
        {
          value: '电视学院',
          label: '电视学院'
        }, 
        {
          value: '新闻学院',
          label: '新闻学院'
        },
        {
          value: '戏剧影视学院',
          label: '戏剧影视学院'
        },
        {
          value: '播音主持艺术学院',
          label: '播音主持艺术学院'
        },
        {
          value: '动画与数字艺术学院',
          label: '动画与数字艺术学院'
        },
        {
          value: '音乐与录音艺术学院',
          label: '音乐与录音艺术学院'
        },
        {
          value: '信息与通信工程学院',
          label: '信息与通信工程学院'
        },
        {
          value: '计算机与网络空间安全学院',
          label: '计算机与网络空间安全学院'
        },
        {
          value: '数据科学与智能媒体学院',
          label: '数据科学与智能媒体学院'
        },
        {
          value: '人文学院',
          label: '人文学院'
        },
        {
          value: '政法学院',
          label: '政法学院'
        },
        {
          value: '外国语言文化学院',
          label: '外国语言文化学院'
        },
        {
          value: '经济与管理学院',
          label: '经济与管理学院'
        },
        {
          value: '广告学院',
          label: '广告学院'
        },
        {
          value: '文化产业管理学院',
          label: '文化产业管理学院'
        },
        {
          value: '国际传媒教育学院',
          label: '国际传媒教育学院'
        }      
      ],
      options_grade: [
        {
          value: '2016',
          label: '大一'
        },
        {
          value: '2017',
          label: '大二'
        },
        {
          value: '2018',
          label: '大三'
        },
        {
          value: '2019',
          label: '大四'
        },
      ],
      tableData: [
      ]
    }
  },
  methods: {
    ...mapActions(['addstudent']),
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },    
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    filterstudents (){
      online_api.filterstudents(this.college,this.grade,this.keyword).then(res => {
        this.tableData=res
      })
    }, 
    todetail(row){
      console.log(this)
      this.addstudent(row["学号"])
      this.$router.push({
        name:'online_person'
      })
    },
    torandom(){
      online_api.makerandomid().then(res => {
        this.addstudent(res[0])
        this.$router.push({
          name:'online_person'
        })        
      })
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
.normal {
  display: block;
  position: relative;
  width: 800px;
  height: 700px;
  margin-left: 50px;
  margin-top: 0px;
}

.invisible-card {
  opacity: 0;
}
.select_person {
  width: 120px;
}
.table_style {
  width: 100%;
  padding-top: 10px;
  margin: auto;
}
.label{
  margin-top:3px;
}
.selectcard{
  position:absolute;
  margin-left: 0px;
  margin-top :20px;
  width: 1200px;
  float:left;
  top:0;
  height:700px;
}
</style>
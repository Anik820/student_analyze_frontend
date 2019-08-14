<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/bookjieyuexinwei">图书借阅行为</BreadcrumbItem>
        <BreadcrumbItem to="/book_cuc">学校借阅情况</BreadcrumbItem>
      </Breadcrumb>

      <Content :style="{padding: '0 60px'}">
        <div class="main">
          <Card :bordered="false" style="height:400px;width:49%;float:left;">
            <p slot="title">图书借阅总量</p>
            <div align="center">
              <cuc_borrow_result></cuc_borrow_result>
            </div>
          </Card>

          <Card :bordered="false" style="height:400px;width:49%;float:right;">
            <p slot="title">全校热门书籍</p>
            <div id="ab" align="center" style="width:100%;">
              <!-- overflow:hidden;zoom:1; -->
              <cuc_hotbook_school></cuc_hotbook_school>
            </div>
          </Card>

          <Card
            :bordered="false"
            style="width:100%;height:600px;float:left;margin-top:30px;margin:30px auto"
          >
            <p slot="title">借书类型偏好</p>
            <div align="center">
              <!-- <cuc_booktype_school></cuc_booktype_school> -->
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  </div>
</template>


<script>
import cuc_borrow_result from "@/components/library/cuc_borrow_result";
import cuc_hotbook_school from "@/components/library/cuc_hotbook_school";
import cuc_booktype_school from "@/components/library/cuc_booktype_school";

export default {
  data() {
    return {
      value1: 0
    };
  },
  components: {
    cuc_borrow_result,
    cuc_hotbook_school,
    cuc_booktype_school
  },
  mounted() {
    this.init();
    console.log(this.echartdata);
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart = this.$echarts.init(document.getElementById("hotbook"));
      let chart = this.$echarts.init(document.getElementById("borrowresult"));
      chart.resize();
      mychart.resize();
    };
  },
  methods: {
    
  }
};
</script>


<style>
.main {
  -ms-flex: 80%; /* IE10 */
  flex: 80%;
  padding: 20px;
  height: 1080px;
}
.bread {
  margin: "24px 0";
  position: relative;
  left: 40px;
  top: -33px;
}
.layui-content {
  padding: 20px;
}
.layui-col-sm6 {
  position: relative;
  display: block;
  box-sizing: border-box;
}
</style>
<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/bookjieyuexinwei">图书借阅行为</BreadcrumbItem>
        <BreadcrumbItem to="/book_person">个人借阅情况</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 60px'}">
          <div class="main">
            
            <Card :bordered="false" style="height:600px;width:70%;float:left;"> 
                <p slot="title">个人借阅量与学校、学院平均借阅量</p>
                <div>
                  <person_avg_compare></person_avg_compare>
                </div>
            </Card>
            <Card :bordered="false" style="height:600px;width:28%;float:right;">
                <p slot="title">全校借阅排行榜top10</p>
                <div>
                  <person_top_borrow></person_top_borrow>
                </div>
            </Card>
            <!-- <Card :bordered="false" style="width:70%;height:250px;float:left;margin-top:30px;margin:30px auto">
                <p slot="title">阅读建议</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
            </Card> -->
          </div> 
        </Content>
    </Layout>
  </div>
</template>


<script>
import person_top_borrow from '@/components/library/person_top_borrow'
import person_avg_compare from '@/components/library/person_avg_compare'

export default {
  components:{
    person_top_borrow,
    person_avg_compare,
  },
  data () {
    return {
      value1: 0
    }
  },
  mounted(){
    
    const that = this
		    window.onresize = () => {//  根据窗口大小调整曲线大小
            let mychart1 = this.$echarts.init(document.getElementById('top'));
             let mychart = this.$echarts.init(document.getElementById('personcompare'));
             mychart.resize();
             mychart1.resize();
		    }
  }
}
</script>


<style>
  .bread {
    margin: "24px 0";
    position: relative;
    left: 40px;
    top: -33px;
  }
  .search{
    -ms-flex: 100%; /* IE10 */
    flex: 100%;   
    padding: 20px;
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
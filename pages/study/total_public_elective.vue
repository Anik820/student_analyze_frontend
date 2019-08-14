<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_total">整体学业情况</BreadcrumbItem>
        <BreadcrumbItem to="/total_public_elective">公选课情况</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 60px'}">
          <div class="main">
            <Card :bordered="false" style="width:100%;height:580px;float:left;margin-bottom:10px;margin:10px auto">
                <p slot="title">各学院、专业公选课情况</p>
                <div align="center">
                  <public_elective_drill></public_elective_drill>
                </div>
            </Card>
          </div> 
        </Content> 
      </Layout>
  </div>
</template>


<script>
import public_elective_drill from '@/components/study/public_elective_drill'
export default {
  components:{
    public_elective_drill,
  },
  data () {
    return {
      value1: 0
    }
  }
}
</script>


<style>
.bread{
margin: '24px 0';
position:relative;
left:40px;
top:-33px;
}
</style>
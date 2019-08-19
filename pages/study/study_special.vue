<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_special">特殊学业情况</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '0 60px'}">
        <div class="main">
          <Card :bordered="false" style="width:100%;height:430px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">辅修双学位学生来源</p>
              <div>
                <special_double_degree_pie></special_double_degree_pie>
              </div>
          </Card>
          <Card :bordered="false" style="width:100%;height:400px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">双学位专业选课人数</p>
              <div>
                <special_double_degree_bar></special_double_degree_bar>
              </div>
          </Card>
          <Card :bordered="false" style="width:100%;height:500px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">转专业情况分析</p>
              <div>
                <special_transfer_chord></special_transfer_chord>
              </div>
          </Card>
        </div>
    </Content>
  </Layout>
  </div>
</template>


<script>
import special_double_degree_pie from '@/components/study/special_double_degree_pie'
import special_transfer_chord from '@/components/study/special_transfer_chord'
import special_double_degree_bar from '@/components/study/special_double_degree_bar'
export default {
  components:{
    special_double_degree_pie,
    special_transfer_chord,
    special_double_degree_bar,
  },
  data () {
    return {
      value1: 0
    }
  },
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
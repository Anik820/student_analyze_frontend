<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_total">整体学业情况</BreadcrumbItem>
        <BreadcrumbItem to="/total_professional_compulsory">专业必修课情况</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 60px'}">
        
         <div>
                <professional_compulsory_charts></professional_compulsory_charts>
         </div>
      </Content> 
  </Layout>
  </div>
</template>


<script>
import professional_compulsory_charts from '@/components/study/professional_compulsory_charts'

export default {
  components:{
    professional_compulsory_charts,
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
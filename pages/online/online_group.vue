<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
        <BreadcrumbItem to="/online_group">学生群体上网行为</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 25px'}">
        <div class="normal1">
            <CollegeFreq></CollegeFreq>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
import CollegeFreq from '@/pages/online/charts/CollegeFreq'
export default {
  components:{
    CollegeFreq
  },
  data () {
    return {
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
.normal1 {
  margin:15px 0px 0px 20px
}

</style>
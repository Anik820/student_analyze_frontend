<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb class="bread">
      <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
      <BreadcrumbItem to="/online_network">校园热力图</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '50px 150px'}">
      <Card class="showcard">
          <HeatMap></HeatMap>
      </Card>
    </Content>
  </Layout>
</template>
<script>
import HeatMap from '@/pages/online/charts/HeatMap'
export default {
  components:{
    HeatMap
  },
  data () {
    return {
      value1: 0
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
.demo-carouse2 {
  height: 300px;
  line-height: 530px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #b4dd41;
}
.showcard {
  width:1450px;
  height: 700px;
  margin: -20px 0px 0px -60px;
}
</style>
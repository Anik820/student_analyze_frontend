<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
        <BreadcrumbItem to="/online_group">学生群体上网行为</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 50px'}">
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
.demo-carouse3 {
  height: 800px;
  line-height: 530px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #9e508d;
}
.invisible-p {
  opacity: 0;
}
.select1 {
  width: 1480px;
  padding: 10px;
  margin: 20px 0px 0px 300px;
}
.bannerImg {
  width: 100%;
  height: inherit;
  min-height: 360px;
  min-width: 1400px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 25px;
  opacity: 0.75;
  line-height: 450px;
  margin: 0 50px 25px 25px;
  text-align: center;
}
.normal1 {
  margin:30px 0px 0px 0px
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel-test {
  line-height: 450px;
  text-align: center;
}
.carousel-test,
.carousel-test2 {
  width: 2000px;
}
.carousel-test2 {
  margin: 25px 0px 0px 120px;
}
.button-move-group {
  margin: 25px 0px 0px 375px;
}
</style>
<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group">学生群体消费情况</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group_sex">性别消费分析</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '0 50px'}">

      <Card>
        <div style="min-height: 600px;">
          <Carousel v-model="value1"
                    height:500px>
            <CarouselItem>
              <div class="demo-carouse3">1</div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carouse3">2</div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carouse3">3</div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carouse3">4</div>
            </CarouselItem>
          </Carousel>
        </div>
      </Card>
    </Content>
  </Layout>
  </div>
</template>


<script>
export default {
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
.demo-carouse3 {
  height: 600px;
  line-height: 530px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #9e508d;
}
</style>
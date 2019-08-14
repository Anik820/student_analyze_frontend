<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '70px 50px 0 75px'}">
        <div class="normal">
        <el-carousel :interval="4000" type="card" height="600px">
          <el-carousel-item v-for="item in imagesbox" :key="item.id">
           <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
        </div>
      </Content>
  </Layout>
  </div>
</template>


<script>
export default {
  data () {
        return {
            isCollapsed: false,
            imagesbox:
            [{id:0,idView:require("../../assets/1.jpg")},      
            {id:1,idView:require("../../assets/2.jpg")},
            {id:2,idView:require("../../assets/3.jpg")},
            {id:3,idView:require("../../assets/4.jpg")}]
      }
    },
    computed: {
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
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    }
}
</script>



<style>
.image{
  width:100%;
  height:600px;
}
.bread{
margin: '24px 0';
position:relative;
left:40px;
top:-33px;
}
  .normal{
    display:block;
    width: 100%;
    height: 600px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 25px;
    opacity: 0.75;
    line-height: 450px;
    margin: 0 50px 25px 25px;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;

  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;

  }
</style>
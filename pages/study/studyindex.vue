<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb class="bread">
      <Breadcrumb-item to="/studyindex">学业分析</Breadcrumb-item>
    </Breadcrumb>
    <Content :style="{padding: '70px 50px 0 75px'}">
          <div class="normal">
          <el-carousel :interval="4000" type="card" height="500px">
            <el-carousel-item v-for="item in 3" :key="item"> 
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          </div>
        </Content>
  </Layout>
</template>

<script>
export default {
    data () {
        return {
            isCollapsed: false
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
  .bread{
  margin: '24px 0';
  position:relative;
  left:40px;
  top:-33px;
  }
  .normal{
    display:block;
    width: 1500px;
    height: 500px;
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

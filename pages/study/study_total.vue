<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_total">整体学业情况</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '0 60px'}">
        <div class="main">
          <Card :bordered="false" style="width:100%;height:400px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">通识课情况</p>
              <div></div>
          </Card>
          <Card :bordered="false" style="width:100%;height:400px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">专业必修课情况</p>
              <div></div>
          </Card>
          <Card :bordered="false" style="width:100%;height:400px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">专业选修课情况</p>
              <div></div>
          </Card>
          <Card :bordered="false" style="width:100%;height:400px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">公选课情况</p>
              <div></div>
          </Card>
        </div> 
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

</style>
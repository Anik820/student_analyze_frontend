<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 50px'}">

        <Card class="card-style">
          <div>

          </div>
        </Card>
        <Card class="card-style">
          <div>

          </div>
        </Card>
        <Card class="card-style">
          <div>

          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {


}
</script>
<style>
.bread{
margin: '24px 0';
position:relative;
left:40px;
top:-33px;
}
.card-style {
  width: 500px;
  height: 400;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>
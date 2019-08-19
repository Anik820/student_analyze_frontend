<template>
  <!--<div id="app" style="height: 100%">-->

  <Menu active-name="1-2"
        theme="dark"
        width="auto"
        :accordion=true
        :class="menuitemClasses">
    <!-- <router-link to="/">
      <menu-item name="0">
        <Icon type="ios-navigate"></Icon>首页
      </menu-item>
    </router-link>-->
    <router-link to="/studyindex">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"
                class="icon-move"></Icon><span>学业分析</span>
        </template>
        <router-link to="/study_total">
          <Submenu title="整体学业情况"
                   name="2"
                   class="double_padding_left">
            <template slot="title"
                      class="double_padding_left"><span>整体学业情况</span>
            </template>
            <router-link to="/total_common_course">
              <MenuItem name="2-1"><span>通识课情况</span></MenuItem>
            </router-link>
            <router-link to="/total_professional_compulsory">
              <MenuItem name="2-2"><span>专业必修课情况</span></MenuItem>
            </router-link>
            <router-link to="/total_professional_elective">
              <MenuItem name="2-3"><span>专业选修课情况</span></MenuItem>
            </router-link>
            <router-link to="/total_public_elective">
              <MenuItem name="2-4"><span>公选课情况</span></MenuItem>
            </router-link>
          </Submenu>
        </router-link>
        <router-link to="/study_person">
          <MenuItem name="1-1"><span class="double_padding_left">个人学业情况</span></MenuItem>
        </router-link>
        <router-link to="/study_special">
          <MenuItem name="1-2"><span class="double_padding_left">特殊学业情况</span></MenuItem>
        </router-link>
      </Submenu>
    </router-link>

    <router-link to="/onlineindex">
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-search"
                class="icon-move"></Icon><span>上网行为</span>
        </template>
        <router-link to="/selectstudent">
          <menu-item name="3-1">
            <span class="double_padding_left">学生个人上网行为</span>
          </menu-item>
        </router-link>
        <router-link to="/online_group">
          <menu-item name="3-2">
            <span class="double_padding_left">学生群体上网行为</span>
          </menu-item>
        </router-link>
        <router-link to="/online_network">
          <menu-item name="3-3">
            <span class="double_padding_left">校园热力图</span>
          </menu-item>
        </router-link>
      </Submenu>
    </router-link>

    <router-link to="/consumeindex">
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-basket-outline"
                class="icon-move" /><span>消费行为</span>
        </template>
        <router-link to="/consume_total">
          <menu-item name="4-1"><span class="double_padding_left">总体情况</span></menu-item>
        </router-link>
        <router-link to="/consume_person">
          <menu-item name="4-2"><span class="double_padding_left">学生个人消费情况</span></menu-item>
        </router-link>
        <router-link to="/consume_group">
          <Submenu name="5"
                   title="学生群体消费情况">
            <template slot="title">
              <span class="double_padding_left">学生群体消费情况</span>
            </template>
            <router-link to="/consume_group_grade">
              <MenuItem name="5-1"><span>年级消费分析</span></MenuItem>
            </router-link>
            <router-link to="/consume_group_trend">
              <MenuItem name="5-2"><span>消费趋势分析</span></MenuItem>
            </router-link>
          </Submenu>
        </router-link>
        <!-- <router-link to="/consume_hotspots">
                <menu-item name="4-3">全校热门消费地点</menu-item>
            </router-link> -->
      </Submenu>
    </router-link>

    <router-link to="/bookindex">
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-book"
                class="icon-move"></Icon><span>图书借阅行为</span>
        </template>
        <router-link to="/book_cuc">
          <MenuItem name="6-1"><span class="double_padding_left">学校借阅情况</span></MenuItem>
        </router-link>
        <router-link to="/book_college">
          <MenuItem name="6-2"><span class="double_padding_left">学院借阅情况</span></MenuItem>
        </router-link>
        <router-link to="/book_person">
          <MenuItem name="6-3"><span class="double_padding_left">个人借阅情况</span></MenuItem>
        </router-link>
      </Submenu>
    </router-link>
  </Menu>

</template>

            
            <!--<Submenu name="1">
                <template slot="title">
                    <Icon type="md-compass" />
                                            <span>首页</span>
                                            
                                        </template>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title" on-open-change>
                                            <router-link to="/studyindex" active-class="active" class="menu_div">
                                            <Icon type="ios-paper" />
                                            <span>学业分析</span>
                                            </router-link>
                                        </template>
                                        <Submenu title="整体学业情况分析" name="3">
                                            <template slot="title">
                                                <router-link to="/study_total" active-class="active">
                                                整体学业情况分析
                                                </router-link>
                                            </template>
                                                
                                                <MenuItem name="3-1">通识课情况</MenuItem>
                                                <MenuItem name="3-2">专业必修课情况</MenuItem>
                                                <MenuItem name="3-3">专业选修课情况</MenuItem>
                                                <MenuItem name="3-4">专业选修课情况</MenuItem>
                                            </Submenu>
                                        <MenuItem name="2-1">个人学业情况分析</MenuItem>
                                        <MenuItem name="2-2">特殊学业情况分析</MenuItem>
                                    </Submenu>
                                    <Submenu name="4">
                                        <template slot="title">
                                            <Icon type="ios-people" />
                                            <router-link to="/">
                                            上网行为
                                            </router-link>
                                        </template>
                                        <router-link to="/">
                                        <MenuItem name="4-1">个人上网行为分析</MenuItem>
                                        </router-link>
                                        <router-link to="/">
                                        <MenuItem name="4-2">群体上网行为分析</MenuItem>
                                        </router-link>
                                        <router-link to="/">
                                        <MenuItem name="4-3">整体网络状况分析</MenuItem>
                                        </router-link>
                                    </Submenu>
                                    <Submenu name="5">
                                        <template slot="title">
                                            <Icon type="ios-stats" />
                                            <span>消费行为</span>
                                        </template>
                                        <MenuItem name="5-1">总体情况</MenuItem>
                                        <MenuItem name="5-2">学生个体消费情况</MenuItem>
                                        <Submenu name="6" title="学生群体消费情况">
                                            <template slot="title">
                                            学生群体消费情况
                                        </template>
                                            <MenuItem name="6-1">性别消费情况</MenuItem>
                                            <MenuItem name="6-2">消费趋势分析</MenuItem>
                                        </Submenu>
                                        <MenuItem name="5-3">全校热门消费地点</MenuItem>
                                    </Submenu>
                                    <Submenu name="7">
                                        <template slot="title">
                                            <Icon type="md-book" />
                                            <span>借阅行为</span>
                                        </template>
                                        <MenuItem name="7-1">学校借阅情况</MenuItem>
                                        <MenuItem name="7-2">学院借阅情况</MenuItem>
                                        <MenuItem name="7-3">个人借阅情况</MenuItem>
                                    </Submenu>
                                </Menu>  
    </div>
</template>-->


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

<style scoped>
.nav-color {
  color: rgb(195, 197, 203);
  font-weight: 540;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item icon {
  padding-left: 5px;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 1px; /*导航栏圆角 */
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout {
  height: 100%;
}
.ivu-layout-header,
.ivu-layout-header > .ivu-menu-dark {
  background: #fff;
}
.layout-logo {
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  background: #fff;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  border-right: none;
  color: #fff;
  background: #60acfc !important;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 0px;
}
.ivu-menu-item {
  padding-left: 0px;
}
.ivu-menu-submenu
  .ivu-menu-opened
  .ivu-menu-submenu-has-parent-submenu
  .ivu-menu-submenu-title {
  padding-left: 0px;
}
.ivu-menu-submenu-title {
  padding-left: 0px;
}
.double_padding_left {
  padding-left: 5px;
  margin-left: -10px;
}
.icon-move {
  margin-left: -10px;
}
</style>

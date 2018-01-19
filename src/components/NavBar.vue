<template>
  <el-menu mode="horizontal">

    <!--缩放按钮-->
    <div class="toggleBtn-container">
      <i class="fa fa-indent toggleBtn" aria-hidden="true" @click="toggleClick" :enable="toggle"
         v-if="toggle == true"></i>
      <i class="fa fa-outdent toggleBtn" aria-hidden="true" @click="toggleClick" :enable="toggle"
         v-if="toggle == false"></i>
    </div>

    <!--面包屑-->
    <el-breadcrumb separator="/" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="breadCrumbs.length !== 0" v-for="(breadCrumb,index) in breadCrumbs"
                          :to="{ path: breadCrumb.url }" :key="index">
        {{breadCrumb.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!--标签导航-->
    <div class="tabs-view-container">
      <a v-for="(tag,index) in tags" @click="click(index)" style="cursor:pointer;">
        <el-tag class="tabs-view" :close-transition="false" :type="tag.type" :key="index" :closable="true"
                @close="handleClose(index,$event)">{{tag.name}}
        </el-tag>
      </a>
    </div>

    <!--语言切换-->
    <el-dropdown trigger="click" class="language-container">
      <div class="avatar-wrapper">
        <span class="user-name">中文</span>
        <i class="fa fa-caret-down" aria-hidden="true"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link to="/personSetting">
          <el-dropdown-item>中文</el-dropdown-item>
        </router-link>
        <router-link to="/editPassword">
          <el-dropdown-item>English</el-dropdown-item>
        </router-link>
      </el-dropdown-menu>
    </el-dropdown>


    <i class="fa fa-bell-o bellBtn" aria-hidden="true"></i>

    <i class="fa fa-expand screenfullBtn" aria-hidden="true" :enable="isFullScreen" @click="fullScreen"></i>

    <!--下拉组件-->
    <el-dropdown class="avatar-container" trigger="click" :model="admin">
      <div class="avatar-wrapper">
        <span class="user-name">{{admin.name}}</span>
        <img class="user-avatar"
             :src="admin.avatar">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link to="/personSetting">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <router-link to="/editPassword">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span style="display:block;" @click="logout">注销登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-menu>
</template>
<script>
  export default{
    /* global apiUrl */
    data () {
      return {
        toggle: false,
        isFullScreen: false,
        breadCrumbs: [],
        tags: [],
        admin: {
          avatar: 'static/default/img/icon/logo.png',
          name: '管理员'
        }
      }
    },
    created () {
      if (localStorage.breadCrumbs) {
        this.breadCrumbs = JSON.parse(localStorage.breadCrumbs)
      }
      if (localStorage.tags) {
        this.tags = JSON.parse(localStorage.tags)
      }
      if (localStorage.admin) {
        this.admin = JSON.parse(localStorage.admin)
      }
    },
    methods: {
      fullScreen () {
        if (!this.isFullScreen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          }
          this.isFullScreen = true
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isFullScreen = false
        }
      },
      toggleClick () {
        this.$emit('change', !this.toggle)
        this.toggle = !this.toggle
      },
      changeCollapse (isCollapse) {
        if (isCollapse) {
          this.isCollapse = true
          this.slideBarClass = 'slideBar-none'
          this.containerClass = 'marginLeft-none'
          this.navBarClass = 'navBar-none'
        } else {
          this.isCollapse = false
          this.slideBarClass = 'slideBar-normal'
          this.containerClass = 'marginLeft'
          this.navBarClass = 'navBar-normal'
        }
      },
      handleClose (index, event) {
        if (this.tags[index].type === 'primary') {
          if (this.tags.length === 1) {
            this.$router.push('/')
          } else {
            if (index === this.tags.length - 1) {
              this.tags[index - 1].type = 'primary'
              this.$router.push(this.tags[index - 1].url)
            } else {
              this.tags[index + 1].type = 'primary'
              this.$router.push(this.tags[index + 1].url)
            }
          }
        }
        this.tags.splice(index, 1)
        localStorage.tags = JSON.stringify(this.tags)
        event.stopPropagation()
      },
      click (index) {
        for (var i = 0; i < this.tags.length; i++) {
          this.tags[i].type = ''
          if (i === index) {
            this.tags[i].type = 'primary'
          }
        }
        localStorage.tags = JSON.stringify(this.tags)
        this.$router.push(this.tags[index].url)
      },
      changeBreadCrumbs (path) {
        this.breadCrumbs = this.$getBreadCrumbs(this.$list, path)
        localStorage.breadCrumbs = JSON.stringify(this.breadCrumbs)
      },
      changeTags () {
        if (this.breadCrumbs.length > 0) {
          this.tags = this.$getTags(this.breadCrumbs[this.breadCrumbs.length - 1])
          localStorage.tags = JSON.stringify(this.tags)
        }
      },
      logout () {
        var currentUrl = location.href
        var urls = currentUrl.split('/')
        var isOa = localStorage.getItem('is_oa')
        if (isOa === '1') {
          var url = apiUrl + 'logout?is_oa=1&back_url=' + urls[0] + '//' + urls[2] + '/login'
          this.$http.get(url).then(res => {
            location.href = res.data
          })
        } else {
          this.$router.push('/login')
        }
        localStorage.clear()
      }
    },
    watch: {
      '$route' (to, from) {
        this.changeBreadCrumbs(to.path)
        this.changeTags()
      }
    }
  }
</script>
<style>
  .navBar-normal {
    transition: margin-left 0.25s ease-out;
    padding-left: 10px;
    margin-left: 200px;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color: #fff !important;
    border-bottom: 1px solid #dfe6ec;
  }

  .navBar-none {
    transition: margin-left 0.25s ease-out;
    margin-left: 64px;
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color: #fff !important;
    border-bottom: 1px solid #dfe6ec;
  }

  .toggleBtn-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .toggleBtn {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .breadcrumb-container.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }

  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }

  .tabs-view {
    margin-left: 10px;
  }

  .language-container {
    cursor: pointer;
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 274px;
  }

  .bellBtn {
    line-height: 50px;
    position: absolute;
    right: 230px;
    cursor: pointer;
  }

  .screenfullBtn {
    line-height: 50px;
    position: absolute;
    right: 190px;
    cursor: pointer;
  }

  .avatar-container {
    float: right;
    height: 50px;
    display: inline-block;
  }

  .avatar-container .avatar-wrapper {
    height: 50px;
    cursor: pointer;
    padding: 5px 20px 5px 0px;
    position: relative;
  }

  .avatar-container .avatar-wrapper .user-name {
    float: left;
    display: block;
    height: 40px;
    line-height: 40px;
  }

  .avatar-container .avatar-wrapper .user-avatar {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .avatar-container .el-icon-caret-bottom {
    position: absolute;
    right: 20px;
    top: 25px;
    font-size: 12px;
  }

  .user-dropdown {
    font-size: 14px;
  }

  .user-dropdown a {
    color: #333;
  }

</style>

<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark" :collapse="collapse" @select="select">

    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>

    <div :class="companyIconClass" v-model="company">
      <img :src="company.icon" alt="" :class="companyIconImgClass">
      <p :class="companyIconTextClass">{{company.name}}</p>
    </div>

    <el-submenu :index="menu.index" v-for="menu in menus" v-if="menu.subMenus.length !== 0" :key="menu.name">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item-group>
        <router-link :to="subMenu.url" v-for="subMenu in menu.subMenus" :key="subMenu.name">
          <el-menu-item :index="subMenu.index"><span>{{subMenu.name}}</span></el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item :index="menu.index" v-for="menu in menus" v-if="menu.subMenus.length === 0" :key="menu.name">
      <i class="el-icon-menu"></i>
      <span slot="title">{{menu.name}}</span>
    </el-menu-item>

  </el-menu>
</template>
<script>
  /* global apiUrl */
  export default{
    props: {
      collapse: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        companyIconClass: 'companyIcon',
        companyIconImgClass: 'companyIconImg',
        companyIconTextClass: 'companyIconText',
        company: {
          icon: 'static/default/img/icon/logo.png',
          name: '公司名称'
        },
        menus: this.$list
      }
    },
    created () {
      if (localStorage.companyId) {
        var url = apiUrl + 'companys/' + localStorage.companyId
        this.$http.get(url, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => {
          this.company = res.data
        }).catch(error => {
          this.handleError(error)
        })
      }
      this.$root.Bus.$on('setcompany', company => {
        this.company = company
      })
    },
    watch: {
      collapse: function (val, oldVal) {
        if (val) {
          this.companyIconClass = 'companyIcon-collapse'
          this.companyIconImgClass = 'companyIconImg-collapse'
          this.companyIconTextClass = 'companyIconText-collapse'
        } else {
          this.companyIconClass = 'companyIcon'
          this.companyIconImgClass = 'companyIconImg'
          this.companyIconTextClass = 'companyIconText'
        }
      }
    },
    methods: {
      handleError (error) {
        if (error.response.status === 401) {
          localStorage.clear()
          this.$router.push('/login')
        }
      },
      select: function (index, indexPath) {
        switch (index) {
          case '1':
            this.$router.push('/')
            break
          case '4':
            this.$router.push('/settings')
            break
          case '6':
            this.$router.push('/admins')
            break
          case '7':
            this.$router.push('/comment')
        }
      }
    }
  }
</script>
<style>
  .companyIcon {
    margin: 5px 0px;
    text-align: center;
    width: 200px;
    cursor: pointer;
    transition: all 0.25s ease-out;
    height: 135px;
  }

  .companyIcon-collapse {
    cursor: pointer;
    transition: all 0.25s ease-out;
    width: 50px;
    height: 40px;
  }

  .companyIconImg {
    transition: all 0.25s ease-out;
    width: 100px;
    height: 100px;
  }

  .companyIconImg-collapse {
    transition: all 0.25s ease-out;
    width: 40px;
    height: 40px;
    margin-left: 12px;
  }

  .companyIconText {
    text-align: center;
    color: #fff;
    font-size: 14px;
  }

  .companyIconText-collapse {
    display: none;
  }

  .slideBar-normal {
    transition: width 0.25s ease-out;
    width: 200px;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
  }

  .slideBar-none {
    width: 64px;
    transition: width 0.25s ease-out;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
  }

  .el-submenu .el-menu-item {
    min-width: 180px !important;
  }
</style>

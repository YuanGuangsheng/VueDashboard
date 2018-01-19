var Menu = {}
Menu.install = function (Vue, options) {
  Vue.prototype.$list = [
    {
      name: '新闻',
      url: '',
      index: '1',
      subMenus: [
        {
          name: '新闻列表',
          url: '/newsList',
          index: '1-1',
          type: ''
        },
        {
          name: '添加新闻',
          url: '/newsAdd',
          index: '1-2',
          type: ''
        },
        {
          name: '新闻统计',
          url: '/newsChart',
          index: '1-3',
          type: ''
        }
      ]
    },
    {
      name: '设置',
      url: '/settings',
      index: '4',
      subMenus: [],
      type: ''
    }
  ]
}
module.exports = Menu

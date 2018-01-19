var BreadCrumb = {}
BreadCrumb.install = function (Vue, options) {
  Vue.prototype.$getBreadCrumbs = function (menus, path) {
    var breads = []
    for (var i = 0; i < menus.length; i++) {
      if (menus[i].subMenus && menus[i].subMenus.length > 0) {
        for (var j = 0; j < menus[i].subMenus.length; j++) {
          var subMenu = menus[i].subMenus[j]
          if (subMenu.url === path) {
            breads.push(menus[i])
            breads.push(subMenu)
          }
        }
      } else {
        if (menus[i].url === path) {
          breads.push(menus[i])
        }
      }
    }
    return breads
  }
}
module.exports = BreadCrumb


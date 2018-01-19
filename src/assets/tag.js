var Tag = {}
Tag.install = function (Vue, options) {
  Vue.prototype.$getTags = function (tag) {
    var tags = Vue.prototype.$getLocalTags()
    if (tags.length > 0) {
      var existIndex = Vue.prototype.$getTagExistIndex(tags, tag)
      if (existIndex === -1) {
        tags.push(tag)
        Vue.prototype.$setActiveTag(tags, tags.length - 1)
      } else {
        Vue.prototype.$setActiveTag(tags, existIndex)
      }
    } else {
      tags[0] = tag
      tags[0].type = 'primary'
    }
    return tags
  }

  Vue.prototype.$getLocalTags = function () {
    if (localStorage.tags) {
      return JSON.parse(localStorage.tags)
    }
    return []
  }

  Vue.prototype.$setActiveTag = function (tags, index) {
    for (var i = 0; i < tags.length; i++) {
      tags[i].type = ''
    }
    tags[index].type = 'primary'
    return tags
  }

  Vue.prototype.$getTagExistIndex = function (tags, tag) {
    var existIndex = -1
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].name === tag.name) {
        existIndex = i
        break
      }
    }
    return existIndex
  }
}
module.exports = Tag

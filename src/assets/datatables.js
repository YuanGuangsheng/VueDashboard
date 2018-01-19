function DataTables(parentTagId, options) {
  this.el = document.getElementById(parentTagId)
  this.options = options
  this.params = {}
  this.conf = {
    page: 1,
    size: 10,
    sort: {}
  }
  this.listening = false

  // 渲染
  this.render = function () {
    var that = this

    function doing() {
      var table = that._createTable()
      if (that.listening === true) {
        that.el.appendChild(table)
        return
      }
      that.listening = true
      // that.$el.html(table)
      //   .off('click', 'tr .table_action')
      //   .on('click', 'tr .table_action', function (e) {
      //     var index = $(this).index()
      //       , tr = $(this).parents('tr')
      //       , i = tr.index()
      //       , obj = that.getRecord(i);
      //
      //     that.button_fn[index] && that.button_fn[index](obj, tr, that);
      //   })
      //   .off('click', '#Pagination li a')
      //   .on('click', '#Pagination li a', function (e) {
      //     e.preventDefault();
      //     var i = $(this).attr('page');
      //     that.changePage(i);
      //   })
      //   .on('change', '#sizeSelect', function (e) {
      //     e.preventDefault();
      //     var size = $(this).children("option:selected").val();
      //     that.changeSize(size);
      //   })
      //   .off('click', 'th')
      //   .on('click', 'th', function (e) {
      //     if ($(this).attr('data') == undefined) {
      //       return;
      //     }
      //
      //     e.preventDefault();
      //
      //     var field = $(this).attr('data');
      //
      //     if ($.inArray(field, that.sorts) == -1) {
      //       return;
      //     }
      //
      //     if ($(this).hasClass("sorting")) {
      //       $(this).removeClass("sorting");
      //       $(this).addClass('sorting_asc');
      //       that.changeSort(field, "asc");
      //     } else if ($(this).hasClass("sorting_asc")) {
      //       $(this).removeClass("sorting_asc");
      //       $(this).addClass('sorting_desc');
      //       that.changeSort(field, "desc");
      //     } else {
      //       $(this).removeClass("sorting_desc");
      //       $(this).addClass('sorting');
      //       that.changeSort(field, "none");
      //     }
      //   })
      //   .on('change', '.table_check_all', function (e) {
      //     var checked = $(this).is(":checked");
      //     $(".table_check").each(function (i) {
      //       this.checked = checked;
      //     })
      //   })
      //   .off('click', 'tbody tr')
      //   .on('click', 'tbody tr', function () {
      //     var check = $(this).find(".table_check");
      //     var checked = check.is(":checked");
      //     $(this).find(".table_check").each(function () {
      //       this.checked = !checked;
      //     });
      //   });
    }

    var promise = this._getData()
    promise.then(function (result) {
      that.data = result
      doing()
    })
    return that
  }

  // 设置请求参数
  this.setParams = function (params) {
    this.params = params
    return this
  }

  // 设置配置
  this.setConf = function (name, value) {
    this.conf[name] = value
    return this
  }

  // 获取数据
  this.getData = function () {
    return this.data
  }

  // 获取记录
  this.getRecord = function (i) {
    return this.data.list[i]
  }

  // 改变页数并刷新
  this.changePage = function (page) {
    this.setConf('page', parseInt(page))
    this.render()
  }

  // 改变大小并刷新
  this.changeSize = function (size) {
    this.setConf('page', 1)
    this.setConf('size', parseInt(size))
    this.render()
  }

  // 创建整个表格
  this._createTable = function () {
    var table = '<div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">'
    table += this._createHead()
    table += this._createBody()
    table += '<div class="el-table__column-resize-proxy" style="display: none;"></div>' +
      '<div class="resize-triggers">' +
      '<div class="expand-trigger">' +
      '<div style="width: 1680px; height: 441px;"></div>' +
      '</div> <div class="contract-trigger"></div></div></div>'
    table += this._createPageList()
    return table
  }

  this._createColGroup = function () {
    var length = Object.keys(this.fields).length
    var tag = '<colgroup>'
    for (var i = 0; i < length; i++) {
      tag += '<col name="el-table_1_column_' + (i + 1) + '" width="' + 50 + '">'
    }
    tag += '</colgroup>'
    return tag
  }

  // 创建表格头部
  this._createHead = function () {
    var head = '<div class="hidden-columns">' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div> ' +
      '<div></div>' +
      '</div>'
    head += '<div class="el-table__header-wrapper">' +
      '<table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 1679px;">'
    head += this._createColGroup()
    head += '<thead><tr>'
    if (this.fields.id !== undefined && this.hide_check !== true) {
      head += '<th colspan="1" rowspan="1" class="el-table_1_column_1 el-table-column--selection is-leaf">' +
        '<div class="cell"> ' +
        '<label class="el-checkbox">' +
        '<span class="el-checkbox__input">' +
        '<span class="el-checkbox__inner"></span>' +
        '<input type="checkbox" class="el-checkbox__original" value="">' +
        '</span></label></div></th>'
    }
    for (var i in this.fields) {
      if (i === 'id' && this.hide_id === true) {
        continue
      }
      var field = this.fields[i]
      if ($.inArray(i, this.sorts) === -1) {
        head += '<th colspan="1" rowspan="1" class="el-table_1_column_7 is-leaf"><div class="cell">' + field + '</div></th>'
      } else {
        if (this.conf.sort[i] === undefined) {
          head += '<th colspan="1" rowspan="1" class="el-table_1_column_2 is-leaf"><div class="cell">' + field + '<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div></th>'
        } else if (this.conf.sort[i] === 'asc') {
          head += '<th colspan="1" rowspan="1" class="el-table_1_column_2 ascending is-leaf"><div class="cell">' + field + '<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div></th>'
        } else {
          head += '<th colspan="1" rowspan="1" class="el-table_1_column_2 descending is-leaf"><div class="cell">' + field + '<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div></th>'
        }
      }
    }
    head += '<th colspan="1" rowspan="1" class="el-table_1_column_12 is-leaf">' +
      '<div class="cell">操作</div>' +
      '</th>' +
      '<th class="gutter" style="width: 0px;"></th>'
    head += '</tr></thead></table></div>'
    return head
  }

  // 创建表格实体
  this._createBody = function () {
    var body = '<div class="el-table__body-wrapper">' +
      '<table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1679px;">'
    body += this._createColGroup()
    body += '<tbody>'
    var tpl = '<tr class="el-table__row">'
    if (this.fields.id !== undefined && this.hide_check !== true) {
      tpl += '<td class="el-table_1_column_1 el-table-column--selection">' +
        '<div class="cell">' +
        '<label class="el-checkbox">' +
        '<span class="el-checkbox__input"> ' +
        '<span class="el-checkbox__inner"></span>' +
        '<input type="checkbox" class="el-checkbox__original" name="ids[]" value="%{id}%">' +
        '</span></label></div></td>'
    }

    var index = 1
    for (var j in this.fields) {
      if (j === 'id' && this.hide_id === true) {
        continue
      }
      index++
      tpl += ' <td class="el-table_1_column_' + index + '">' +
        '<div class="cell">%{' + j + '}%</div>' +
        '</td>'
    }
    tpl += '<td class="el-table_1_column_12">' +
      '<div class="cell">' +
      '<button type="button" class="el-button el-button--default el-button--small"><span>编辑</span> </button>' +
      '<button type="button" class="el-button el-button--danger el-button--small"><span>删除</span></button>' +
      '</div></td>'
    tpl += '</tr>'
    for (var i in this.data.list) {
      var obj = this.data.list[i]
      if (this.format) {
        this.format(obj, this, i)
      }
      body += this._setValue(tpl, obj)
    }
    body += '</tbody></table></div>'
    return body
  }

  // 创建表格分页
  this._createPageList = function () {
    // 没有数据，不显示分页
    if (this.data.list === undefined || this.data.list.length === 0) {
      return ''
    }
    this.conf.page = this.conf.page > 0 ? this.conf.page : 1
    this.conf.size = this.conf.size > 0 ? this.conf.size : 10
    this.data.total = this.data.total >= 0 ? this.data.total : 0
    var pageData = {
      page: this.conf.page || 1, // 当前页
      size: this.conf.size || 10, // 每页显示数量
      total: this.data.total || 0, // 总共记录
      count: 0, // 当前页记录
      start: (this.conf.page - 1) * this.conf.size + 1, // 开始编号
      end: this.conf.page * this.conf.size, // 结束编号,
      page_total: Math.ceil(this.data.total / this.conf.size) // 总页数
    }
    pageData.count = this.data.list !== undefined ? this.data.list.length : 0
    pageData.end = pageData.end >= pageData.start + pageData.count ? pageData.start + pageData.count - 1 : pageData.end
    pageData.total = pageData.total >= pageData.count ? pageData.total : pageData.count
    pageData.page_total = pageData.page_total > 0 ? pageData.page_total : 1
    // 底部分页条
    var pageSizeList = [10, 25, 50, 100]
    var pageList = '<div style="text-align: center;margin-top: 20px;">' +
      '<div class="el-pagination">' +
      '<span class="el-pagination__total">共 24 条</span>' +
      '<span class="el-pagination__sizes">' +
      '<div class="el-select">' +
      '<div class="el-input">' +
      '<i class="el-input__icon el-icon-caret-top"></i>' +
      '<input autocomplete="off" placeholder="请选择" readonly="readonly" icon="caret-top" type="text" rows="2" class="el-input__inner">' +
      '</div>'
    pageList += '<div class="el-select-dropdown" style="display: none; min-width: 110px;">' +
      '<div class="el-scrollbar">' +
      '<div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">' +
      '<ul class="el-scrollbar__view el-select-dropdown__list" style="position: relative;">'
    for (var i in pageSizeList) {
      var size = pageSizeList[i]
      if (size === this.conf.size) {
        pageList += '<li class="el-select-dropdown__item selected"><span>' + size + ' 条/页</span></li>'
      } else {
        pageList += '<li class="el-select-dropdown__item"><span>' + size + ' 条/页</span></li>'
      }
    }
    pageList += '</div>' +
      '<div class="el-scrollbar__bar is-horizontal"><div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>' +
      '</div><div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>' +
      '</div></div></span>'
    var pageStr = ''
    // 判断上一页按钮是否可用
    if (pageData.page <= 1) {
      pageStr += '<button type="button" class="btn-prev disabled">' +
        '<i class="el-icon el-icon-arrow-left"></i>' +
        '</button>'
    } else {
      pageStr += '<button type="button" class="btn-prev">' +
        '<i class="el-icon el-icon-arrow-left"></i>' +
        '</button>'
    }
    pageStr += '<ul class="el-pager">'
    for (i = 1; i <= pageData.page_total; i++) {
      if (i === pageData.page) {
        pageStr += '<li class="number active">' + i + '</li>'
      } else {
        pageStr += '<li class="number">' + i + '</li>'
      }
    }
    // 显示下一页和尾页
    if (pageData.page >= pageData.page_total) {
      pageStr += '<button type="button" class="btn-next disabled">' +
        '<i class="el-icon el-icon-arrow-right"></i>' +
        '</button>'
    } else {
      pageStr += '<button type="button" class="btn-next">' +
        '<i class="el-icon el-icon-arrow-right"></i>' +
        '</button>'
    }
    pageStr += '<span class="el-pagination__jump">前往<input type="number" min="1" value="' + pageData.page + '" number="true" class="el-pagination__editor">页</span>'
    pageList += pageStr
    pageList += '</div></div></div>'
    return pageList
  }

  // 模板设值
  this._setValue = function () {
    var args = arguments
    return args[0].replace(/%\{(.*?)}%/g, function (match, prop) {
      return (function rep(obj, props) {
        // /\d+/ 会过滤掉带有数字对象属性
        var prop = /\W+/.test(props[0]) ? parseInt(props[0]) : props[0]
        if (props.length > 1) {
          return rep((obj[prop] || {}), props.slice(1))
        } else {
          if (obj != null) {
            return (obj[prop] !== undefined || obj[prop] !== null) ? obj[prop] : ''
          }
        }
      }(typeof args[1] === 'object' ? args[1] : args, prop.split(/\.|\[|\]\[|\]\./)))
    })
  }

  // 初始化
  this._init = function (options) {
    this.conf = $.extend(this.conf, options['conf'] || []) // 配置
    this.data = options['data'] || null // 数据
    this.buttons = options['buttons'] || [] // 按钮
    this.fields = options['fields'] || [] // 字段
    this.sorts = options['sorts'] || [] // 排序字段
    this.hide_id = options['hide_id'] || false // 隐藏ID字段
    this.hide_check = options['hide_check'] || false // 隐藏复选框
    this.format = options['format'] || null// 预处理回调
  }

  // 获取数据
  this._getData = function () {
    var deferred = $.defer()
    $.get(this.conf.url, $.extend({}, this.params, this.conf)).then(function (result) {
      deferred.resolve(result.data)
    }, function (x) {
      deferred.reject(x)
    })
    return deferred.promise
  }
  // 初始化
  this._init(options)
  return this
}

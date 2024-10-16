// 服务器域名地址
var baseUrl = 'http://127.0.0.1/myNews/'

// 获取新闻列表接口
var getNewsList = baseUrl+'Index/getNewsList'

// 根据新闻id获取新闻内容接口
var getNewsById = baseUrl+'Index/getNewsById'

/*
* 自定义函数-跳转新闻正文页面
*/
function goToDetail(id){
  wx.navigateTo({
    url: '../detail/detail?id='+id,
  })
}


module.exports = {
  getNewsList: getNewsList,
  getNewsById: getNewsById,
  goToDetail: goToDetail
}
//index.js
var common = require('../../utils/common.js')

var isEnd = false
var currentPage = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    loadMoreText:'加载更多',
    newsList:[],
    // 幻灯片素材
    swiperImg:[
      { src:'http://www.ahnu.edu.cn/__local/F/72/F2/B24C3AF40EC7554DFC52F5F2113_B103F450_2014E.jpg'},
      { src:'http://www.ahnu.edu.cn/__local/D/E4/67/DAE4773F2786E1ED1EAD86BD385_2A00C4D4_7C44C.png'},
      { src:'http://www.ahnu.edu.cn/__local/4/EF/46/4598EE7BA7F576B4FE1215F96B9_1C119379_AAC9.jpg'}
    ]
  },

  /**
 * 自定义函数--跳转新页面浏览新闻内容
 */
  goToDetail: function (e) {
    // 获取新闻id
    let id = e.currentTarget.dataset.id

    // 跳转新页面
    common.goToDetail(id)
  },

  /**
   * 自定义函数--获取指定页面的新闻数据
   */
  getNewsListByPage: function (page) {
    var that = this

    // 向服务器发请求
    wx.request({
      url: common.getNewsList,
      data:{
        page:page
      },
      success:function(res){
        // 获取新闻总数
        let total = res.data.total

        // 追加更多新闻
        let list = that.data.newsList.concat(res.data.list)

        // 更新新闻数据和新闻总数
        that.setData({
          total:total,
          newsList:list
        })

        // 如果已经显示全部新闻
        if(list.length==total){
          isEnd = true
          that.setData({
            loadMoreText:'已无更多'
          })
        }
        else{
          // 翻下一页
          currentPage++
        }
        
      }
    })


  },

  /**
 * 自定义函数--加载更多新闻
 */
  loadMore: function () {
    // 如果新闻尚未全部加载完毕，并且按钮不在加载状态中
    if(!isEnd&&!this.data.loading){
      // 让按钮出现加载动画
      this.setData({
        loading:true
      })

      // 加载时长
      setTimeout(()=>{
        // 加载当前页面的新闻数据
        this.getNewsListByPage(currentPage)

        // 停止按钮加载动画
        this.setData({
          loading:false
        })

      },1000)
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取第一页新闻
    this.getNewsListByPage(1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
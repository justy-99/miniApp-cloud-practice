// pages/lol-live/index.js
const db = wx.cloud.database()
const LOLCol = db.collection("LOL")

Page({

  data: {
    lolList: [],
    offset: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchLOLData()
  },

  fetchLOLData() {
    LOLCol.skip(this.data.offset).limit(10)
      .get().then( res => {
        const newLolList = [...this.data.lolList, ...res.data]
        this.setData({lolList: newLolList})
        this.data.offset = this.data.lolList.length
      })
  },

  async onItemDeleteTap(event) {
    // 1.将数据库中这条数据删除掉
    const { item, index } = event.currentTarget.dataset
    const res = await LOLCol.doc(item._id).remove()

    // 2.获取到结果删除成功
    if (res) {
      this.setData({ lolList: [], offset: 0 })
      this.fetchLOLData()
    }
  },

  onItemUpdateTap() {

  },

  onReachBottom() {
    this.fetchLOLData()
  }

})
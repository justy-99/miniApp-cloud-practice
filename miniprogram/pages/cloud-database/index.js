// 向云数据库添加数据
// 1.获取数据库
const db = wx.cloud.database()

// 2.获取对应的集合（collection）
const studentsCol = db.collection("students")

const LOLCol = db.collection("LOL")

Page({
  data:{

  },

  // onAddDataTap() {
  //   // 对集合进行新增数据
  //   studentsCol.add({
  //     data: {
  //       name: "james",
  //       age: 25,
  //       address: {
  //         name: '洛杉矶',
  //         code: "101010",
  //         alias: "L.A."
  //       },
  //       hobbies: ["橄榄球", "蹦迪"]
  //     },
  //     // 回调函数
  //     // success: res => {
  //     //   // 返回了该记录的ID
  //     //   console.log("res",res)
  //     // }
  //   }).then( res => {
  //     // promise
      
  //   })
  // },
  async onAddDataTap() {
    // 对集合进行新增数据
    let res = await studentsCol.add({
      data: {
        name: "王红元",
        age: 18,
        address: {
          name: '广东省',
          code: "202020",
          alias: "粤"
        },
        hobbies: ["why", "保存一个视频"]
      }
    })
    console.log("res",res)
  },

  // 动态获取数据
  onAddLOLData() {
    for(let i = 0; i < 10; i++){
      wx.request({
        url: 'https://m.douyu.com/api/room/list',
        data: { type: "LOL", page: i + 1 },
        success: resolve => {
          this.handleAddLOL(resolve.data.data.list)
        }
      })
    }
  },
  // 动态插入数据库
  handleAddLOL(list) {
    for (const item of list) {
      LOLCol.add({ data: item }).then( res => {
        console.log("添加成功：", item.nickname)
      })
    }
  },

  onDelDataTap() {
    
  },
  onUpDataTap() {
    
  },
  onCheckDataTap() {
    
  },

})
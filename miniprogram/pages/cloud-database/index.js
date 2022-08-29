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
  // 删除数据 （一般要写云函数）
  onDelDataTap() {
    // 明确删除某一条
    // LOLCol.doc('058dfefe630b1e271711d81a01463d43')
    //   .remove().then( res => {
    //     console.log(res)
    //   } )

    // 根据数据的条件删除 查询到数据的结果, 将对应的数据都删除掉
    // 年龄大于25岁: 需要使用到查询指令
    const cmd = db.command
    studentsCol.where({
      age: cmd.gt(25)
    }).remove().then(res => {
      console.log(res);
    })
  },
  onUpDataTap() {
    // 1.更新某一条明确的数据
    // 1.1.update的方式  只更新某个字段
    // studentsCol.doc("b69f67c0630ad0e212f7ee8d50a998b9")
    //   .update({
    //     data: {
    //       age: 17
    //     }
    //   }).then(res =>{
    //     console.log(res);
    //   })

    // 1.2.set的方式  直接覆盖整个对象 
    // studentsCol.doc("0a4ec1f9630b182b1be6dada57bd1976")
    // .set({
    //   data: {
    //     age: 30
    //   }
    // }).then(res =>{
    //   console.log(res);
    // })

    // 2.更新多条数据
    const cmd = db.command
    studentsCol.where({
      age: cmd.gt(25)
    }).update({
      data: { age: 10 }
    }).then(res => {
      console.log(res);
    })
  },
  // 查询
  onCheckDataTap() {
    // 1.方式一: 根据id查询某条数据
    // LOLCol.doc("6d85a2b9630b1d421c0ac86369d0871c")
    //   .get().then(res => {
    //     console.log(res.data);
    //   })

    // 2.方式二: 根据条件查询, 多条数据
    // LOLCol.where({
    //   nickname: "不2不叫周淑怡"
    // }).get().then(res => {
    //   console.log(res.data);
    // })

     // 3.方式三: 查询指令, gt[>]/lt[<]   gte [>=]
    // const cmd = db.command
    // LOLCol.where({
    //   rid: cmd.lt(16712)
    // }).get().then(res => {
    //   console.log(res);
    // })

    // 4.方式四: 正则表达式
    // LOLCol.where({
    //   nickname: /z+/i,
    // }).get().then(res => {
    //   console.log(res);
    // })
    // LOLCol.where({
    //   nickname: db.RegExp({
    //     regexp: "z",
    //     options: "i" //忽略大小写
    //   })
    // }).get().then(res => {
    //   console.log(res);
    // })

    // 5.方式五: 获取整个集合中的数据 （小程序最多20条，云函数100条）
    // LOLCol.get().then(res => {
    //   console.log(res);
    // })

    // 6.分页: skip(offset)/limit(size) 
    let page = 0
    // LOLCol.skip(page * 5).limit(5).get().then(res => {
    //   console.log(res);
    // })

    // 7.排序: orderBy("rid")
    // 升序: asc
    // 降序: desc
    // field 过滤需要返回的字段
    LOLCol.field({
      _id: true,
      hn: true,
      nickname: true,
      roomName: true,
      rid: true
    }).skip(page * 5).limit(5).orderBy("rid", "asc").get().then(res => {
      console.log(res);
    })
  },

  // 调到LOL的页面
  onShowLOLDataTap() {
    wx.navigateTo({
      url: '/pages/lol-live/index',
    })
  }

})
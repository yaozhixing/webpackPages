
const getEntry = {
  main: "./src/pages/index/index.js"
}

module.exports = getEntry

// function getEntry() {
//   let entryObj = {}
//   glob.sync("./src/pages/**/*.js").forEach((item) => {
//     let entryArr = []
//     const start = item.indexOf("pages/") + 6; // 起点
//     const end = item.lastIndexOf("/"); // 终点，最后一个反斜杆
//     const name = item.substring(start, end)
//     entryArr.push(item)
//     entryObj[name] = entryArr
//   })
//   return entryObj
//   // { home: ['.src/pages/home/index.js'] }
// }
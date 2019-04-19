fs = require("fs")

getDeps = (path) => {
  //console.log(path)
  dep = /.*\/(.*).coffee/.exec(path)[1]
  lines = fs.readFileSync(path, 'utf-8').split(/\r?\n/).forEach((line) => {
    regex = /require.'(?:.\/)?(.*)'/
    if(regex.test(line)) {
      req = regex.exec(line)[1]
      console.log(`${dep} -> ${req}`)
    }
  })
}

walkDir = (path) => {
  entries = fs.readdirSync(path)
  entries.forEach((e) => {
    stats = fs.statSync(`${path}/${e}`)
    if(e == "node_modules" || e.indexOf("test") != -1) return
    if(stats.isDirectory()) {
      walkDir(`${path}/${e}`)
    }
    //console.log({e})
    if(e.indexOf("coffee") != -1) {
      getDeps(`${path}/${e}`)
    }
  })
}

console.log('digraph G {')
walkDir("../wiki-client")
console.log('}')


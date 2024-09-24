const genran=(rate)=>{
    let u = Math.random()
    let interval = -(1/rate)*Math.log(u)
    return interval
}

let sum = 0
let numberOfTimes = 1
for (let index = 0; index < numberOfTimes; index++) {
    let each = genran(0.05)
    console.log(each)
    sum+=each
}
console.log("average")
console.log(sum/numberOfTimes)

module.exports = genran;
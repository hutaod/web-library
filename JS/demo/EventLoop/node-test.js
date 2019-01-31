// setTimeout(() => {
//     console.log('setTimeout')
// }, 0)
// setImmediate(() => {
//     console.log('setImmediate')
// })

setTimeout(() => {
    console.log('timer1')

    Promise.resolve().then(function () {
        console.log('promise1')
    })
}, 0)

process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
        console.log('nextTick')
        process.nextTick(() => {
            console.log('nextTick')
            process.nextTick(() => {
                console.log('nextTick')
            })
        })
    })
})
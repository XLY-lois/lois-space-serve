module.exports = {
    timestampFormat: function (timestamp) {
        if(!timestamp) return ''
        let time = Date.parse(timestamp)
        let dt = new Date(time)
        return `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
    }
}
module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'Taskems'
        },
        binary: {
             version: '4.0.2' ,
           // version: "latest",
            skipMD5: true
        },
        autoStart: false
    }
}
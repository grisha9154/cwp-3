const net = require('net');
const fs = require('fs');
const port = 8124;

const adress = [];

for(let i=0;i<process.argv.length;i++){
    adress[i] = process.argv[i];
}



const client = new net.Socket();
client.setEncoding('utf8');

client.connect(port, function () {
    console.log('Connected');
    client.write('FILES');
});

client.on('data',function (data) {
    console.log(data);
    switch (data){
        case 'ACK':{
            client.write(buf);
        }break;
    }
});

function getAllDir(dirPath,copydir) {
    for (let i = 0; i < dirPath.length; i++) {
        fs.readdir(dirpath[i], function (err, files) {
            if (!err) {
                for (let i = 0; i < files.length; i++) {
                    fs.stat(dirPath[i] + "\\" + files[i], function (err, stats) {
                        if (stats.isFile()) {
                            fs.readFile(dirPath[i] + '\\' + files[i], function (err, data) {
                                const buf = Buffer.from(data);
                                client.write(buf);
                            })
                        }
                    })
                }
            } else {
                console.log("Ошибка чтения директории");
            }
        })
    }
}
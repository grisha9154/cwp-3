// server.js
const fs = require('fs');
const net = require('net');
const port = 8124;
let seed=0;
const q = [];
const a = [];
fs.readFile("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab2\\PSKP-cwp-2\\QA.json","utf-8",function (err, copydata) {
    let i =0;
    JSON.parse(copydata, function (key,value) {
       if(key!=''){
        q[i] = key;
        a[i] = value;
        i++;
       }
    });

const server = net.createServer(function(client){
    fs.open('client_id.log','a',function (err, file_handler) {
        if(!err){
            const socetname =Date.now()+seed++;
            console.log('Client connected');
            fs.write(file_handler,socetname+": Client connected \n",null, 'utf-8', function(err, written){
                if(err){
                    console.log("Ошибка записии");
                }
            });

            client.setEncoding('utf8');

            client.on('data', function(data){
                console.log('Client say: '+ data);

                fs.write(file_handler,socetname+' say:'+ data+'\n',null, 'utf-8', function(err, written){
                    if(err){
                        console.log("Ошибка записии");
                    }
                });

                for(let i=0;i<q.length;i++){
                    if(q[i]==data){
                        const str =a[getRandomInt(0,2)];
                        client.write(str);
                        fs.write(file_handler,socetname+' answer:'+ str+'\n',null, 'utf-8', function(err, written){
                            if(err){
                                console.log("Ошибка записии");
                            }
                        });
                        return;
                    }
                }
                switch (data){
                    case 'FILES':{
                        client.write('ACK');
                    }break;
                    case 'QA':
                    {
                        client.write('ACK');
                        fs.write(file_handler,socetname+' answer:'+ 'ACK'+'\n',null, 'utf-8', function(err, written){
                            if(err){
                                console.log("Ошибка записии");
                            }
                        });
                    }break;
                    default:
                    {
                        client.end('DEC','utf-8');
                        fs.write(file_handler,socetname+' answer:'+ 'DEC'+'\n',null, 'utf-8', function(err, written){
                            if(err){
                                console.log("Ошибка записии");
                            }
                        });
                    }break;
                }

            });

            client.on('end', function(){ console.log('Client disconnected')
                fs.write(file_handler,socetname+': Client disconnected\n',null, 'utf-8', function(err, written){
                    if(err){
                        console.log("Ошибка записии");
                    }
                });
            } );


        }else {
            console.log("Ошибка открытия");
        }
    });


});
    server.listen(port, function() {
        console.log(`Server listening on localhost:${port}`);});
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
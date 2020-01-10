const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url === '/'){
        res.setHeader('content-type','text/html');
        res.write('<html><head><title>message</title></head><body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body></html>');    
        return res.end();
    }
    if(url === '/message' && req.method ==='POST'){
        const body =[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })

        res.statusCode =302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('content-type','text/html');
    res.write('<html><body><h1>Hello from Pysix server </h1></body></html>');
    res.end();
});

server.listen(1000);
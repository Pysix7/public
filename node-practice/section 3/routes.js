const fs = require('fs');

const requestHandler = (req, res)=>{    
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
            console.log(parsedBody)
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
}
// exporting ways
// 1
// module.exports = requestHandler;

// 2
// module.exports.handler = requestHandler;

// 3 shortcut
// exports.handler = requestHandler;

// 4 multiple export 
// exports = {
//     handler = requestHandler,
//     someText = 'some text to export'
// }

// 5 
exports.handler = requestHandler;
exports.someText = 'some text';

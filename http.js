const http = require('http');
const server = http.createServer();
const PORT = 3444;
const list = [
    {
        id: 0,
        name: 'tanmay',
    }, {
        id: 1,
        name: 'siya',
    },


];

server.on('request', (req, res) => {

    const items = req.url.split('/');
    //items= ['','frinds'] when url is /friends
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            list.push(JSON.parse(friend));
        })
        
    } else if (req.method==='GET' && items[1] === 'friends') {
       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        if (req.method==='GET'&& items.length === 3) {
            const listIndex = Number(items[2]);
            res.end(JSON.stringify(list[listIndex]));
        }
        else {
            res.end(JSON.stringify(list));
        }

    } else if (req.method==='GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>hiiiii</h1>');
        res.write('</body>');
        res.write('</html>');
        res.end();
      
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(PORT, () => {
    console.log(`listening to ${PORT}...`);
});
//fetch('http://localhost:3444/friends',{ method :'POST',body: JSON.stringify({id:2,name:'mommy'})});
//in browser to post data 
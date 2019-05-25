const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {

    // if (req.url === '/'){

    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content);
    //     })

    // }
    // else if(req.url === '/about'){

    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if (err) throw err
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content);
    //     })
    // }
    // else if(req.url === '/api/users'){

    //     const users = [ 
    //         { name: "Bob Smith", age: 40},
    //         { name: "Johnny Depp", age: 50},
    //         { name: "Jennifer Lawrence", age: 29}
    //     ]

    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }

    // Build file path 
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    // Extention name
    let extname = path.extname(filePath)

    // Initial conntentType
    let conntentType = 'text/html'

    // Check ext and set content type
    switch(extname){
        case '.js':
            conntentType = 'text/javascript'
            break
        case '.css':
            conntentType = 'text/css'
            break
        case '.json':
            conntentType = 'application/json'
            break
        case '.png':
            conntentType = 'image/png'
            break
        case '.jpg':
            conntentType = 'image/jpg'
            break
    }

    // Read file
    fs.readFile(filePath,(err, content) => {
        if (err){
            if(err.code === 'ENOENT'){
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    if (err) throw err
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            }
            else{
                // Some server error 
                res.writeHead(500)
                res.end(`Server error: ${error.code}`)
            }
        }else{
            res.writeHead(200, {'Content-Type': conntentType})
            res.end(content, 'utf8')
        }
    })
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => { console.log(`Server running on ${PORT}`) })
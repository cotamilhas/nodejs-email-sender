const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const sendEmail = require('./emailSender');

const opt = {
    'default': { 'folder': 'www', 'document': 'index.html', 'port': 8081, 'favicon': 'favicon.ico' },
    'extensions': {
        'htm': 'text/html; charset=utf-8',
        'html': 'text/html; charset=utf-8',
        'js': 'application/javascript; charset=utf-8',
        'json': 'application/json; charset=utf-8',
        'css': 'text/css; charset=utf-8',
        'gif': 'image/gif',
        'jpg': 'image/jpg',
        'png': 'image/png',
        'ico': 'image/x-icon'
    }
};

function mimeType(fileName) {
    let extension = path.extname(fileName);
    extension = (extension[0] == '.') ? extension.slice(1) : extension;
    return opt.extensions[extension] || 'application/octet-stream';
}

function router(request) {
    let pathname = url.parse(request.url).pathname;
    switch (pathname) {
        case '/': pathname += opt.default.document; break;
        case '/favicon.ico': pathname = opt.default.favicon; break;
    }
    return path.join(__dirname, opt.default.folder, pathname);
}

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/send-email') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', () => {
            try {
                const { to, subject, message } = JSON.parse(body);
                sendEmail(to, subject, message, (error) => {
                    if (error) {
                        response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        response.end('Error sending email.');
                    } else {
                        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                        response.end('Email sent successfully!');
                    }
                });
            } catch (err) {
                response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.end('Invalid request.');
            }
        });
    } else {
        const filename = router(request);
        fs.readFile(filename, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.write('HTTP Status: 404 : NOT FOUND');
            } else {
                response.writeHead(200, { 'Content-Type': mimeType(filename) });
                response.write(data);
            }
            response.end();
        });
    }
});

server.listen(opt.default.port, () => {
    console.log(`Running at http://localhost:${opt.default.port}`);
});

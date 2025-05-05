const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path"); // Keep this as-is

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    let fileLocation;
    let contentType = "text/html";

    console.log("Request for:", pathname);

    if (pathname.startsWith("/css/")) {
        // Serve CSS from /public/css/
        fileLocation = path.join(__dirname, "public", pathname);
        contentType = "text/css";
    } else {
        // Serve HTML pages based on the pathname
        var loc;
        switch (pathname) {
            case "/":
                loc = "index.html";
                break;
            case "/home":
                loc = "index.html";
                break;
            case "/dosen":
                loc = "dosen.html";
                break;
            case "/dosen-add":
                loc = "dosen-add.html";
                break;
            case "/dosen-edit":
                loc = "dosen-edit.html";
                break;
            case "/mhs":
                loc = "mhs.html";
                break;
            case "/mhs-add":
                loc = "mhs-add.html";
                break;
            case "/mhs-edit":
                loc = "mhs-edit.html";
                break;
            default:
                loc = "index.html";
                break;
        }
        fileLocation = path.join(__dirname, "pages", loc);
    }
    // console.log(fileLocation);

    fs.readFile(fileLocation, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});

// nodemon index.js 

const fs = require("fs");
const http = require("http");
// const nodemon = require("nodemon");
// to parse to URL from string to object 
const url = require("url"); 
 
// Reading HTML files
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
 
// console.log(tempCard);
  
// replaceTemplate()
const replaceTemplate = function(template, product) {
    let output = template.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%NAME%}/g, product.name);
    output = output.replace(/{%PRICE%}/g, product.price);

    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%MILEAGE%}/g, product.mileage);
    output = output.replace(/{%HP%}/g, product.HP);
    output = output.replace(/{%REVIEW-0%}/g, product.reviews[0]);
    output = output.replace(/{%REVIEW-1%}/g, product.reviews[1]);
    output = output.replace(/{%REVIEW-2%}/g, product.reviews[2]);

    // console.log("Changed output");   
    // console.log(output);
    return output;
}


// Reading JSON file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {    

    // console.log("URL entered: " + req.url);
    // const pathName = req.url;

    // console.log(url.parse(pathName, true));

    // Get query and pathName
    const {query, pathname} = url.parse(req.url, true);
    console.log("Printing query and pathname");   
    console.log(query); 
    console.log(pathname);
    // console.log(pathname);    
     
   
    // make choices 
    if (pathname === "/" || pathname === "/overview") {
       
       res.writeHead(200, {    
           "Content-type": "text/html"
       }); 
  
       const cardsHTML = dataObj.map(ele => replaceTemplate(tempCard, ele)).join("");

    //    console.log("cardsHTML");  
    //    console.log(cardsHTML);
       const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    //    console.log(output);
       res.end(output);
        
    } else if (pathname === "/product") {  

        const product = dataObj[query.id];
        console.log("Object got from JSON using query");  
        console.log(product);    

        res.writeHead(200, {        
            "Content-type": "text/html"
        });
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    } else if (pathname === "/api") {
        res.end(data); 
    } else {    
        res.end("<h1>Page Not found!</h1>")
    }

}); 

server.listen(8000, "127.0.0.2", () => {
    console.log("Server is running at the port 8000");
});

  




  





    


/*
    <!-- <figure class="card">

                <div class="card__img">
                    <img src="../img/jeep-wrangler.jpg" alt="car image">
                </div>
                <div class="card__desc">
                    <h3>{%NAME%}</h3>
                    <p>{%PRICE%}</p>
                </div>
                <a class="card__details" href="#">Details</a>
            </figure> -->
*/




















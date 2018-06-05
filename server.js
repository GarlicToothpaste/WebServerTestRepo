const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine" , "hbs");

//use(middleware)


//use is how you express middleware
//next exists to say when your middleware function is done
//Middlware is expressed in the order of app.use
app.use((request, response , next) => {
	var now = new Date().toString();
	var log = now + " " + request.method + " " + request.url
	//console.log(now , request.method, request.url)
	fs.appendFile("server.log", log + "\n" , (err) => {
		if(err){
			console.log("Unable to append to server.log");
		}
	});
	next();

});

//Middleware
app.use((request,response,next) => {
	response.render("maintenance.hbs");
});
//Middleware
app.use(express.static(__dirname + '/public'));

//Replaces getCurrentYear in the footer
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear()
});
hbs.registerHelper("screamIt", (text) =>{
	return text.toUpperCase();
});

// get( url, the function express sends back)
app.get('/', (request, response) => {
	// response.send("<h1>Hello Express!</h1>");
	// response.send({
	// 	name: {
	// 		name: "Adrian",
	// 		like: ["Baking",
	// 		"Sleeping"
	// 		]
	// 	}
	// });
	response.render("home.hbs", {
		pageTitle : "Homepage",
		//currentYear : new Date().getFullYear(),
		welcomeMessage: "Welcome to my website!"
	});
});

app.get("/about", (request, response) => {
	//Renders and things that was set up
	response.render("about.hbs", {
		pageTitle: "About Pag",
		//currentYear: new Date().getFullYear()
	})
	//response.send("<h1>About Page</h1>");
});

app.get("/bad" , (request,response) => {
	//console.log(request);
	response.send({
		errorMessage: "Unable to fulfill request..."
	});
});

//binds the application to a port;
app.listen(3000);
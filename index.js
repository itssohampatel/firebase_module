const express = require('express');
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

var serviceAccount = require("emplitrack-380026-firebase.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://emplitrack-380026.firebaseio.com"
});

const app = express(); 
app.use(bodyParser.urlencoded({ 
	extended:true
})); 

app.get("*", function(req, res) {
	res.send("hello");
});
app.post("/", function(req, res) {
	res.send("hello");
});

app.post("/firebase/send_notification", function(req, res){
	let body = req.body;
	let token = body.token;
	delete body.token;

	var messaging = admin.messaging();
	var message = {
		data: body,
		token: token
	};
	try{
	messaging.send(message).then((response) => {
		res.send('success');
	})
	.catch((error) => {
		res.send('Error sending notification : '+error);
	});
	}catch(e){
		console.log(new Date());
		console.log(e);
	}
}); 
app.post("/firebase/send_notification_ios", function(req, res){
console.log('so');
        let body = req.body;
        let token = body.token;
        delete body.token;

        var messaging = admin.messaging();
        var message = {
                notification: body,
                token: token
        };
	try{
	messaging.send(message).then((response) => {
                res.send('success');
        })
	.catch((error) => {
                res.send('Error sending notification : '+error);
        });
	}catch(e){
                console.log(new Date());
                console.log(e);
        }
}); 


// app.post("/firebase/send_signal", function(req, res){
// 	var token = req.body.token;
// 	var signal = req.body.signal;
//
// 	var messaging = admin.messaging();
// 	var message = {
// 		data: {
// 			signal:signal
// 		},
// 		token: token
// 	};
// 	messaging.send(message).then((response) => {
// 		res.send('success');
// 	})
// 	.catch((error) => {
// 		res.send('Error sending notification : '+error);
// 	});
// });

app.listen(5000, function(){
	console.log("server is running on port 5000");
});

var http = require('http');
var mysql = require('mysql');
var url = require('url');

// connect to mysql db
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'sensor',
	password: '1q2w3e4r!',
	database: 'data'
})
connection.connect();


// r is data
r={};
r.seq=1;
r.type='T';
r.device='102';
r.unit='0';
r.ip="192.168.0.2";
r.value=10.9;

//select database
connection.query('use data', function(er){
	console.log("SQL : use date");
});


// server
hostname = '127.0.0.1';
port = 80;
server = http.createServer(function (req, res){
	var uri = req.url;
	var query = url.parse(uri,true).query;
	//get method
	if(req.method == 'GET'){
		r.seq++;
		r.value = query.value;
		r.ip = query.ip;
	}
	var q = connection.query('insert into sensors set ?', r, function(er, rows, cols) {
		console.log("insert : "+ r.value);
	});


	res.writeHead(200,{'content-Type':'text/html'});
	res.end('Hello World\n');
}).listen(port,'');


/*
//select and show all data
connection.query('select * from sensors', function(er,result,fields){

	console.log("result:");
	console.log(result);
	console.log("fields:");
	console.log(fields);
});

*/

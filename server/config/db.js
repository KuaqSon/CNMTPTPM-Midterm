var mysql= require('mysql');
var

var createConnection = ()  =>{
    return mysql.createConnection({
    	hostname: '127.0.0.1',
    	port: '3306',
    	user: 'root',
    	password: '123456',
    	database: 'world'
    });
}


createConnection.connect(function(err) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
   
	console.log('connected as id ' + createConnection.threadId);
  });
// exports.load = sql => {
// 	return Promise((resolve, reject)=>{
// 		var cn = createConnection();
// 		cn.connect();
// 		cn.query(sql, (err, rows, fields)=> {
// 			if(err){
// 				reject(err);
// 			} else {
// 				resolve(rows);
// 			}

// 			cn.end();
// 		});
// 	});
// }

// exports.insert = sql => {
//     return new Promise((resolve, reject) => {
//         var cn = createConnection();
//         cn.connect();
//         cn.query(sql, (err, value) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(value);
//             }

//             cn.end();
//         });
//     });
// }
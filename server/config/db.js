var mysql= require('mysql');


var createConnection = () =>{
	return  mysql.createConnection({
    	host: 'localhost',
    	port: '3306',
    	user: 'root',
		password: 'password',
		database: 'world'
});
};




// createConnection.connect(function(err) {
// 	if (err) {
// 	  console.error('error connecting: ' + err.stack);
// 	  return;
// 	}
   
// 	console.log('connected as id ' + createConnection.threadId);
// 	// createConnection.query("select * from world", function(err, result, fields){
// 	// 	if(err) throw err;
// 	// 	console.log(result);
// 	// });
//   });


// exports.load = sql => {
// 	createConnection.query("select * from world", function(err, result, fields){
// 		if(err) throw err;
// 		console.log(result);
// 	});
// }



exports.load = sql => {
	return new Promise((resolve, reject)=>{
		var cn = createConnection();
		cn.connect();
		cn.query(sql, (err, rows, fields)=> {
			if(err){
				reject(err);
			} else {
				resolve(rows);
			}

			cn.end();
		});
	});
}

exports.insert = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}
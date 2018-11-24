var db = require('../config/db');
//state = 0 NO driver accept
// state =1 Driver accept
exports.loadAll = () => {
	var sql = 'select * from request order by created desc';
	return db.load(sql);
};

exports.loadRequest = () => {
	var sql = 'select * from request where isDelete = 0';
	return db.load(sql);
};

exports.loadRequestNew = () => {
	var sql = 'select * from request where isDelete = 0 and state = 0';
	return db.load(sql);
}

exports.accept = (idRequest, idDriver) => {
	var sql = 'update request set state = 1, idDriver = '+ idDriver +' where id = '+ idRequest +' and state = 0';
	return db.load(sql);
}

exports.findByTelephone = (telephoneNumber) =>{
	var sql = 'select name from request where telephone = ' + telephoneNumber;
	return db.load(sql);
};

exports.findByName = (name) =>{
	var sql = 'select * from request where name = "' + name+ ' " ';
	return db.load(sql);
};

exports.findById = (Id) =>{
	var sql = 'select name from request where id = ' + Id;
	return db.load(sql);
};

exports.edit = (id, telephoneNumber, name , address, infor) =>{
	var sql = 'update request set telephone = ' + telephoneNumber + ', name = "' + name + '", address = "' + address + '", infor = "' + infor + '" where id = ' + id;
	return db.load(sql); 
}

exports.addRequest = (name, telephoneNumber, address, infor, lat, log, idUser) =>{
	var sql = 'insert into request value (default, ' + telephoneNumber + ', "'+ name +'", "' + address + '" , "'+ infor +'", 1 ,'+ lat +','+ log +','+ idUser +',0, default, default)';
	return db.load(sql);
}

exports.setState = (id, state) => {
	var sql = 'update request set state = "' + state + '" where id = ' + id;
	return db.load(sql);
}

exports.setPoint = (id, lat, log) => {
	var sql = 'update request set lat = "' + lat + '", log = "' + log + '" where id = '+ id;
	return db.load(sql);
}

exports.deleteRequest = (id) => {
	var sql = 'update request set isDelete = 1 where id = '+ id;
	return db.load(sql);
}


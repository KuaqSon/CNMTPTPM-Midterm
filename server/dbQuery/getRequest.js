var db = require('../config/db');

exports.loadAll = () => {
	var sql = 'select * from request';
	return db.load(sql);
};

exports.findByTelephone = (telephoneNumber) =>{
	var sql = 'select name from request where telephone = ' + telephoneNumber;
	return db.load(sql);
};

exports.findByName = (name) =>{
	var sql = 'select * from request where name = ' + name;
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

exports.addRequest = (name, telephoneNumber, address, infor) =>{
	var sql = 'insert into request value (default, ' + telephoneNumber + ', "'+ name +'", "' + address + '" , "'+ infor +'", default, default, default)';
	return db.load(sql);
}

exports.setState = (id, state) => {
	var sql = 'update request set state = ' + state + ' where id = ' + id;
	return bd.load(sql);
}
'use strict';
var mtn = require('../bots/mtn.js');
var syriatel = require('../bots/syriatel.js');
var bemo = require('../bots/bemo.js');
var User = require('../model/user.js');
const readCapatcha = require('./capatcha')
var Bill = require('../model/bill.js');
var Company = require('../model/company.js');
var Notification = require('../model/notification.js');
//var readyMtn = mtn.initialization();
 //var readsy = syriatel.initialization();
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = function(req, res) {
 
  var user = new User(req.body);

  //handles null error 
   if(!user.email || !user.password){

            res.status(400).send({ error:true, message: 'Please provide email and password' });
            console.log(user);

        }
else{
  console.log("start login prosses");
  User.login(user.email,user.password , function (err, result){
    if (err)
    res.send(err);
  res.json(result);

  }) ; 
}
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_bill_by_point_sale = function(req, res) {
  var new_task = new Task(req.body);

  var user = new User(req.body);

  //handles null error 
   if(!user.email || !user.password){

            res.status(400).send({ error:true, message: 'Please provide email and password' });
            console.log(new_task);

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create_bill= function(req, res){

  console.log(req.body);
  var new_bill = new Bill(req.body);

  //handles null error 
   if(!new_bill.id_point_sale  || !new_bill.amount || !new_bill.commission || !new_bill.phone || !new_bill.id_company ){

            res.status(400).send({ success:false, message: 'The bill was not created , Please provide bill items' });
            //console.log(new_bill);

        }
else{
  Bill.create_bill(new_bill, function(err, bill) {
    
    if (err)
      res.send(err);
      else
      {
        if(new_bill.id_company==1)
         res.status(400).send({ success:false, message: 'we havent this bot yeat' });
        //bemo.payment(new_bill,res)
        else if(new_bill.id_company==2)
        //res.status(400).send({ success:readCapatcha('jcaptcha.jpg'), message: 'we havent this bot yeat' });
        mtn.payment(new_bill,res)
        else
        res.status(400).send({ success:false, message: 'we havent this bot yeat' });
        
  }
  });

}

};

exports.query= function(req, res){

  console.log(req.body);
  var new_query = new Bill(req.body);

  //handles null error 
   if(!new_query.id_point_sale  || !new_query.amount || !new_query.commission || !new_query.phone || !new_query.id_company || !new_query.type ){

            res.status(400).send({ success:true, message: 'fail query , Please provide bill items' });
        }
else{
  // start query .
  bemo.query(new_query, res);


}

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_all_companies = function(req, res) {
  Company.getAllCompanies(function(err, companies) {

    console.log('controller get all task')
    if (err)
      res.send(err);
     // console.log('res', companies);
    res.send(companies);
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update_company= function(req, res) {
  Company.updateById( new Company(req.body), function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};




/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_notification_by_id_comapany = function(req, res) {
  Notification.getNotificationByIdComapany(req.params.id_company, function(err, notifications) {
    if (err)
      res.send(err);
    res.status(200).json(notifications);
  });
};





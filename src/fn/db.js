var mysql= require('mysql');

exports.Load=sql=>{
    return new Promise((resolve,reject)=>{
        var cn= mysql.createConnection({
            host: 'localhost',
            port: ,
            user:'root',
            database:'', 
            password:''
            
        });
        cn.connect();

        cn.query(sql,function(error, rows, fields){
            if(error){ 
            reject(error);
        }else{
                resolve(rows);
            }
            cn.end();
        });

    });
}
exports.save= sql=>{
    return new Promise((resolve, reject)=>{
        var cn= mysql.createConnection({
            host: 'localhost',
            user:'root',
            port: ,
            database:'', 
            password:'',
            insecureAuth: true
        });
        cn.connect();
        cn.query(sql,function(error,value){
            if(error)
            {
                reject(error);
            }
            else{
                resolve(value);
            }
            cn.end();
        });
    });
}
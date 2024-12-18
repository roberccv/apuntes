const bcrypt = require('bcrypt');

users = {};

users.data = {}; //porpiedad del objeto users para utilizarla como una BD
//alamcan usuarios que registres 

//carlos: { username: "carlos", hash: "hash_de_carlos", last_Login: "fecha" }



users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}


users.comparePass =  async function(password, hash){
    return await bcrypt.compare(password, hash);
}


users.register = function(username, password){


    //comprobamos si userdata contiene el usuario ya registrado, para evitar usuario duplicados
    //hasOwnProperty comprueba user.data contiene la propiedad  username
    if(users.data.hasOwnProperty(username)){
        throw new Error (` Ya existe el usuario ${username}`)
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error (`Error al generar el hash de ${username}.`);
        }

        users.data[username] = {username, hash, last_Login: new Date().toISOString, cookiesAccepted: false}
       // console.log(users.data);
    
    });
}

users.isLoginRight = async function (username, password) {
    if(!users.data.hasOwnProperty(username)){
        throw new Error(`El usuario ${username} no está registrado. Por favor, regístrate.`);
    }
    const isValid = await users.comparePass(password, users.data[username].hash);

    if(!isValid){
        throw new Error(`La contraseña para ${username} es incorrecta.`);
    }
    return true;
    
}

module.exports = users;
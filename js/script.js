var log_in = document.getElementById("log_in");
log_in.addEventListener("click",ingresar);

function ingresar(ev) {
  if (usuario.value != "paul" && password.value != "paul") {
    ev.preventDefault();
    alert("Usuario y Contraseña invalidos");
  }
  return true
}


if (window.openDatabase){
    var mydb =openDatabase("form_db ", "0.1", "formulario base de datos", 2*1024*1024);

    mydb.transaction(function (t) {
      t.executeSql("CREATE TABLE IF NOT EXISTS persona (id INTEGER PRIMARY KEY ASC, \n\
                  nombre text , apellidos text ,dni integer , nacimiento date \n\
                  genero text ,profesion text, estudios text , email text , telefono integer \n\
                  usuario text, clave text , validarclave text)");
    });
}
  else {
      alert("no se pudo");
}

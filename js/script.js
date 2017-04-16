var log_in = document.getElementById("log_in");

if (log_in) {
  log_in.addEventListener("click",ingresar);
}

function ingresar(ev) {
  if (usuario.value != "paul" && password.value != "paul") {
    ev.preventDefault();
    alert("Usuario y Contraseña invalidos");
  }
  return true
}


if (window.openDatabase){
    var mydb =openDatabase("persona ", "0.1", "formulario base de datos", 8*1024*1024);

    mydb.transaction(function (t) {
      t.executeSql("CREATE TABLE IF NOT EXISTS persona(INTEGER PRIMARY KEY autoincrement, \n\
                  nombre text , apellidos text ,dni integer , nacimiento date, genero text,\n\
                   profesion text,email text , telefono integer, \n\
                  usuario text, clave text , validarclave text)");
    });
}
else {
      alert("No se pudo crear la base de datos");
}
var guardar = document.getElementById("guardar")
if (guardar) {
  guardar.addEventListener("click", add);
}
function add() {
  if (mydb){
    var genero;
    var nombre = document.getElementById("name").value;
    var apellidos = document.getElementById("apellidos").value;
    var dni = document.getElementById("dni").value;
    var nacimiento = document.getElementById("fecha-de-nacimiento").value;
    var profesion = document.getElementById("profesion").value;
    var email= document.getElementById("e-mail").value;
    var telefono = document.getElementById("phone").value;
    var usuario = document.getElementById("usuario").value;
    var clave = document.getElementById("clave").value;
    var validarclave = document.getElementById("v-clave").value;

    if(nombre !== "" && apellidos !== "" && dni !== "" && nacimiento !== "" && profesion !== "" && email !== "" && telefono !== "" && usuario !== "" && clave !== "" &&  validarclave !==""){
      mydb.transaction(function(t){
        t.executeSql("INSERT INTO persona(nombre,apellidos,dni,nacimiento,profesion, email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?)",[nombre,apellidos,dni,nacimiento,profesion,email,telefono,usuario,clave,validarclave]);
         alert("funciona");
         outputCars();
      });
    }else {
      alert("Faltan espacios por llenar");
    }
  }else {
    alert("db no");
  }
}
function outputCars() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM persona", [], updateCarList );
        });
    } else {
        alert("db no encontrado");
    }
}
function updateCarList(transaction,results) {

    var listitems = "";
    var tabla = document.getElementById("table");
    var template = "";
    tabla.innerHTML = "";

    for (i = 0; i < results.rows.length; i++) {
      var row = results.rows.item(i);

      template +="<tr><td>"+ row.id+" </td> ";
      template +=" <td>"+ row.nombre+" </td>";
      template += "<td>"+ row.apellidos+"</td>";
      template +=" <td>"+ row.dni+" </td>";
      template += "<td>"+ row.nombre+" </td>";
      template += "<td>"+ row.estado+" </td>";
      template +=  "<td><a class= 'editarfila'> E </a> <a onclick='deletepersona(" + row.id + ");' class= 'borrarfila'  >X</a> </td></tr>";
    }
    tabla.innerHTML = template

}
outputCars();

function deletepersona(id) {
    if (mydb) {
      mydb.transaction(function (t) {
            t.executeSql("DELETE FROM persona WHERE id=?", [id], outputCars);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

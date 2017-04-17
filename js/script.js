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
    var mydb =openDatabase("persona ", "0.1", "formulario base de datos", 2*1024*1024);

    mydb.transaction(function (t) {
      t.executeSql("CREATE TABLE IF NOT EXISTS persona(INTEGER PRIMARY KEY autoincrement, \n\
                  nombre text , apellidos text ,dni integer , nacimiento date, genero text,\n\
                   profesion text,estudios text ,email text , telefono integer, \n\
                  usuario text, clave text , validarclave text)");
    });
}
else {
      alert("No se pudo crear la base de datos");
}
var guardar = document.getElementById("guardar")
var search_btn = document.getElementById("search_button")
if (guardar) {
  guardar.addEventListener("click", add);
}
if (search_btn) {
  search_btn.addEventListener("click",search);
}

function search(){
  if(mydb){
    var search_value = document.getElementById("search").value;
    if(search_value!=""){
      mydb.transaction(function(t){
        t.executeSql('SELECT * FROM persona WHERE (nombre LIKE ? and dni LIKE ?)', ['%'+search_value+'%','%'+search_value+'%'], updatePersonList);
      })
    }
    else {
      alert("El valor no puede estar vació")
    }
  }else {
    alert("db no");
  }
}
function add() {
  if (mydb){
    var genero;
    var sexo = document.getElementsByName("sexo");
    for (var i = 0; i < sexo.length; i++) {
      if (sexo[i].checked) {
        genero=sexo[i].value;
      }
    }
    var estudio;
    var grado = document.getElementsByName("nivel");
    for (var i = 0; i < grado.length; i++) {
      if (grado[i].checked) {
        estudio=grado[i].value;
      }
    }

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

    if(nombre !== "" && apellidos !== "" && dni !== "" && nacimiento !== "" && genero !== "" &&profesion !== ""&& estudio!== "" && email !== "" && telefono !== "" && usuario !== "" && clave !== "" &&  validarclave !=="" && clave == validarclave){
      mydb.transaction(function(t){
        t.executeSql("INSERT INTO persona(nombre,apellidos,dni,nacimiento,genero,profesion, estudios,email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellidos,dni,nacimiento,genero,profesion,estudio,email,telefono,usuario,clave,validarclave]);
         alert("funciona");
         outputPeople();
         window.location = "backoffice.html";
         });
    }else if(clave == validarclave){
      alert("Faltan espacios por llenar");

    }
    else {
      alert("vuelve a escribir la clave")
    }
  }else {
    alert("db no");
  }

}
function outputPeople() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM persona", [], updatePersonList );
        });
    } else {
        alert("db no encontrado");
    }
}
var buscador = 1;

function updatePersonList(transaction,results) {
    var tabla = document.getElementById("table");
    var messsages = document.getElementById('messages');
    var template = "";
    if (tabla) {

      tabla.innerHTML = "";

    }
    if (results.rows.length > 0) {
      for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        buscador += i;

        template +="<tr><td>"+ row.id+" </td> ";
        template +=" <td>"+ row.nombre+" </td>";
        template += "<td>"+ row.apellidos+"</td>";
        template +=" <td>"+ row.dni+" </td>";
        template += "<td>"+ row.genero+" </td>";
        template += "<td> <input type= checkbox  class=estado/> </td>";
        template +=  "<td><a  href =create_person.html class= 'editarfila'> E </a> <a onclick='deletepersona(" + row.id + ");' class= 'borrarfila'  >X</a> </td></tr>";
      }
      if (tabla ) {
        tabla.innerHTML = template;
        
        messages.innerHTML = (results.rows.length) + " resultados";
      }
    }
    else {
      if (tabla ) {

        tabla.innerHTML = "";

        messages.innerHTML = "Ningun dato para mostrar";
      }
    }


}
outputPeople();

function deletepersona(id) {
    var mensaje = confirm("estas seguro");
    if (mydb && mensaje) {
      mydb.transaction(function (t) {
            t.executeSql("DELETE FROM persona WHERE id=?", [id], outputPeople);


        });
    } else {
        alert("Gracias por no borrarme");
    }
}
var limpiar =document.getElementById("limpiar");
if (limpiar) {

  limpiar.addEventListener("click", nuevo);
}

function nuevo(){

  var nombre = document.getElementById("name");
  var apellido = document.getElementById("apellidos");
  var dni= document.getElementById("dni");
  var profesion = document.getElementById("profesion");
  var e_mail = document.getElementById("e-mail");
  var phone = document.getElementById("phone");
  var usuario = document.getElementById("usuario");
  var clave = document.getElementById("clave");
  var validarclave = document.getElementById("v-clave");

  nombre.value = "";
  apellido.value="";
  dni.value="";
  profesion.value="seleccione";
  e_mail.value="";
  phone.value="";
  usuario.value="";
  clave.value="";
  validarclave.value="";

}

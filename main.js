let voornaam = document.getElementById("voornaam")
let email = document.getElementById("email")
let bericht = document.getElementById("bericht")

function post_form(){
    let input_voornaam = voornaam.value
    let input_email = email.value
    let input_bericht = bericht.value

    if(input_voornaam && input_email && input_bericht){
      var table = document.getElementById("user_table");
      table.innerHTML += `
      <tr>
            <td>${input_voornaam}</td>
            <td>${input_email}</td>
            <td>${input_bericht}</td>
      </tr>
    `;
    }

    

  voornaam.value = "";
  email.value = "";
  bericht.value = "";

  return false;

}
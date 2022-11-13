console.log("Hello World!")
let leeftijd = 20
let isOpdrachtAf = false

const naam = "Sander"

console.log(typeof(leeftijd))
leeftijd = leeftijd.toString()
console.log(typeof(leeftijd))

let randomNumber = Math.floor((Math.random() * 6) + 1)
console.log(randomNumber)



console.log(`Mijn leeftijd is ${leeftijd}`)

let lijst = ["Sander", "Luuk", "Samy", "Dylan", "Max", "Arthur"]
console.log(lijst.reverse())

let student = {
    naam: "Sander",
    studentnummer: 500893511,
    email: "sander.sekreve@hva.nl"
}

console.log(student.email)


//---------------



window.onload = () => {
    let home_button = document.getElementById("first_item");
    home_button.href = "index.html";

    let new_button = document.getElementById("new_button");
    new_button.href = "new.html";


    





    let add_button = document.getElementById("add_button")

    add_button.addEventListener("click", post_message);

    function post_message(){
        let todo_lijst = document.getElementById("todo_lijst")

        let form_input = document.getElementById("message_textarea")

        let parentdiv = document.createElement("div")

        let error_message = document.getElementById("error_message")

        let post_date = new Date().toLocaleString()

        let name_input = document.getElementById("message_name")

        if(form_input.value == '' || name_input.value == ''){
            error_message.innerHTML = "Vul alles in!"
        }else{
            

            error_message.innerHTML = ""
            
            let item_text = document.createElement('p')
            item_text.innerHTML = form_input.value

            item_text.innerHTML += ` -  Door: ${name_input.value} - ${post_date}`
    
            let delete_button = document.createElement('i')
            delete_button.classList.add('fa-solid', 'fa-trash');
    
            item_text.append(delete_button)
            todo_lijst.append(parentdiv)
            parentdiv.append(item_text)

            form_input.value = ""
            name_input.value = ""
            
            delete_button.addEventListener("click", () => {
                item_text.parentElement.remove()
            });

            let timestamp = new Date();
            let message = new Message(
                null,
                timestamp.toISOString().slice(0, 19).replace('T', ' '), 
                form_input.value
            );

            insert_message_db(message)
        }

        

    }


    let todo_lijst = document.getElementById("todo_lijst")

    FYSCloud.API.queryDatabase(
        "SELECT * FROM message"
    ).then(function(data) {
        show_messages(data)
        
    }).catch(function(reason) {
        console.log(reason);
    });


    function show_messages(data){
        for(let i = 0; i < data.length; i++){
            let message = data[i].message

            let parentdiv = document.createElement("div")
            
            let item_text = document.createElement('p')
            item_text.innerHTML = message
        
            let delete_button = document.createElement('i')
            delete_button.classList.add('fa-solid', 'fa-trash');
        
            item_text.append(delete_button)
            todo_lijst.append(parentdiv)
            parentdiv.append(item_text)

            delete_button.addEventListener("click", () => {
                item_text.parentElement.remove()
            });
        }
    }

    function insert_message_db(message){
        FYSCloud.API.queryDatabase(
            "INSERT INTO `message` (`timestamp`, `message`) VALUES (?, ?);",
            [message.timestamp, message.message]
        )
        .then(response => {
            message.id = response.insertId;
            displayMessage(message);
        })
        .catch(function(reason) {
            console.error(reason);
        });
    }

    function displayMessage(message){
        let parentdiv = document.createElement("div")

        let item_text = document.createElement('p')
        item_text.innerHTML = message.message

        item_text.innerHTML += ` -  tijd: ${message.timestamp} - id: ${message.id}`

        let delete_button = document.createElement('i')
        delete_button.classList.add('fa-solid', 'fa-trash');

        item_text.append(delete_button)
        todo_lijst.append(parentdiv)
        parentdiv.append(item_text)

        
        delete_button.addEventListener("click", () => {
            item_text.parentElement.remove()
            //delete uit de database
        });
    }
}







function delete_message(child){
    // let e = document.querySelector("#boardcontainer p")
    // // e.parentNode.remove();
    // // e.parentNode.remove();

    // e.parentNode.style.display='none'
    //e.parentNode.style.border='none';


    //document.getElementById("message_board").removeChild("#boardcontainer")
    
}








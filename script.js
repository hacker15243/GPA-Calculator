//variables:

//Array:
let matrix = [["Count", "Subject", "Grade", "Type"]];
let listOfNames = [];


//importing firebase stuff
import {
    db, auth, provider, onAuthStateChanged, signInWithPopup, signOut,
    doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc,
    deleteField
} from './firebaseModule.js';
let user;
//authentication
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
if (signInButton && signOutButton) {
    signOutButton.style.display = "none";
}
const userIcon = document.getElementById("userIcon");
if (userIcon) {
    userIcon.innerHTML = "<i class='material-symbols-outlined'>person</i>";
}
const userLoginStatus = document.getElementById("userLoginStatus");
const userIconText = document.getElementById("userIconText"); 

const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user;
            console.log(user);
            signInButton.style.display = "none";
            signOutButton.style.display = "";
            userIconText.innerHTML = user.email; 
            AddUser();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("you have signed out successfully!");
        signOutButton.style.display = "none";
        signInButton.style.display = "";
        userIconText.innerHTML = "Guest";
    }).catch((error) => { })
}
onAuthStateChanged(auth, (app_user) => {
    if (app_user) {
        //alert("you are signed in " + app_user.email);
        user = app_user;
        signInButton.style.display = "none"; 
        signOutButton.style.display = ""; 
        userIconText.innerHTML = user.email;
    } else {
        //alert("you are signed out");
        user = null;
    }
});

if (signInButton && signOutButton) {
    signInButton.addEventListener('click', userSignIn);
    signOutButton.addEventListener('click', userSignOut);
}
//all buttons are stored into variables, so that they can be called upon
// using event listeners in the code.
var addCourseButton = document.getElementById("addCourseButton");
var calculateButton = document.getElementById("calculateButton");
var chatButton = document.getElementById("chatButton");
var sendButton = document.getElementById("sendButton");
var resetButton = document.getElementById("resetButton");
var load = document.getElementById("loadButton");
//var printButton = document.getElementById("printButton");
//var deleteButton = document.getElementById("deleteButton");
//var saveButton = document.getElementById("saveButton");
//event listeners
//when a button clicked, a function is called
//Add Course Button
addCourseButton.addEventListener('click', function () {
    addCourse();
});
//calculate button
calculateButton.addEventListener('click', function () {
    popUpBox("calculate");
});
//open chatbot button
chatButton.addEventListener('click', function () {
    var chatbot = document.getElementById("chatbot");
    if (chatbot.style.display === "none") {
        chatbot.style.display = "block";
    }
    else {
        chatbot.style.display = "none";
    }
});
//send button for chatbot
sendButton.addEventListener('click', function () {
    var userInput = document.getElementById("message").value;
    displayUserInput(userInput, "chat_outgoing");
    var answer = answerQuestion(userInput);
    createChatMessage(answer, "chat_incoming");
});
resetButton.addEventListener('click', function () {
    popUpBox("reset");
});

//Chatbot Code
//function to create chatbot message with the answer to the user's
// question.
//uses appendChild() to do so
function createChatMessage(message, className) {
    var chatMessage = document.createElement("li");
    chatMessage.classList.add("chat_incoming", className);
    chatMessage.textContent = message;
    var startMessage = document.getElementById("startMessage");
    var pixelsDown = parseInt(startMessage.style.bottom) - 60;
    chatMessage.style.bottom = pixelsDown + "px";
    var chat = document.getElementById("user_message");
    chat.appendChild(chatMessage);
    return chatMessage;
}
//function to create message in the chatbot that displays what the user
//entered
function displayUserInput(userInput) {
    var userMessage = document.getElementById("user_message");
    userMessage.textContent = userInput;
}



//function to answer the user's question
//uses keywords such as "weighted" or "unweighted" in user input to
// answer questions
//uses if conditions to check for keywords
//converts user input to all lowercase for user input validation. This
// prevents errors because of casing.
function answerQuestion(input) {
    input = input.toLowerCase();
    var answer = "Could not find answer. Perhaps you spelled something wrong, or I just don't know the answer to this question yet.";
    if (String(input).includes("weighted") &&
        String(input).includes("unweighted")) {
        answer = "Unweighted GPA is your Grade Point average solely based on the grades your receive in your classes. Each letter grade has a numerical value relating to it. The values for each grade are added up and divided by the total number of classes, forming your unweighted GPA. Meanwhile, your Weighted GPA takes into account the level of the classes you are taking. AP and Honors Classes boost your weighted GPA. It is calculated by taking the unweighted GPA, multiplying it by the number of classes, adding 1.0 for each AP or Honors course taken, and dividing that total by the class count.";
    }
    else if (String(input).includes("weighted")) {
        answer = "Your Weighted GPA takes into account the level of the classes you are taking. AP and Honors Classes boost your weighted GPA. It is calculated by taking the unweighted GPA, multiplying it by the number of classes, adding 1.0 for each AP or Honors course taken, and dividing that total by the class count.";
    }
    else if (String(input).includes("unweighted")) {
        answer = "Unweighted GPA is your Grade Point average solely based on the grades your receive in your classes. Each letter grade has a numerical value relating to it. The values for each grade are added up and divided by the total number of classes, forming your unweighted GPA";
    }
    return answer;
}



// Function to add a new row with dropdowns to the table
//stores the table in a variable
//uses table.insertRow() to insert a new row
//uses a for loop to go through each row and add a new cell to each one.
// Depending on whether a dropdown or textbox is needed, it adds that using
// cell.appendChild();
//Then it adds options to the dropdown using dropdown.add();
//assigns each letter grade in the dropdown a numerical value using
// options.value(). This value is used to calculate unweighted and weighted
// GPA.
function addCourse() {
    var table = document.getElementById("dynamic-table").getElementsByTagName('tbody')[0];
    //This inserts a new row in the table
    //let tempArray = [];
    var newRow = table.insertRow(table.rows.length);
    for (var i = 0; i < 4; i++) {
        var cell = newRow.insertCell(i);
        if (i === 1) {
            var textBox = document.createElement("input");
            textBox.type = "text";
            cell.appendChild(textBox);
        }
        else if (i === 0) {
            var count = document.createElement("p");
            count.textContent = table.rows.length;
            cell.appendChild(count);
        }
        else {
            var dropdown = document.createElement("select");
        }
        // Add options to the dropdown
        if (i === 2) {

            var gradeNumList = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3,
                1.0, 0.0];
            var gradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+",
                "D", "F"];
            for (var j = 0; j < 11; j++) {
                var options = document.createElement("option");
                options.value = gradeNumList[j];
                options.text = gradeList[j];
                dropdown.add(options);
            }
            cell.appendChild(dropdown);
        }
        if (i === 3) {
            var classType = ["Regular", "AP"];
            for (var j = 0; j < 2; j++) {
                var options = document.createElement("option");
                options.value = j;
                options.text = classType[j];
                dropdown.add(options);
            }
            cell.appendChild(dropdown);
        }
    }
    //addSubjectToDB();
}6


// Function to read the table data
//Goes through each row and stores the number of ap classes in a variable
//calls calculateWeighted() and calculateUnweighted() to calculate GPA
//Prints GPA on screen by using appendChild();
function calculate() {
    var paragraph = document.getElementById("details");
    paragraph.textContent = "";
    var table = document.getElementById("dynamic-table");
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var total = table.rows.length - 1;
    var totalAp = 0;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var dropdown = cells[3].getElementsByTagName('select')[0];
        totalAp += Number(dropdown.value);
    }
    var unweightedGPA = calculateUnweighted(rows, total);
    var weightedGPA = calculateWeighted(totalAp, unweightedGPA, total);
    var text = document.createTextNode("Total: " + total + '\n');
    paragraph.appendChild(text);
    var text1 = document.createTextNode("Total AP: " + totalAp);
    paragraph.appendChild(text1);

    var text2 = document.createTextNode("\nUnweighted GPA: " + unweightedGPA);
    paragraph.appendChild(text2);
    var text3 = document.createTextNode("\nWeighted GPA: " + weightedGPA);
    paragraph.appendChild(text3);

    //This is the function that puts all of the data into the database
    saveData(rows, unweightedGPA, weightedGPA, total);
}


//Save data takes the data that can be found in the table, and iterates through
//It saves the data into the user's database if they are logged in
function saveData(rows, unweightedGpa, weightedGpa, Total) {
    console.log(userLoginStatus);
    console.log(rows);
    //iterate through and delete all data using the listOfNames array
    for (let index = 0; index < listOfNames.length; index++) {
        var ref = doc(db, "GPA_Database", user.email, "Subjects", index);
        deleteDoc(ref);
    }

    //add to the list
    for (var i = 0; i < rows.length; i++) {
        //Gets the data from the user
        var cell = rows[i].getElementsByTagName('td');
        console.log(cell[1].getElementsByTagName('input')[0]);
        console.log(cell[2].getElementsByTagName('select'));
        console.log(cell[3].getElementsByTagName('select'));
        var name = (cell[1].getElementsByTagName('input')[0]).value;
        var grade = Number(cell[2].getElementsByTagName('select')[0].value);
        var type = Number(cell[3].getElementsByTagName('select')[0].value);

        console.log("name: " + name);
        console.log("grade: " + grade);
        console.log("Type: " + type);
        console.log(user);
        //update the listOfNames array
        listOfNames.push(name + "" + (i + 1));
        var table = document.getElementById("dynamic-table").getElementsByTagName('tbody')[0];

        var mainRef = doc(db, "GPA_Database", user.email);
        var docRef = doc(mainRef, "Subjects", (i + 1) + "");
        setDoc(
            docRef, {
            Name: name,
            Grade: grade,
            Class_Type: type
        })
    }
    //update the total classes, the gpas
    var mainRef = doc(db, "GPA_Database", user.email);
    setDoc(
        mainRef, {
        Total_Classes: Total,
        UnweightedGPA: unweightedGpa,
        WeightedGPA: weightedGpa
    })
};

//Function to see if the user is signed in when the user clicks the calculate page ref
//if the user is signed in, and they lick it, load up a table
load.addEventListener("click", function () {
    //alert("Hello World!"); 
    if (user != null) {
        //call the load page function
        //alert("User is signed in!!");
        loadPage();
    }
    else {
        alert("you are not signed in.");
    }
});

// loads the page
async function loadPage() {
    var ref = doc(db, "GPA_Database", user.email);
    var docSnap = await getDoc(ref);
    var length = docSnap.data().Total_Classes;

    console.log(length);
    for (var i = 1; i <= length; i++) {
        console.log("inside loop");
        var ref = doc(db, "GPA_Database", user.email, "Subjects", i + "");
        var docSnap = await getDoc(ref);
        console.log("after await loop");
        console.log("name: " + docSnap.data().Name);
        console.log("Grade: " + docSnap.data().Grade);
        console.log("Type: " + docSnap.data().Class_Type);
        loadDataTable(docSnap.data().Name, docSnap.data().Grade, docSnap.data().Class_Type);
    }
    console.log("Got here");
}

function loadDataTable(name, grade, type) {
    var table = document.getElementById("dynamic-table").getElementsByTagName('tbody')[0];
    //This inserts a new row in the table
    //let tempArray = [];
    var newRow = table.insertRow(table.rows.length);
    for (var i = 0; i < 4; i++) {
        var cell = newRow.insertCell(i);
        if (i === 1) {
            var textBox = document.createElement("input");
            textBox.type = "text";
            textBox.value = name;
            cell.appendChild(textBox);
        }
        else if (i === 0) {
            var count = document.createElement("p");
            count.textContent = table.rows.length;
            cell.appendChild(count);
        }
        else {
            var dropdown = document.createElement("select");
        }
        // Add options to the dropdown
        if (i === 2) {

            var gradeNumList = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3,
                1.0, 0.0];
            var gradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+",
                "D", "F"];
            for (var j = 0; j < 11; j++) {
                var options = document.createElement("option");
                options.value = gradeNumList[j];
                options.text = gradeList[j];
                dropdown.add(options);
            }
            cell.appendChild(dropdown);
            dropdown.value = grade;
        }
        if (i === 3) {
            var classType = ["Regular", "AP"];
            for (var j = 0; j < 2; j++) {
                var options = document.createElement("option");
                options.value = j;
                options.text = classType[j];
                dropdown.add(options);
            }
            cell.appendChild(dropdown);
            dropdown.value = type;
        }
    }
}

//Deleting data - Deleting rows
// function delete(){
//     const res = await db.collection('cities').doc('DC').delete();
// }

//function to delete all the table's rows, allowing the user to restart
// calculating
//Uses a for-loop to go through each row and delete it using
// table.deleteRow();
//Also removes the text showing the GPA at the bottom of the table using
// removeChild();
function resetTable() {
    var table = document.getElementById("dynamic-table");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    var paragraph = document.getElementById("details");
    while (paragraph.firstChild) {
        paragraph.removeChild(paragraph.firstChild);
    }
    for (let index = 0; index < listOfNames.length; index++) {
        const element = listOfNames[index];
        console.log(element);
        var ref = doc(db, "GPA_Database", user.email, "Subjects", element);
        deleteDoc(ref);

    }
}
//function to calculate the unweighted GPA
//Takes the sum of all the letter grades' numerical values and divides it 
//by the number of classes the user is taking
//returns rounded to two decimal places
function calculateUnweighted(rows, totalClasses) {
    var gradeSum = 0;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var dropdown = cells[2].getElementsByTagName('select')[0];
        console.log(Number(dropdown.value));
        gradeSum += Number(dropdown.value);
    }
    var unweightedGpa = gradeSum / totalClasses
    return unweightedGpa.toFixed(2);
}
//function to calculate the weighted GPA
//Takes into account the number of AP classes the user is taking
//Multiplies unweightedGpa by the total number of class, adds the total
//ap class count to that number, and then divides that result by the total
//classes the user is taking.
//returns rounded to two decimal places.
function calculateWeighted(totalAp, unweightedGpa, totalClasses) {
    var weighted = ((unweightedGpa * totalClasses) + totalAp) / totalClasses;
    return weighted.toFixed(2);
}

//function to display a pop up box after user click the calculate button
//makes sure user is sure about continuing
//In case they accidentally clicked the calculate button, they can simply
// click cancel on the pop up box and go back to editing their responses
//If the user clicks continue, the calculate() function is called to
// calculate GPA
function popUpBox(type) {
    var confirmationBox = document.createElement("div");
    confirmationBox.style.position = "fixed";
    confirmationBox.style.top = "50%";
    confirmationBox.style.left = "50%";
    confirmationBox.style.transform = "translate(-50%, -50%)";
    confirmationBox.style.border = "3px solid #000";
    confirmationBox.style.padding = "20px";
    confirmationBox.style.backgroundColor = "#b8a193";
    var cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.backgroundColor = "#d9c3b4";
    cancelButton.style.marginRight = "10px";
    cancelButton.style.fontSize = "20px";
    cancelButton.style.padding = "5px 10px";
    cancelButton.addEventListener('click', function () {
        document.body.removeChild(confirmationBox);
    });
    var continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.style.fontSize = "20px";
    continueButton.style.backgroundColor = "#d9c3b4";
    continueButton.style.padding = "5px 10px";
    continueButton.addEventListener('click', function () {
        document.body.removeChild(confirmationBox);
        if(type === "calculate"){
            calculate(); 
        }
        else{
            resetTable(); 
        }
    });
    var textContent = document.createElement("p");
    textContent.innerHTML = "Are you sure you want to continue?";
    textContent.style.color = "#fff";
    textContent.style.fontSize = "20px";
    confirmationBox.appendChild(textContent);
    confirmationBox.appendChild(cancelButton);
    confirmationBox.appendChild(continueButton);
    document.body.appendChild(confirmationBox);
}
async function AddUser() {
    if (!user) {
        return;
    }
    var ref = doc(db, "GPA_Database", user.email);

    await setDoc(
        ref, {
        Total_Classes: 7,
        UnweightedGPA: 4.0,
        WeightedGPA: 5.0
    })
}

async function addSubjectToDB() {
    if (!user) {
        return;
    }

    var table = document.getElementById("dynamic-table").getElementsByTagName('tbody')[0];

    var mainRef = doc(db, "GPA_Database", user.email);
    var docRef = doc(mainRef, "Subjects", "Subject" + table.rows.length);
    await setDoc(
        docRef, {
        Name: "",
        Grade: 4.0,
        Class_Type: 0
    })
}
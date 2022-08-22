cl= console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const studentForm = document.getElementById('studentForm');
const stdInfo = document.getElementById('stdInfo');
const fName = document.getElementById('fName');
const lName = document.getElementById('lName');
const contact = document.getElementById('contact');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let stdArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, 
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('stdArray'))
}
const OnEditHandler = (ele) => {
    // cl('Edit is Working', ele);
    // let getEditId = ele.dataset.id;
    let getEditId = ele.getAttribute('data-id');
    // cl(getEditId)
    localStorage.setItem('setEditId' , getEditId);
    let arr = getLocalData();
    // cl(arr);

    let getObj = arr.find(ele => ele.id === getEditId);
    //cl(getObj);
    fName.value = getObj.firstName;
    lName.value = getObj.lastName;
    email.value = getObj.email;
    contact.value = getObj.contact;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    stdArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Are you Sure to Delete");
    templating(stdArray);
    localStorage.setItem('stdArray' , JSON.stringify(stdArray))
}

const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
        <td>${i + 1}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.contact}</td>
        <td><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button></td>
        <td><button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    stdInfo.innerHTML = result;
};


function onStdInfoSubmit(event){
    event.preventDefault();
    cl(event);
    let obj = {
        firstName : fName.value ,
        lastName : lName.value,
        email : email.value,
        contact : contact.value,
        id: uuidv4(),
    };
    stdArray.push(obj)
    localStorage.setItem('stdArray', JSON.stringify(stdArray));
    cl(stdArray);
    // document.getElementById('studentForm').reset()
    templating(stdArray)
    event.target.reset()
};

const onStdInfoUpdate = () =>{
    // cl('Update 123');
    let UpdateObj = {
        firstName : fName.value,
        lastName : lName.value,
        email : email.value,
        contact : contact.value
    };
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if(ele.id === getUpdateId){
            ele.firstName = fName.value,
            ele.lastName = lName.value,
            ele.email = email.value,
            ele.contact = contact.value
        }
    })
    templating(arr);
    localStorage.setItem('stdArray', JSON.stringify(arr));
    cl(UpdateObj);
    studentForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('stdArray')){
    stdArray = getLocalData();  //getting data from local storage
    templating(stdArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser


studentForm.addEventListener('submit', onStdInfoSubmit);
updateBtn.addEventListener('click', onStdInfoUpdate)
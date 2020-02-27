const uri = 'api/Users';
let todos = [];

function getUsers() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayUsers(data))
    .catch(error => console.error('Unable to get users.', error));
}

function addUser() {
  const addNameTextbox = document.getElementById('add-name');
  const addLastNameTextbox = document.getElementById('add-lastname');
  const addDNITextbox = document.getElementById('add-dni');
  const addAgeTextbox = document.getElementById('add-age');

  const item = {
    name: addNameTextbox.value.trim(),
    lastName : addLastNameTextbox.value.trim(),
    dni : parseInt(addDNITextbox.value),
    age : parseInt(addAgeTextbox.value)
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
        console.log(item.dni);
        console.log(item.age);
      getUsers();
      addNameTextbox.value = '';
      addLastNameTextbox.value = '';
      addDNITextbox.value = '';
      addAgeTextbox.value = '';
    })
    .catch(error => console.error('Unable to add user.', error));
}

function _displayUsers(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  data.forEach(item => {

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);      
    let nameNode = document.createTextNode(item.name);
    td1.appendChild(nameNode);
    

    let td2 = tr.insertCell(1);      
    let lastNameNode = document.createTextNode(item.lastName);
    td2.appendChild(lastNameNode);
    

    let td3 = tr.insertCell(2);      
    let dniNode = document.createTextNode("El DNI es:"+item.dni);
    td3.appendChild(dniNode);
    

    let td4 = tr.insertCell(3);      
    let ageNode = document.createTextNode("La edad es:"+item.age);
    td4.appendChild(ageNode);
    

    
    let td5 = tr.insertCell(4);      
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
    td5.appendChild(deleteButton);
    
    let td6 = tr.insertCell(5);      
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
    td6.appendChild(editButton);
  });

  todos = data;
}


function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getUsers())
  .catch(error => console.error('Unable to delete user.', error));
}

function displayEditForm(id) {  
  let item = todos.find(item => item.id === id);

  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-lastname').value = item.lastName;
  document.getElementById('edit-dni').value = item.dni;
  document.getElementById('edit-age').value = item.age;
  document.getElementById('editForm').style.display = 'block';

  
  let updateButton = document.createElement('button');
   updateButton.innerText = 'Update';
   updateButton.setAttribute('onclick', `updateItem(${item.id})`);
   document.getElementById("editForm").appendChild(updateButton);
}

function updateItem(id) {
  console.log(id);
  const itemName = document.getElementById('edit-name');
  const itemLastName = document.getElementById('edit-lastname');
  const itemDNI = document.getElementById('edit-dni');
  const itemAge = document.getElementById('edit-age');

  const item = {
    name: itemName.value.trim(),
    lastName : itemLastName.value.trim(),
    dni : parseInt(itemDNI.value),
    age : parseInt(itemAge.value)
  };
  

  fetch(`${uri}/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getUsers())
  .catch(error => console.error('Unable to update user.', error));

  
  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

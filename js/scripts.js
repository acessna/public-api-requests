const userUrl = 'https://randomuser.me/api/?results=12&nat=us&noinfo';
const userCards = document.getElementsByClassName('card');
const gallery = document.getElementById('gallery');

/*--- 
The fetchUserData function fetches the JSON file from the given url and parses the JSON returning a usable array called users.
---*/
async function fetchUserData(url){
const res = await fetch(url);
const usersJSON = await res.json();
const users = await usersJSON.results;
return users;
}

/*--- 
The generateUsers function takes the data that was received from the fetchUserData function and created cards for each of the users with information on them.
---*/
function generateUsers(data) {
  let output = '';

  data.forEach(user => {
    output = `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="profile picture">
      </div>
    <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
      </div>
    </div>
     `;

      gallery.innerHTML += output;
  });


};

/*--- 
The generateUserModules function listens for a click even on the user cards. When a user card is click, a module for the individual is create with more information on the user. To exit the module you click the 'X' and the module element is removed
---*/
function generateUserModules(data){


  for (let i = 0; i < userCards.length; i++) {
    userCards[i].addEventListener('click', () =>{

      const month = data[i].dob.date.substr(5,2);
      const day = data[i].dob.date.substr(8,2);
      const year = data[i].dob.date.substr(0,4);

      let output = '';
      output = `
      <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
              <p class="modal-text">${data[i].email}</p>
              <p class="modal-text cap">${data[i].location.city}</p>
              <hr>
              <p class="modal-text">${data[i].phone}</p>
              <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} 97204</p>
              <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
          </div>
      </div>
      `;

      $(output).insertAfter($('.gallery'));

      const closeBtn = document.getElementById('modal-close-btn');

      closeBtn.addEventListener('click', () => {

        $('.modal-container').remove();
      
      });
    });
  }


};


//Calls the above functions
fetchUserData(userUrl)
  .then(data => {
    generateUsers(data); 
    generateUserModules(data);
  })
  .catch(error => console.log('There seems to be an issue', error));

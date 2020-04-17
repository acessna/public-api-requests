const userUrl = 'https://randomuser.me/api/?results=12&nat=us&noinfo';
const userCards = document.getElementsByClassName('card');
const gallery = document.getElementById('gallery');


async function fetchUserData(url){
const res = await fetch(url);
const usersJSON = await res.json();
const users = await usersJSON.results;
return users;
}

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



fetchUserData(userUrl)
  .then(data => {
    generateUsers(data); 
    generateUserModules(data);
  })
  .catch(error => console.log('There seems to be an issue', error));

const userUrl = 'https://randomuser.me/api/?results=12&noinfo';


async function fetchUserData(url){

const res = await fetch(url);
const usersJSON = await res.json();
const users = await usersJSON.results;
console.log(users);
return users;
}

function generateUsers(data) {
  const gallery = document.getElementById('gallery');
  let output = '';

  data.forEach(user => {
    output = `
    <div class="card">
    <div class="card-img-container">
      <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
  </div>
  <div class="card-info-container">
         <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
         <p class="card-text">${user.email}</p>
         <p class="card-text cap">${user.location.city}, ${user.location.state}/p>
     </div>
     `;

     gallery.innerHTML += output;
  });


};

fetchUserData(userUrl);
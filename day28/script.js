
//root github url
const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
  try {
    //async await
    // destructuring to get just the data from the response - equivalent = response.data
    const { data } = await axios.get(APIURL + username)

    createUserCard(data)
    getRepos(username)
  } catch (error) {
    //catch for if something goes wrong
    if(error.response.status == 404){
        createErrorCard('No profile with this username')
    }
 
  }
}

async function getRepos(username) {
    try {
        const { data } = await axios.get(APIURL + username + '/repos?sort=created')//sorted to most recent repos to be visible

        addReposToCard(data)

    } catch(error) {
            createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>

        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

                <div id="repos"></div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}



function addReposToCard(repos){
    const reposEl = document.getElementById('repos')

    repos
    .slice(0, 10)
    .forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const user = search.value;
  
    if (user) {
      getUser(user)
  
      search.value = ''
    }
  })

/* constantes e closure para negar acesso */

(function () {
  const search = document.querySelector("#search");
  const submit = document.querySelector("search")
  const profile = document.querySelector("#profile");
  const url = "https://api.github.com/users";
  const client_id = "84c9f6840c9dacb27164";
  const client_secret = "dbb7982510f58b27095c70ec3af32afea3e441b4";
  const count = "per_page=3";


  /* pegando valor do search*/
  async function getUser(user) {
    const profileResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const reposResponse = await fetch(`${url}/${user}/repos?${count}&client_id=${client_id}&client_secret=${client_secret}`);


    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return { profile, repos };
  }




  function showDataProfile(user) {


    profile.innerHTML =
      `<div class="row" mt-3>
    <div class="card" style="width: 18rem">
      <img class="card-img-top" src="${user.avatar_url}">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Nome : <span class="badge badge-success">${user.name}</span></li>
        <li class="list-group-item">Bio:<span class="badge">${user.bio}</span></li>
        <li class="list-group-item">Email:<span class="badge badge-success">${user.email}</span></li>
        <li class="list-group-item">Repositórios : <span class="badge badge-success">${user.public_repos}</span></li>
        <li class="list-group-item">Seguidores : <span class="badge badge-primary">${user.followers}</span></li>
        <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
      </ul>
      <div class="card-body">
       
        <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver perfi</a>
      </div>
    </div>
    <div class="row  ml-3 ">
      <div id="repos"></div>
    </div>
  </div>`
  }


  function showRepos(repos) {
    let output = "";
    repos.forEach(repo => {
      output += `
            
            <div class="card card-body mb-2 ml-3>
            <div class="row" ">
            <div class="row col-md-6">Repositório:<p class="center">${repo.name}</p>
            </div>
            <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repo.stargazers_count} </span>
              <span class="badge badge-primary">Tec.: ${repo.language} </span>
              <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-warning">Forks: ${repo.stargazers_count}</span>
      </div>               
      <div class="card-body">
       
        <a href="${repo.html_url}" target="_blank" class="btn btn-warning btn-block">Ver detalhes do Repositório</a>
      </div>
      <div class="card-body">
      <a href="${repo.repos_url}" target="_blank" class="btn btn-dark">Ver todos os Repositórios </a>
      </div>
      
              </div>
            </div>
        
          </div></div> `

      document.getElementById('repos').innerHTML = output;

    });

  }



  submit.addEventListener('keyup', (e) => {
    let text = search.value 
    const user = e.target.value;

    if (user.length > 0) {
      getUser(user).then(res => {
        showDataProfile(res.profile)
        showRepos(res.repos)
      });
    }

  })
})();


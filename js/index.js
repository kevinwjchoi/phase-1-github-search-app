document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const searchInput = document.getElementById('search').value;
      const searchUrl = `https://api.github.com/search/users?q=${searchInput}`;
  
      fetch(searchUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const users = data.items;
          clearUserList();
          users.forEach((user) => {
            if (user.login.toLowerCase().includes(searchInput.toLowerCase())) {
              createUserList(user);
            }
          });
        })
        .catch((error) => console.log(error));
    });
  
    function createUserList(user) {
      const listItem = document.createElement('li');
      listItem.textContent = user.login;
      listItem.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${user.login}/repos`)
          .then((response) => response.json())
          .then((data) => {
            clearReposList();
            data.forEach((repo) => createRepoList(repo));
          })
          .catch((error) => console.log(error));
      });
      userList.appendChild(listItem);
    }
  
    function createRepoList(repo) {
      const listItem = document.createElement('li');
      listItem.textContent = repo.name;
      reposList.appendChild(listItem);
    }
  
    function clearUserList() {
      while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
      }
    }
  
    function clearReposList() {
      while (reposList.firstChild) {
        reposList.removeChild(reposList.firstChild);
      }
    }
  });
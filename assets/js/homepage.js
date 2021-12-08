var getUserRepos = function(user){
    //format the github api url 
    var apiUrl ="https://api.github.com/users/" + user + "/repos";
    //make a request to the url 
    fetch(apiUrl).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            displayRepos(data,user)
            console.log(data);
        });
    }else{
        alert("Error GitHub user Not Found");
    }
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};
getUserRepos();
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event){
    event.preventDefault();
    //get the value from the input element 
    let username =nameInputEl.value.trim();
    //send the name to the getUserRepos else check if the input is empty alert the user to enter a username  
    if (username){
        getUserRepos(username);
        nameInputEl.value="";
    }else{
        alert("please enter a GitHub username");
    }
}
var displayRepos = function(repos,searchTerm){
    console.log(repos);
    console.log(searchTerm);
    // check if api returnedd any repos 
    if(repos.length===0){
        repoContainerEl.textContent= "No repositories found.";
        return;
    }
    //clear old content 
    repoContainerEl.textContent="";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos 
    for (var x=0; x< repos.length; x++){
        //format repo name 
        var repoName = repos[x].owner.login + "/" + repos[x].name;
        // create a continer for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        //create a span element to hold repo name 
        var titleEl = document.createElement("span");
        titleEl.textContent =repoName;
        //create a status element 
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        //check if the current repo has issue or not 
        if (repos[x].open_issues_count > 0 ){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[x].open_issues_count + "issue(s)";
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            
        }
        // append to container
        repoEl.appendChild(statusEl);
        // append to continer 
        repoEl.appendChild(titleEl);
        // append container to the dom 
        repoContainerEl.appendChild(repoEl);
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);
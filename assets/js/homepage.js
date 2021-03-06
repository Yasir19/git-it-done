var languageButtonsEl = document.getElementById
("language-buttons");
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
};
var buttonClickHandler =function(event){
    //get the language attribute from the click element 
    var language = event.target.getAttribute("data-language");
    console.log("clicked",language);
    if (language){
        getFeatureRepos(language);
        //clear old content 
        repoContainerEl.textContent="";
    }

};
var getUserRepos = function(user){
    //format the github api url 
    var apiUrl ="https://api.github.com/users/" + user + "/repos";
    //make a request to the url 
    fetch(apiUrl).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            console.log(data);
            displayRepos(data,user)
        });
    }else{
        alert("Error GitHub user Not Found");
    }
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};
var getFeatureRepos =function(language) {
    // format the github API url
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    // make a get request to url
    fetch(apiUrl).then(function(response){
        //request was successful
        if (response.ok){
            console.log(response)
            response.json().then(function(data){
                displayRepos(data.items, language);
                console.log(data)
            })
        }else{
            alert("ERROR: GitHub User Not Found");
        }

    });
};

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
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href","./single-repo.html?repo=" + repoName);
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
languageButtonsEl.addEventListener("click", buttonClickHandler);
var limitWarningEl = document.getElementById("limit-warning");
var issueContainerEl= document.getElementById("issues-container");
var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   fetch(apiUrl).then(function(response){
       //request was successful
       if (response.ok){
           response.json().then(function(data){
               displayIssues(data);
               //check if api has paginated issues
               if(response.headers.get("link")){
                   displayWarning(repo);
               }
           });
       }
       else{
           alert("there was aproblem with your request!");
       }
var displayIssues = function(issues) {
    if (issues.length === 0){
        issueContainerEl.textContent ="this repo has no open issues!";
        return;
    }
for (var i=0; i < issues.length; i++){
// create a link element to take users to the issue on github
var issueEl=document.createElement("a");
issueEl.classList ="list-item flex-row justify-space-between align-center";
issueEl.setAttribute("href", issues[i].html_url);
issueEl.setAttribute("target", "_blank")
//create span to hold issue title 
var titleEl =document.createElement("span");
// the issues[i].title, the tiltel is from the element of the document object 
titleEl.textContent =issues[i].title;
//append to the container 
issueEl.appendChild(titleEl);

//create a type element
var typeEl = document.createElement("span");
//based on the github document pull request is considered as an issue,therefore 
// check if the issue is an actual issue or pull request 
if(issues[i].pull_request){
    typeEl.textContent = "(pull request)";

}else{
    typeEl.textContent ="(Issue)";

}
//apend to container 
issueEl.appendChild(typeEl);
//append to the dom 
issueContainerEl.appendChild(issueEl);
}
}
});
};
var displayWarning =function(repo){
    //add text to warning container 
    limitWarningEl.textContent = "to see more than 30 issues,visit ";
    var linkEl =document.createElement("a");
    linkEl.textContent ="see More Issues on git Hub.com"
    linkEl.setAttribute('href', "https://github.com/" +repo+ "/issues");
    linkEl.setAttribute("target","_blank");

    //append to warning container 
    limitWarningEl.appendChild(linkEl);
}

getRepoIssues("facebook/react");
getRepoIssues("expressjs/express");
getRepoIssues('angular/angular');
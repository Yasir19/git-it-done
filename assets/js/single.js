var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   fetch(apiUrl).then(function(respomse){
       //request was successful
       if (Response.ok){
           Response.json().then(function(data){
               console.log(data);
           });
       }
       else{
           alert("there was aproblem with your request!");
       }
   });
};
getRepoIssues();
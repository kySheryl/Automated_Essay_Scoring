var gotoEssay = ()=>{
  console.log('here');
  window.location.href='essay.html';
}


// function userRegister() {
//     // instantiate a headers object
//     var myHeaders = new Headers();
//     // add content type header to object
//     myHeaders.append("Content-Type", "application/json");
//     var name = document.getElementById("name");
//     var email = document.getElementById("email");
//     var password = document.getElementById("pass");
//     var re_password = document.getElementById("re_pass");
//     if(name.value == "" || password.value == ""){
//       console.log("empty username");
//       window.alert("username or password can not be empty");
//       return;
//     }
//     if(password.value != re_password.value){
//       console.log("password not match");
//       console.log(password.value);
//       console.log(re_password.value);
//       window.alert("password doesn't match");
//       return;
//     }
//     // using built in JSON utility package turn object to string and store in a variable
//     var raw = JSON.stringify({"name": name.value, "username": email.value,"password":password.value});
//     // create a JSON object with parameters for API call and store in a variable
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
//     // make API call with parameters and use promises to get response
//     fetch("https://298hv4l96j.execute-api.us-east-1.amazonaws.com/v2/log-in", requestOptions)
//     .then(response => response.text())
//     .then(result => {
//       var statusCode = JSON.parse(result).statusCode
//       if (statusCode == 400){
//         alert(JSON.parse(result).body);
//         }
//       else{
//         console.log(JSON.parse(result).body);
//         console.log('here');
//         window.location.href='login.html';
//       }
//       // var a = document.getElementById('score');
//       // a.innerHTML = 'Score: ' + JSON.parse(result).score;
//     }
//     )
//     .catch(error => console.log('error', error));
// }

function myFunction(p) {
    //console.log(i);
    if (localStorage.getItem("userid") === null) {
    //...
      alert('You should first log in.');
      window.location.href = 'login.html';
    }
    var prompt = document.getElementById('prompt');
    var b = document.getElementById('score');
    prompt.innerHTML = p;
    p = "<p>" + p + "</p>";
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("idToken"));
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"userid": localStorage.getItem("userid"),"prompt":p});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://298hv4l96j.execute-api.us-east-1.amazonaws.com/v2/search", requestOptions)
    .then(response => response.text())
    .then(result => {
      let history_result = '';
      var a = JSON.parse(result).body;
      console.log((9).toFixed(1))
      a.forEach(element => {
        history_result += "<div class='w3-container w3-cell'>   <textarea disabled cols='80' rows='7' id='essayArea' style='font-size:15px;padding: 8px'>"+ element.essay +"</textarea></div><div class='w3-container w3-cell'><div><div class='rating' id='delivery_cir'> "+(element.score).toFixed(1)+" </div><div class='score-label' id='full-score'><b>Full Score: 12.5</b></div>            <br><br><br>          </div>        </div><br>";
      
      });
      if (history_result === ''){
        // no history result
      }
      console.log(history_result);

      var temp = document.getElementById('historyResult');
      temp.innerHTML = history_result;
/*
Conic gradients are not supported in all browsers (https://caniuse.com/#feat=css-conic-gradients), so this pen includes the CSS conic-gradient() polyfill by Lea Verou (https://leaverou.github.io/conic-gradient/)
*/
// Find al rating items
const ratings = document.querySelectorAll("div.rating");

// Iterate over all rating items
ratings.forEach((rating) => {
  // Get content and get score as an int
  const ratingContent = rating.innerHTML;
  // const ratingScore = parseInt(ratingContent, 10);
  const ratingScore = parseFloat(ratingContent)*8;
  
  // Define if the score is good, meh or bad according to its value
  const scoreClass =
    ratingScore < 40 ? "bad" : ratingScore < 60 ? "meh" : "good";

  // Add score class to the rating
  rating.classList.add(scoreClass);

  // After adding the class, get its color
  const ratingColor = window.getComputedStyle(rating).backgroundColor;

  // Define the background gradient according to the score and color
  const gradient = `background: conic-gradient(${ratingColor} ${ratingScore}%, transparent 0 100%)`;

  // Set the gradient as the rating background
  rating.setAttribute("style", gradient);

  // Wrap the content in a tag to show it above the pseudo element that masks the bar
  rating.innerHTML = `<span>${ratingScore/8} ${
    ratingContent.indexOf("%") >= 0 ? "<small>%</small>" : ""
  }</span>`;
});



    }
    )
    .catch(error => console.log('error', error));
  }

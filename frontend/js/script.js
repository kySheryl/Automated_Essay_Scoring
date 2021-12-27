// define the callAPI function that takes a first name and last name as parameters
var callAPI = (firstName,lastName)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("idToken"));
    // using built in JSON utility package turn object to string and store in a variable

    console.log(localStorage.getItem("idToken"));
    var raw = JSON.stringify({"userid": localStorage.getItem("userid"),"prompt":firstName,"essay":lastName});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://298hv4l96j.execute-api.us-east-1.amazonaws.com/v2/upload", requestOptions)
    .then(response => response.text())
    .then(result => {
      var essay = document.getElementById("essay").value;
      localStorage.setItem("essayContent",essay);
      localStorage.setItem("promptContent",firstName);
      localStorage.setItem("score",JSON.parse(result).score );
      localStorage.setItem("beatRate",JSON.parse(result).rate );
      //alert(JSON.parse(result).rate)
      alert(JSON.parse(result).body)
      window.location.href='score.html';
      
      // var a = document.getElementById('delivery_cir');
      // a.value = 'Score: ' + JSON.parse(result).score;
    }
    )
    .catch(error => console.log('error', error));
  
}

var b1function = (variable)=>{
  var a = document.getElementById('prompt');
  a.innerHTML = variable;
};

function userLogout(){
  window.location.href='login.html';
  localStorage.removeItem("userid");
  localStorage.removeItem("idToken");
}

function gethistory(){
  window.location.href = 'history.html';
}

function check(){
  if (localStorage.getItem("userid") === null) {
  //...
    alert('You should first log in.');
    window.location.href = 'login.html';
  }
}
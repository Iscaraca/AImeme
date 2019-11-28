var el = x => document.getElementById(x);

function analyze() {
  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      if (response["result"] == "1") {
        el("result-label").innerHTML = `This text is okay`;
      } else if (response["result"] == "0") {
        el("result-label").innerHTML = `This text is good`;
      } else if (response["result"] == "2") {
        el("result-label").innerHTML = `This text is bad`;
      } else if (response["result"] == "3") {
        el("result-label").innerHTML = `This text is evil`;
      } else if (response["result"] == "4") {
        el("result-label").innerHTML = `This text is the worst`;
      } else {
        el("result-label").innerHTML = `${response["result"]}`;
      }
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("input-text", el("input-text").value);
  xhr.send(fileData);
}


//받아와야 되는것: title, url, project, tags, note, highlight정보들

var title, url, project, tags, note, highlights;

function generate_title(){ //title 가져와서 작성
  chrome.tabs.executeScript({
    code: 'document.head.querySelector("title").innerText'
  }, function (result) {
    title = result;
    document.querySelector('#title').value = result;
  });
}

document.getElementById("addbutton").addEventListener("click", function(){
  //info (url, project) 가져오기
  chrome.tabs.executeScript({ //get url
    code: 'document.URL'
  }, function(result){
    url = result;
  });

  //get project
  var s = document.getElementById("selectproject");
  project = s.options[s.selectedIndex].value;
});


function generate_highlight(){
  chrome.tabs.executeScript({
    code: 'document.querySelector("h5").style.backgroundColor = "#FFF000"'
  },function(){

  });
}
/*
function surroundSelection(element) {
  chrome.tabs.executeScript({
    code: 'window.getSelectoin()'
  }, function (result) {
    var sel = result;
    alert(sel.toString());

    if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(element);
        sel.removeAllRanges();
        sel.addRange(range);
    }
  });
}
*/

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = "#74E1A7";
}

window.addEventListener('load', function load(event){

  var createButton1 = document.getElementById('tab1');
  openPage('link', createButton1, 'white');
  createButton1.addEventListener('click', function() { openPage('link', createButton1, 'white'); });

  var createButton2 = document.getElementById('tab2');
  createButton2.addEventListener('click', function() { openPage('file', createButton2, 'white'); });

});

generate_title();
generate_highlight();

new Taggle('example3', {
  tags: ['hi']
});
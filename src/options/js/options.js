document.addEventListener('DOMContentLoaded', function() {
  var save = document.getElementById('save');
  var restore = document.getElementById('restore');
  save.addEventListener('click', function() {
      var template = document.getElementById("template").value;
      chrome.storage.local.set({'bug_template': template}, function() {
          // Notify that template is saved.  
          alert('Template saved');
        });
    });
  restore.addEventListener('click', function() {
      chrome.storage.local.remove('bug_template', function(){
        // Notify that template is restored. 
        alert('Restore default template');
      location.reload();
      })
    });
});
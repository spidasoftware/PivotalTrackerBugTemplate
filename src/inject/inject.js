chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		chrome.storage.local.get(null,function (obj){
      var bug_template = obj["bug_template"];
        function addTemplateButton() {
          
          var clone_story = document.querySelector('.clone_story');
          var template_button = document.createElement('button');
          var control_bar = document.querySelector('.controls');
          template;

          if (!control_bar) { return; }
          if ($(control_bar).find('.template').length) { return; }

          template_button.className = 'autosaves template left_endcap';
          template_button.innerHTML = '<img src="//d3jgo56a5b0my0.cloudfront.net/next/assets/next/ef3f29e8-bug.png">';
          clone_story.className = clone_story.className + ' capped';
          clone_story.insertAdjacentElement('beforebegin', template_button);

          template_button.addEventListener('click', template, true);

          function template(e) {
            $(control_bar).parents('.edit').find('.dropdown.story_type').find('.dropdown_menu ul li')[2].click();
            var description = $(control_bar).parents('.edit').find('.description.full');
            description.find('.rendered_description.tracker_markup').trigger('click');
            var description_textfield = description.find('.editor');
            var description_text = description_textfield.val();
            ev = new jQuery.Event('keyup');
            ev.which = 13;
            ev.keyCode = 13;
            
            description_textfield.val(bug_template + '\r' + description_text);
            description.find(':submit').trigger('click');

            e.preventDefault();
          }

        }

        $('body').on('DOMSubtreeModified', function() {
          addTemplateButton();
        });
    });
	}
	}, 10);
});
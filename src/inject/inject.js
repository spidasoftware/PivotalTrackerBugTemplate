chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		const bug_template = `
# Description:



## Build Version



## Steps to Reproduce



## Expected Result



## Actual Result



---------------------------------
Labels: Blocker|High|Low / Version / Epic
Attachments: Screen captures / Logs / Calc files
`;

		chrome.storage.local.get(null,function (obj){
      if (obj["bug_template"] != undefined) { bug_template = obj["bug_template"] }
        console.log(bug_template);
    });

        function addTemplateButton() {
          var clone_story = $('.clone_story')[0];
          var control_bar = $('.edit>.controls')[0];
          template;

          if (!control_bar) { return; }
          if ($(control_bar).find('.template').length) { return; }
          var template_button = document.createElement('button');
          template_button.className = 'left_endcap hoverable template';

          template_button.innerHTML = '<img src="'+chrome.extension.getURL("icons/icon16.png")+'" width="14px" height="14px" style="padding-top: 2px; padding-left:4px;">';

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

        $('body').on('DOMSubtreeModified', function(e) {
          addTemplateButton();
        });

	  }
	}, 10);
});

(function () {

	var data = [{
		"title":  "Super Mario World 2",
		"subtitle": "Yoshi's Island"
	},{
		"title":  "The Little Prince",
		"subtitle": null
	},{
		"title":  "The Da Vinci Code"
	},{
		"title": "Lord of the Flies",
		"subtitle": ""
	}];

    function testLoadWithFunctionParameters() {
		$("#bindingOptionsContainer").loadTemplate($("#templateWithoutBindingOptions"), data, {bindingOptions: {"ignoreUndefined": true, "ignoreNull": true, "ignoreEmptyString": true}});
    }

	function testLoadWithTemplateAttributes() {
		$("#bindingOptionsContainer").loadTemplate($("#templateWithBindingOptions"), data);
    }

	function testLoadTemplateWithBindingOptionsInDataTemplateBindAttribute() {
		$("#bindingOptionsContainer").loadTemplate($("#templateWithBindingOptionsAsDataBindTemplateAttribute"), data);
    }
	
    function test(assert, async) {
        return [
            {
                name: "jQuery Loaded",
                test: function () {
                    assert(jQuery);
                }
            },
            {
                name: "loadTemplate Loaded",
                test: function () {
                    assert(typeof $.fn.loadTemplate === 'function');
                }
            },
            {
                name: "Load template with binding options as function parameters",
                test: function () {
                    testLoadWithFunctionParameters();
                    
                    var childs = $('#bindingOptionsContainer h4').length;
                    assert(childs === 1);
                }
            },
			{
                name: "Load template with binding options as template attributes",
				setup: function () {
					$('#bindingOptionsContainer').empty();
				},
                test: function () {
                    testLoadWithTemplateAttributes();
                    
                    var childs = $('#bindingOptionsContainer h4').length;
                    assert(childs === 1);
                }
            },
			{
                name: "Load template with binding options in 'data-template-bind' attribute",
				setup: function () {
					$('#bindingOptionsContainer').empty();
				},
                test: function () {
                    testLoadTemplateWithBindingOptionsInDataTemplateBindAttribute();
                    
                    var childs = $('#bindingOptionsContainer h4').length;
                    assert(childs === 1);
                }
            }];
    }

    addTests(test);

})();

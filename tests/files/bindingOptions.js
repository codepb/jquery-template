(function () {

	var data = [{
		"title":  "Super Mario World 2",
		"subtitle": "Yoshi's Island"
	},{
		"title":  "The Little Prince",
		"subtitle": null
	},{
		"title":  "The Da Vinci Code"
	}];



    function testLoadedWithFunctionParameters() {
		$("#loadedWithBindingParametersAsFunctionParameters").loadTemplate($("#templateWithoutBindingParamters"), data, {bindingOptions: {"ignoreUndefined": true, "ignoreNull": true}});
    }

	function testLoadedWithTemplateParameters() {
		$("#loadedWithBindingParametersAsTemplateParameters").loadTemplate($("#templateWithBindingParamters"), data);
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
                    testLoadedWithFunctionParameters();
                    
                    var childs = $('#loadedWithBindingParametersAsFunctionParameters h4').length;
                    assert(childs === 1);
                }
            },
			{
                name: "Load template with binding options as template parameters",
                test: function () {
                    testLoadedWithTemplateParameters();
                    
                    var childs = $('#loadedWithBindingParametersAsTemplateParameters h4').length;
                    assert(childs === 1);
                }
            }];
    }

    addTests(test);

})();

# jQuery.loadTemplate

jQuery Template is a jQuery plugin that makes using templates easy and quick. The plugin supports loading HTML files as templates, or taking a jQuery object as the template (usually using script tags to hold the template).

The plugin parses a template using data attributes to populate the data. Simply pass in a JavaScript object, and the plugin does the rest.

An example template is below:

    <script type="text/html" id="template">
        <div data-content="author"></div>
        <div data-content="date"></div>
        <img data-src="authorPicture" data-alt="author"/>
        <div data-content="post"></div>
    </script>

And to use this do the following:

    $("#template-container").loadTemplate($("#template"),
		{
            author: 'Joe Bloggs',
            date: '25th May 2013',
            authorPicture: 'Authors/JoeBloggs.jpg',
            post: 'This is the contents of my post'
        });

Similarly the content of the template could be held in a separate html file without the enclosing script tag, and used like the following:

    $("#template-container").loadTemplate("Templates/template.html",
		{
            author: 'Joe Bloggs',
            date: '25th May 2013',
            authorPicture: 'Authors/JoeBloggs.jpg',
            post: 'This is the contents of my post'
        });

It is also possible to define data formatters. These are assigned through the `$.addTemplateFormatter` method. This function either accepts a map of functions and the keys that they will be referenced by, or a single function with a single key as two separate parameters. Each formatter takes two values, the value being assigned to the content, and a template to use to define how this data is displayed. The data-format-template may be empty. Example usage of this is below:

    $.addTemplateFormatter("UpperCaseFormatter",
        function(value, template) {
            return value.toUpperCase();
        });

Alternatively with a map:

    $.addTemplateFormatter({
        UpperCaseFormatter : function(value, template) {
                return value.toUpperCase();
            },
        LowerCaseFormatter : function(value, template) {
                return value.toLowerCase();
            },
        SameCaseFormatter : function(value, template) {
                if(template == "upper") {
					return value.toUpperCase();
				} else {
					return value.toLowerCase();
				}
            }
    });

To call these templates, simply the following will work:

	<div data-content="post" data-template="SameCaseFormatter"
		data-template-format="upper"></div>

Formatters must be added before they are used else a template will not be able to access them. Formatters are used at the time of populating the data.

There are a number of options the plugin accepts. These are:

- "overwriteCache" (default false) - Whether to ignore the cache and reload the template (if you've previously loaded the template, but it might have changed, you'll want to set this to true.
- "complete" (default null) - Callback function to call on complete. Will always be called regardless of success or failure.
- "success" (default null) - Callback function to call on successful completion.
- "error" (default, outputting error message to template container) - Callback function to call on error.
- "errorMessage" (default "There was an error loading the template.") - Error message for the default error callback to use. This will not be used if you set an error callback function.
- "isFile" (default undefined) - flag to help speed up the process of deciding where to load the template from. Set to true if the template is an external file to load via ajax, false if it's a jQuery selector for an element in the document. Default undefined means the plugin will check first in the document, then attempt to load external file.
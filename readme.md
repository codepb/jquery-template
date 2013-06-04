# jQuery.loadTemplate

jQuery Template is a jQuery plugin that makes using templates easy and quick. The plugin supports loading HTML files as templates, or taking a jQuery object as the template (usually using script tags to hold the template).

## Features

jQuery.LoadTemplate provides the following:

- Define Templates to display data
- Provide Formatters to process data into a more readable format
- Cache templates and data client side and pass processing to the client, allowing for a great user experience.
- Powerful but simple syntax, utilising pure html for templates.

## Getting Started

Simply clone the repo. The only file required is the jquery.loadTemplate-version.js file in the jquery.loadTemplate folder. There is also a folder for examples in the same folder. Take a look at the index file in here for examples and the code to create the examples.

To see examples of usage, visit the project page: [http://codepb.github.io/jquery-template/](http://codepb.github.io/jquery-template/)

## Potential Applications

jQuery.loadTemplate was originally designed with a single page application for a blog in mind. The idea was to create templates for blog posts, post snippets, etc. This could then be called from the client when required, and cached. The post data was sent as a JSON object from the server, and processed into the templates using the plugin. This meant a very light load on the server, and a great user experience, with smooth page transitions, and JavaScript engines doing all the work.

However I saw many other potential applications for this. Any application that deals with a large amount of data displayed in a regular format, for example search results, live commentary, blogs, online stores, social media sites, and the list could go on.

## How it works

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

The plugin has a number of data-... attributes that can be used to populate various attributes with the data. There is also the powerful data-template-bind attribute that accepts a JSON object, enabling binding to any attribute, or the content of the element.

### Data Formatters

It is also possible to define data formatters. These are assigned through the `$.addTemplateFormatter` method. This function either accepts a map of functions and the keys that they will be referenced by, or a single function with a single key as two separate parameters. Each formatter takes two values, the value being assigned, and a template to use to define how this data is displayed. The data-format-template may be empty. Example usage of this is below:

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

To call these formatters, simply the following will work:

	<div data-content="post" data-template="SameCaseFormatter"
		data-template-format="upper"></div>

Formatters must be added before they are used else a template will not be able to access them. Formatters are used at the time of populating the data. You can also target any binding with the "data-format-target". The value of this is the binding to target so to target data-alt binding, set 'data-format-target="alt"'.

### Options

There are a number of options the plugin accepts. These are:

- "overwriteCache" (default false) - Whether to ignore the cache and reload the template (if you've previously loaded the template, but it might have changed, you'll want to set this to true.
- "complete" (default null) - Callback function to call on complete. Will always be called regardless of success or failure.
- "success" (default null) - Callback function to call on successful completion.
- "error" (default, outputting error message to template container) - Callback function to call on error.
- "errorMessage" (default "There was an error loading the template.") - Error message for the default error callback to use. This will not be used if you set an error callback function.
- "isFile" (default undefined) - flag to help speed up the process of deciding where to load the template from. Set to true if the template is an external file to load via ajax, false if it's a jQuery selector for an element in the document. Default undefined means the plugin will check first in the document, then attempt to load external file.
- "paged" (default false) - A boolean flag to indicate whether arrays should be paged.
- "pageNo" (default 1) - An integer for which page to display if the data is being paged.
- "elemPerPage" (default 10) - The number of elements to display per page if the data is being paged.

## Future Plans

I would like to develop the plugin further so it would be possible to watch the objects holding the data, so any changes to the data would be reflected in the UI. This would have to be simple, lightweight, and ideally would work just with natural JavaScript objects. I also welcome any ideas as to how the plugin could be improved.
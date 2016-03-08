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

#### Arrays

You can pass an array of objects instead of a single object and the template will be populated and added to the container for each item in the array. There are options built in that allow you to page the results from an array as well. See the options section below and the included examples. 

### Data Formatters

It is also possible to define data formatters. These are assigned through the `$.addTemplateFormatter` method. This function either accepts a map of functions and the keys that they will be referenced by, or a single function with a single key as two separate parameters. Each formatter takes two values, the value being assigned, and a template to use to define how this data is displayed. The data-format-options may be empty. Example usage of this is below:

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

	<div data-content="post" data-format="SameCaseFormatter"
		data-format-options="upper"></div>

Formatters must be added before they are used else a template will not be able to access them. Formatters are used at the time of populating the data. You can also target any binding with the "data-format-target". The value of this is the binding to target so to target data-alt binding, set 'data-format-target="alt"'.

### Bindings
There are a number of different bindings and ways to bind the data. The following attributes are available:

- "data-innerHTML" (>= 1.4.5) - binds the value supplied to the content (innerHTML) of the element (uses $(elem).html(value))
- "data-content" - alias for the newer "data-innerHTML"
- "data-content-text" - binds the value supplied to the content of the element as text (uses $(elem).text(value))
- "data-content-append" - appends the value to the end of the element (uses $(elem).append(value))
- "data-content-prepend" - prepends the value to the beginning of the element (uses $(elem).prepend(value))
- "data-id" - sets the id of the element to the value provided (uses $(elem).attr("id", value));
- "data-href" - sets the href value of the element to the value provided (uses $(elem).attr("href", value));
- "data-alt" - sets the alt value of the element to the value provided (uses $(elem).attr("alt", value));
- "data-value" - sets the value attribute of the element to the value provided (uses $(elem).val(value))
- "data-class" - sets the class attribute of the element to the value provided (uses $(elem).class(value))
- "data-link" - sets the innerHtml of the element to be a link to the value provided (wraps the content in an &lt;a&gt; tag).
- "data-link-wrap" - wraps the element in a link to the value provided. Same as "data-link", but the &lt;a&gt; tag wraps the element as well as the content.
- "data-options" - adds options to a select box. The value for this should reference an array of strings, each option will be output as a separate option. The value will be the same as the displayed text for each option. For a more powerful version of this look at the data-template-bind option.

On top of the attributes above, there is also a "data-template-bind" attribute. This is designed to handle more complex situations and allows a wide range of control. The attribute takes a JSON string and allows multiple bindings and options to be set in the one attribute.

The "data-template-bind" value should be an array of objects. Each object represents one complete binding. Each object can contain the following properties:

- "value" (required) - The property representing the value to bind to.
- "attribute" (required) - The attribute to bind to. This can be any attribute accepted by the jQuery.attr() method or one of the following: "content" - same as data-content, binds the innerHTML, "contentAppend" - same as data-append, appends the value, "contentPrepend" - same as data-prepend, prepends the value, "options" - same as data-options, but provides greater control. The value attribute for this is an object with a value property and a content property, and this will bind the value of the option to the value property, and the innerText of the option to the content property.
- "formatter" (optional) - provides the formatter to apply to the specific binding. Multiple different attributes can use different formatters using this syntax.
- "formatOptions" (optional) - the options to pass to the formatter applied.

An example of using the "data-template-bind" attribute would be the following:

    <div data-template-bind='[
         {"attribute": "content", "value": "post"},
         {"attribute": "data-date", "value": "date"},
         {"attribute": "data-author", "value": "author", "formatter": "sameCaseFormatter", "formatOptions": "upper"}]'></div>

### Options

There are a number of options the plugin accepts. These can be set by passing an object containing the settings you would like to set as the third parameter to .loadTemplate:

    $(container).loadTemplate(template, data, { append: true, elemPerPage: 20 });

The full list of options are:

- "overwriteCache" (default false) - Whether to ignore the cache and reload the template (if you've previously loaded the template, but it might have changed, you'll want to set this to true.
- "async" (default true) - Whether to load templates asynchronously (if templates require an Ajax call)
- "complete" (default null) - Callback function to call on complete. Will always be called regardless of success or failure.
- "success" (default null) - Callback function to call on successful completion.
- "error" (default, outputting error message to template container) - Callback function to call on error.
- "errorMessage" (default "There was an error loading the template.") - Error message for the default error callback to use. This will not be used if you set an error callback function.
- "isFile" (default undefined) - flag to help speed up the process of deciding where to load the template from. Set to true if the template is an external file to load via ajax, false if it's a jQuery selector for an element in the document. Default undefined means the plugin will check first in the document, then attempt to load external file.
- "paged" (default false) - A boolean flag to indicate whether arrays should be paged.
- "pageNo" (default 1) - An integer for which page to display if the data is being paged.
- "elemPerPage" (default 10) - The number of elements to display per page if the data is being paged.
- "append" (default false) - If set to true, the template will be appended to the element rather than replacing the contents of the element.
- "prepend" (default false) - If set to true, the template will be prepended to the element rather than replacing the contents of the element. The append option takes priority over prepend, so if both options are set to true, the element is appended and not prepended.
- "beforeInsert" (default null) - Callback function to be called before inserting the template into the document. The format of the function is function($elem) where $elem is the jQuery object of the populated template about to be inserted into the document.
- "afterInsert" (default null) - As above, a callback function to be called after inserting the template into the document. The format is the same as above.
- "bindingOptions" (default all flags false): add flags to ignore certain types of values. {"ignoreUndefined": false, "ignoreNull": false, "ignoreEmptyString": false}. The flags you set here, are overwritten on an element level by those specified in a template with a "data-binding-options" or a "data-template-bind" attribute. Examples can be found in the Examples/OptionalBinding folder.

## Future Plans

I would like to develop the plugin further so it would be possible to watch the objects holding the data, so any changes to the data would be reflected in the UI. This would have to be simple, lightweight, and ideally would work just with natural JavaScript objects. I also welcome any ideas as to how the plugin could be improved.

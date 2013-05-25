# jQuery.template

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
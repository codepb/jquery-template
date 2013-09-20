(function(){
    
    var data = [
        {
            "name" : "test1",
            "id" : 1
        },
        {
            "name" : "test2",
            "id" : 2
        },
        {
            "name" : "test3",
            "id" : 3
        }
    ];
    
    //data formatters
    //single data formatter
    $.addTemplateFormatter("singleFormatter",
        function(value, template) {
            $(this).addClass('red');
            return value.toUpperCase();
        }
    );
    
    $.addTemplateFormatter("singleFormatter2",
        function(value, template) {
            return 99;
        }
    );
    
    //multiple data formatters
    $.addTemplateFormatter({
        UpperCaseFormatter : function(value, template) {
            $(this).addClass('red');
            return value.toUpperCase();
        },
        idFormatter : function(value, template) {
            if (value === 2){
                $(this).addClass('yellow');
            }
            return 'xx';
        },
        SameCaseFormatter : function(value, template) {
            if(template == "upper") {
                return value.toUpperCase();
            } else {
                return value.toLowerCase();
            }
        }
    });
    
    /**
     * general Formatter test
     */
    function general(assert){
        return {
            name: "Templates Formatter",
            setup: function(){
                $("#render").loadTemplate("#template2", data);
            },
            test: function () {
                $('#render div.name').each(function(i){
                    var val = $(this).text();
                    
                    //all names must be in uppercases
                    var match = data[i].name.toUpperCase();
                    assert("match " + val + " !== " + match, val === match);
                    
                    //upperCaseFormatter manipulate element by adding a red class
                    //check if we got that correctly
                    var red = $(this).hasClass('red');
                    assert("has class red", red);
                    
                    //id also has been overriden to 'xx'
                    var id = $(this).next().text();
                    assert("xx id", "xx" === id);
                });
            }
        };
    }
    
    /**
     * This test make sure that all added formatters will be available
     * even if we mix by adding single function formatter or multiple key
     * value style
     */
    function singleFormatter (assert){
        return {
            name: "Single Formatter",
            setup: function(){
                $("#render").loadTemplate("#template3", data);
            },
            test: function () {
                $('#render div.name').each(function(i){
                    var val = $(this).text();
                    
                    var match = data[i].name.toUpperCase();
                    assert("match " + val + " !== " + match, val === match);
                    
                    //upperCaseFormatter manipulate element by adding a red class
                    //check if we got that correctly
                    var red = $(this).hasClass('red');
                    assert("has class red", red);
                    
                    //id also has been overriden to 'xx'
                    var id = $(this).next().text();
                    assert("id xx !== " + id, "xx" === id);
                    
                    //hidden value manipulated by singleFormatter2
                    //using data-format-target to target value attr
                    var hidVal = $(this).nextAll('.hidden').val();
                    assert( "Hidden Value " + hidVal +" !== 99",  hidVal == 99);
                    
                });
            }
        };
    }
    
    //TODO
    function SameCaseFormatter (assert){
        
    }
    
    addTests(general,singleFormatter);

})();

(function () {

    var data = [
        {
            "name": "test1",
            "id": 1
        },
        {
            "name": "test2",
            "id": 2
        },
        {
            "name": "test3",
            "id": 3
        }
    ];

    var nestedData = {
        testSingle: "singleString",
        testArray: ["testString1", "testString2", "testString3", 4]
    }

    function testRender() {
        $("#render").loadTemplate("#template", data, {
            beforeInsert: function (ele) {
                var val = ele.find('.hidden').val();
                if (val == 2) {
                    ele.css({
                        background: "red"
                    });
                }
            }
        });
    }

    function testRenderSingle(inputData) {
        $("#render").loadTemplate("#template", inputData);
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
                name: "Simple Rendering",
                test: function () {
                    testRender();
                    //we rendered 3 elements
                    var childs = $('#render').children().length;
                    assert(childs === data.length);
                }
            },
            {
                name: "Override Rendering",
                test: function () {
                    testRender();
                    //we rendered another 3 elements should overwrite
                    var childs = $('#render').children().length;
                    assert(childs === data.length);
                }
            },
            {
                name: "Append Elements To the View",
                setup: function () {
                    $("#render").loadTemplate("#template", [
                        {
                            name: "befor last",
                            id: 4
                        },
                        {
                            name: "last",
                            id: 5
                        }
                    ], { append: true });
                },
                test: function () {
                    //append 2 more elements so we should get 5
                    var childs = $('#render').children().length;
                    assert("5 elements", childs === 5);
                    //must be last element
                    var val = $('#render div.container:last input.hidden').val();
                    assert("last element id", val == 5);
                }
            },
            {
                name: "Prepend Elements To the View",
                setup: function () {
                    $("#render").loadTemplate("#template", [
                        {
                            name: "first",
                            id: 1
                        },
                        {
                            name: "second",
                            id: 999
                        }
                    ], { prepend: true });
                },
                test: function () {
                    //we prepend another 2 element = 7 elements total
                    var childs = $('#render').children().length;
                    assert("7 elements", childs === 7);

                    //since it's a prepend "first" must be first element
                    var ele = $('#render').children().first();
                    var id = ele.find('input.hidden').val();
                    var name = ele.find(".name").text();
                    assert("first id 1 !== " + id, id == 1);
                    assert("first name 'first' !== " + name, "first" == name);
                }
            },
            {
                name: "Bind Value",
                test: function () {
                    testRenderSingle(data[0]);
                    var val = $('#render input.hidden').val();
                    assert(val + " != " + data[0]['id'], val == data[0]['id']);
                }
            },
            {
                name: "Paged Render First Page",
                setup: function () {
                    $("#render").loadTemplate("#template", data, {
                        paged: true,
                        pageNo: 1,
                        elemPerPage: 2
                    });
                },
                test: function () {
                    //we should have 2 elements
                    var childs = $('#render').children();
                    assert('2 elements', childs.length === 2);
                    //first id is 1
                    var val = childs.first().find('input.hidden').val();
                    assert('match first id', val == 1);
                    //second id is 2
                    var val = childs.last().find('input.hidden').val();
                    assert('match second id', val == 2);
                }
            },
            {
                name: "Paged Render Second Page",
                setup: function () {
                    $("#render").loadTemplate("#template", data, {
                        paged: true,
                        pageNo: 2,
                        elemPerPage: 2
                    });
                },
                test: function () {
                    //we expect 1 element "the last one"
                    var childs = $('#render').children();
                    assert('One element', childs.length === 1);
                    //it's id is 3
                    var val = childs.last().find('input.hidden').val();
                    assert('match last id', val == 3);
                }
            },
            {
                name: 'Test binding to "this"',
                test: function () {
                    $("#render").loadTemplate("#thisTemplate", nestedData.testArray);
                    var childs = $('#render').children();
                    assert('All four rendered', childs.length === 4);
                    assert('Binding to "this"', $(childs[0]).text() === nestedData.testArray[0]);
                }
            },

            {
                name: "Test nesting templates",
                test: function () {
                    $("#render").loadTemplate("#nestTemplate", nestedData);
                    var $rendered = $('#render');
                    assert('Single Worked', $(".single-attribute", $rendered).text() === nestedData.testSingle);
                    var $templateBind = $('.template-bind-nest ul', $rendered);
                    assert('data-template-bind nest worked', $templateBind.length === 1 && $templateBind.children().length == 4);
                    var $attribute = $('.attribute-nest ul', $rendered);
                    assert('attributes nest worked"', $attribute.length === 1 && $attribute.children().length == 4);
                }
            }
        //,
        //{
        //    name : "Find what is async",
        //    test : function(){
        //        setTimeout(async(function () { // wru.async
        //            assert(1==1); // wru.assert
        //        }), 1000);
        //    }
        //}
        ];
    }

    addTests(test);

})();

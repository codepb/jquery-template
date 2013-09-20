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
        },
        {
            "name" : "test4",
            "id" : 4
        },
        {
            "name" : "test5",
            "id" : 5
        }
    ];
    
    function errorsHandle(assert,async){
        var successCounter = 0,
            errorCounter = 0,
            completeCounter = 0,
            sequence = [];
        
        return {
            name: "Custom Error Callback",
            setup: function(){
                $("#render").loadTemplate('test.html', data, {
                    complete : function(){
                        sequence.push('complete');
                        ++completeCounter;
                    },
                    success : function(){
                        sequence.push('success');
                        ++successCounter;
                    },
                    error : function(){
                        sequence.push('error');
                        ++errorCounter;
                    }
                });
            },
            test: function () {
                
                //give it some time to check URL
                setTimeout(async(function () { // async testing
                    
                    //success callback will not be fired
                    assert("Success Counter 0 = " + successCounter, 0 === successCounter);
                    
                    //error should be fired
                    assert("Error Counter 1 = " + errorCounter, 1 === errorCounter);
                    
                    //complete should be called even with errors
                    assert("Complete Counter 1 = " + completeCounter, 1 === completeCounter);
                    
                    //sequence by now should be
                    var expected = 'error,complete';
                    var got = sequence.toString();
                    assert("Sequence " + expected + " = " + got, expected == got );
                    
                }), 1000);
            }
        };
    }
    
    function deafultError(assert,async){
        var successCounter = 0,
            errorCounter = 0,
            completeCounter = 0,
            sequence = [];
        
        return {
            name: "Default Error Callback",
            setup: function(){
                $("#render").loadTemplate('doesnotexists/test.html', data);
            },
            test: function () {
                //give it some time to check URL
                setTimeout(async(function () { //asnc testing
                    var got = $('#render').text();
                    var expected = "There was an error loading the template.";
                    assert("Error Message " + expected + " = " + got, got == expected);
                }), 1000);
            }
        };
    }
    
    addTests(errorsHandle,deafultError);
    
})();

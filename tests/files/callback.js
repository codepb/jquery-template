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
    
    function callback(assert){
        var beforeInsertCounter = 0,
            afterInsertCounter = 0,
            successCounter = 0,
            errorCounter = 0,
            completeCounter = 0;
        
        var sequence = [];
        var elemSequence = [];
        return {
            name: "Number of Call Callbacks",
            setup: function(){
                $("#render").loadTemplate("#template", data, {
                    beforeInsert : function(elem){
                        sequence.push('before');
                        
                        if ($('#render').children().length === beforeInsertCounter) {
                            elemSequence.push(true);
                        }
                        
                        ++beforeInsertCounter;
                        
                        
                    },
                    afterInsert : function(elem){
                        sequence.push('after');
                        
                        ++afterInsertCounter;

                        if ($('#render').children().length === afterInsertCounter) {
                            elemSequence.push(true);
                        }
                                                
                    },
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
                
                //make sure every callback is being called as expected
                
                //before Insert & after Insert counter == 5
                //if we have an array of elements before & after inserts will be
                //called before and after inserting each element
                assert("Before Insert Counter 5 = " + beforeInsertCounter, 5 === beforeInsertCounter);
                assert("After Insert Counter 5 = " + afterInsertCounter, 5 === afterInsertCounter);
                
                //no error expected
                assert("Error Counter 0 = " + errorCounter, 0 === errorCounter);
                
                //those should be called once
                assert("Success Counter 1 = " + successCounter, 1 === successCounter);
                assert("Complete Counter 1 = " + completeCounter, 1 === completeCounter);
                
                //sequence by now should be
                var expected = 'before,after,before,after,before,after,before,after,before,after,complete,success';
                var got = sequence.toString();
                assert("Sequence " + got + " = " + expected, expected == got );
                
                assert("Element Sequence Call 10 == " + elemSequence.length, elemSequence.length === 10);
                
            }
        };
    }
    
    addTests(callback);
    
})();

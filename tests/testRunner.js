var testObject = [];
var scriptTestFiles = [];
var currnetTestFileCounter = 0;
var phantomReport = {};
var phantomExit = false;

function addTests() {
    
    for (var i = 0; i < arguments.length; i++){
        testObject.push(arguments[i]);
    }
    
    var file = scriptTestFiles[currnetTestFileCounter++];
    //hack wru to get better reporting
    testObject.push(function(){
        return {
            teardown :function(){
                var ele = $('#wru').find('div:last');
                var report = $('<div class="testfile"> Done Testsing ' + file + '</div>');
                $('#wru').append(report);
                
                var elements = $('.testfile:last').prevUntil('.testfile'),
                    errors = 0,
                    passes = 0;
                
                var phantom = phantomReport[file] = {
                    errors : {},
                    passes : 0,
                    fails : 0
                };
                
                elements.each(function(){
                    var error = $(this).find('li');
                    errors += error.length;
                    if (error.length > 0) {
                        var errorText = $(this).children().first().text();
                        phantom.errors[errorText] = [];
                        $(error).each(function(){
                            phantom.errors[errorText].push($(this).text());
                        });
                    }
                    
                    var pass = $(this).find('span:first').text();
                    if (pass) {
                        var n = /\w+\s+\((\d+)/.exec(pass);
                        if (n) passes += parseInt(n[1]);
                    }
                });
                
                phantom.passes = passes;
                phantom.fails = errors;
                if (errors > 0) {
                    report.text(report.text() + " ( " + errors + " Errors & " + passes + " Passed )").css({
                        background : "red",
                        color : "white"
                    });
                } else {
                    report.text(report.text() + " ( " + passes + " Tests Passed )");
                }
                
                ele.remove();
            }
        }
        return false;
    });
}

function loadTestFile(src){
    document.write('<' + 'script src="' + src + '"' +
    ' type="text/javascript"><' + '/script>');
}

function runTests(files) {
    $(files).each(function(i,val){
        scriptTestFiles.push(val);
        loadTestFile(val);
    });
}

function wru(wru){
    var assert  = wru.assert,
        async   = wru.async,
        log     = wru.log;
    
    testObject.push(function(assert,async){
        return {
            name : '<span class="final"></span>',
            teardown : function(){
                $('.final').parent().hide();
                phantomExit = true;
            }
        };
    });
    
    var run = function(obj){
        for (var i = 0; i < obj.length; i++){
            var action = obj[i];
            if ($.isArray(action)) {
                run(action);
                continue;
            }
            var ret = obj[i](assert,async);
            if (ret) wru.test(ret);
        }
    };
    
    run(testObject);
    //remove wru headers as we generated our own header reports
    $('#wru').find('strong:not(:first)').remove();
    $('#wru').find('.fail strong').remove();
}

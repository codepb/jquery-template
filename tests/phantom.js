
var page = require('webpage').create();
var fs = require('fs');

page.onConsoleMessage = function (msg, line, source) {
    console.error(msg);
};

page.onClosing = function(){
    console.log('closed');
};

function createReport(obj) {
    
    var totalErrors = 0,
        totalPasses = 0;
    
    console.log("======================================");
    for (key in obj){
        var report = obj[key],
            reportText = " \n " + key + " ";
        
        totalPasses += report.passes;
        totalErrors += report.fails;
        if (report.fails > 0) {
            reportText += '.....(faild)';
            for (name in report.errors){
                reportText += '\n -> ' + name;
                var list = report.errors[name];
                for(var i = 0; i < list.length; i++){
                    reportText += '\n --> ' + list[i];
                }
            }
        } else {
            reportText += '......(ok)';
        }
        console.log(reportText);
    }
    
    console.log("\n======================================");
    console.log("= Done Testing");
    console.log("= Total Tests : " + (totalPasses + totalErrors));
    console.log("= Passed Tests: " + totalPasses);
    console.log("= Failed Tests: " + totalErrors);
    
    //page.render('view.png');
    phantom.exit(totalErrors);
}

//this should be run on a server
//but for now local file seems ok
page.open('index.html', function(status) {
    //var timeout = setTimeout(function(){
    var evaluate = function(){
        return page.evaluate(function(phantom) {
            if (phantomExit) {
                return phantomReport;
            }
            return false;
        });
    };
    
    var timeout;
    var interv = setInterval(function(){
        var ret = evaluate();
        if (typeof ret === 'object') {
            createReport(ret);
            clearInterval(this);
            if (timeout) clearTimeout(timeout);
        }
    },100);
    
    //on timeout
    timeout = setTimeout(function(){
        clearInterval(interv);
        createReport(ret);
    },10000);
    
});

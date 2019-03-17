/*
We Dump Info
https://weleakinfo.com
*/

var szList = "";
var szDelimiter = ":";

for(let i = 0; i < document.getElementsByClassName("resultsPre").length; i++)
{
	var szFilter = document.getElementsByClassName("resultsPre")[i].innerText;
	var Extract_Email = /(?:^|\s)Email: (.*?)(?:\s|$)/g;
	var Extract_Password = /(?:^|\s)Password: (.*?)(?:\s|$)/g;
	
	var szEmail = Extract_Email.exec(szFilter);
	var szPassword = Extract_Password.exec(szFilter);
	
	if(szEmail != null && szPassword != null)
	{
		szList += szEmail[1] + szDelimiter + szPassword[1] + '\n';
	}
}

function download(data, filename, type) { //copy paste shit
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function just_sleep( sleepDuration ) //just_sleep(5000);
{
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function next_page()
{
	var page = parseInt(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText)+1;
	$("#paginationSearch").append('<input type="hidden" name="pagination" value="'+ page +'">');
	$("#paginationSearch").submit();
}

if(szList != null)
{
	download(szList, + new Date + ".txt", "stream-text");
	szList = null;
}
else
	console.log("I can't save anything here");

just_sleep(1000);
next_page();

var batchSize = 500;
var iter = 0;
var version = 'ALL';
var loaded = 0;

function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function loadBatch(){
    $.ajax({
         url:"http://apps-community.appspot.com/feed/?limit=" + batchSize + "&start="+batchSize * iter + "&full=yes&filter=no&version=" + version,
         dataType: 'JSONP', // Notice! JSONP <-- P
         success:next,
         error:function(){
             alert("Error");
         },
    });
    iter++;
}
function appendData(data){
    $.each(data, function(i, item){
        $('#list_table').append(
            '<tr><td>'  + data[i]['n']
          + '</td><td>' + data[i]['ci']
          + '</td><td>' + data[i]['st']
          + '</td><td>' + data[i]['co']
          + '</td></tr>');

    });    
}
function next(data) {  
    if(!(data.length===0)){
        loaded += data.length;
        appendData(data);
        loadBatch();
        $('#status').html('Loading data... ' + loaded + ' entries loaded.');
    }
    else{
        $('#status').html('Completed. ' + loaded + ' entries loaded.');
$('#list_table').dataTable({"bJQueryUI": true,"sPaginationType": "full_numbers","bPaginate": false});
    }
}
$(function(){
    var ver = getParameterByName('version');
    version = (ver)?ver:version;
    $('.makebutton').button();
    loadBatch();
});
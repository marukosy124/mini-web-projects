$("#submit").click(function(){
    $("#comments").append(addcm()); 
    $("#form").trigger('reset'); 
    autosave();
});

function autosave(){
    var a = document.getElementById('comments');
    var html = a.outerHTML;       
    $.ajax({
        url: "testing.txt",
        type: "PUT",
        dataType: 'text',
        contentType: "text/plain",
        data: html,
    })
}

$(document).ready(function(){
    $.ajax({
        url: "testing.txt",
        type: "GET"
    })
        .done('testing.txt', function(txt){
            $('#comments').load('testing.txt');
        })
});
function addcm(){
    let $neww = $("<li><svg><circle></circle></svg><div><h5></h5><h6></h6><p></p></div></li>");
    var link = $('<a>', {
        text: 'Reply',
        href: '#',
        //onclick: 'reply()',
    });
    $neww.addClass("media");
    $neww.find("p").html($("#cm").val());
    $neww.find("div").addClass("media-body");
    $neww.find("h6").html($("#subj").val());
    $neww.find("h5").html($("#name").val());
    $neww.find("svg").attr({"height": 100, "width": 100});
    $neww.find("circle").attr({"cx": 50, "cy": 50, "r": 40, "fill": $("input[name=color]:checked").val()});
    $neww.find("div").append(link);
    return $neww;
}

$(document).ready(function(){
    $('#comments').on('click', 'a', function(){
        var clone = $('#form').clone();
        $(this).after(clone);
        $("#submit").click(function(){
            var cm = addcm().wrap("<ul></ul>").parent();
            cm.insertBefore('#form');
            $("#form").remove(); 
            autosave();
        });
    });    
});

function getJSON(name) {
    
    $.ajaxSetup({ cache: false });

    $.getJSON("../json/"+name+".json", function(data){ 
        var html = [];
        /* loop through array */
        $.each(data, function(index, d){            
            html.push("Number: ", d.name, ", ",
                      "prev_hash : ", d.Sold, ", ", 
                      ": ", d.Month, "<br>");
        });

        $("#div381").html(html.join('')).css("background-color", "orange");
    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
        /* alert(jqXHR.responseText) */
        alert("error occurred!");
    });
}
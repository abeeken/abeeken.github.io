function getGithubFolder(path){
    $.getJSON( path, function( data ){
        console.log(data);
    });
}
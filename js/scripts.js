/**
 * getGithubFolder
 * Takes a path and returns the file list for a given public GitHub repo
 * Inserts content into target
 * 
 * @param {*} path
 * @param {*} vars
 * @param {*} target
 * @param {*} template
 */
function getGithubFolder(path, vars, target, template){
    $.getJSON( path, function( data ){
        $.each(data, function(){
            var item = this;
            var output = template;
            $.each(vars, function(){
                var value = this;
                output = output.replace('{'+value+'}', item[value]);
            });
            $(target).append(output);
        });        
    });
}
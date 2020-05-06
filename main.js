const post = [{title : 'Post', body : 'this is post one'},
{title : 'Post', body : 'this is post one'}]

function getPost(){
    var output = '';
    setTimeout(()=> {
        post.forEach((post) => output += `<li>${post.title}</li>`)
        document.body.innerHTML = output;
    }, 1000);
 
}


function createPost(callback){
    setTimeout(() => {
        post.push({title : 'Post', body : 'this is post 3'});
        callback();
    },2000)
}

createPost(getPost);
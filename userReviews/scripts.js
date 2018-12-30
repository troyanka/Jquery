$(document).ready(function(){
   init();

    //Add comment 
   $('.add-comment').click(addComment);
});

let comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];

function init(){
    console.log("comments", comments);
    if(comments){
        comments.map(comment=>{
            return console.log(comment.name);
        });
    }
}

function addComment(){
    console.log('Add comment clicked');
    let commentDetails = {
        name: $('.form-for-comment input[name="user-name"]').val(),
        comment: $('.form-for-comment #user-comment').val()
    }
    comments.push(commentDetails);

    localStorage.setItem("comments", JSON.stringify(comments));

    console.log(JSON.stringify(comments));
}

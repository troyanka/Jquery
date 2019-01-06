$(document).ready(function () {
    let comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];

    init();

    //Event Listeners 
    $('main').on('click', '.add-comment', addComment);
    $('main').on('click', '.save-comment', updateComment);
    $('.user-comments').on('click', 'i.fa-trash-alt', deleteComment);
    $('.user-comments').on('click', 'i.fa-pencil-alt', editComment);
    $('main').on('click', '.delete-comments', deleteAll);
    $('main').on('click', '.show-dates', showDates);

    function init() {
        if (comments) {
            comments.forEach(comment => addCommentToDOM(comment));
        }
    }

    function showDates() {
        if (comments) {
            comments.forEach(comment => {
                let d = new Date(comment.id),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                let date = new Date();
                date.toLocaleDateString();

                let dateFormatted = [day, month, year].join('-');

                console.log(dateFormatted);

                $(`div[data-id=${comment.id}] p`).after(`<div class='publish-date'>Published: ${dateFormatted}</div>`);
            });
        }
    }

    function deleteAll() {
        $('.user-comments').empty();
        localStorage.setItem("comments", []);
    }

    function updateComment() {
        let updatedComent = $('.in-update-mode');
        console.log("updatedComent", updatedComent);
        addComment();
    }

    function editComment(e) {
        let closestId = $(e.target).closest('div.comment').data('id');
        //let position = $(e.target).closest('div.comment').position();
        //console.log(position);
        //console.log("closestId", closestId); 
        $('.form-for-comment').hide();

        let myComment = comments.filter(function (comment) {
            return comment.id === closestId;
        });
        myComment = myComment[0];
        console.log("myComment", myComment);
        let updateForm = `<div class="form-for-comment update-form">
            <input class="user-name" type="text" name="user-name" placeholder="Your name" value="${myComment.Fname} ${myComment.Lname}"/>
            <textarea name="user-comment" id="user-comment" cols="30" placeholder="Your comment">${myComment.comment}</textarea>
            <button class="btn save-comment">Save</button>
        </div>`;
        let $editedElem = $(`div[data-id=${closestId}]`);
        $(updateForm).insertBefore($editedElem);
        $editedElem.addClass('in-update-mode');
        //$("main").prepend(updateForm);
    }

    function deleteComment(e) {
        let closestId = $(e.target).closest('div.comment').data('id');
        comments = comments.filter(function (comment) {
            return comment.id != closestId;
        });
        localStorage.setItem("comments", JSON.stringify(comments));
        $(`div[data-id=${closestId}]`).remove();
    }

    function addComment() {
        let fullname = $('.form-for-comment input[name="user-name"]').val().split(' ');
        let commentDetails = {
            Fname: fullname[0],
            Lname: fullname[1],
            comment: $('.form-for-comment #user-comment').val(),
            id: new Date().getTime()
        }
        comments.push(commentDetails);
        localStorage.setItem("comments", JSON.stringify(comments));
        addCommentToDOM(commentDetails);
    }

    function addCommentToDOM(commentDetails) {
        let commenthtml = `<div class="comment" data-id=${commentDetails.id}>
        <img src="https://ui-avatars.com/api/?name=${commentDetails.Fname}+${commentDetails.Lname}"/>
        <h3>${commentDetails.Fname} ${commentDetails.Lname}</h3>
        <p>${commentDetails.comment}</p>
        <div class="icons">
                <i class="fas fa-pencil-alt"></i>
                <i class="fas fa-trash-alt"></i>
        </div>
        </div>`

        $('.user-comments').append(commenthtml);
        $('.update-form').remove();
        $('.form-for-comment').show();

    }
});
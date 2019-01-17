$(document).ready(function () {
    let comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];

    init();

    //Event Listeners 
    $('main').on('click', 'button[value=add]', addNewComment);
    $('main').on('click', 'button[value=update]', updateComment);
    $('.user-comments').on('click', 'i.fa-trash-alt', deleteComment);
    $('.user-comments').on('click', 'i.fa-pencil-alt', UpdateModeOn);
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

                $(`div[data-id=${comment.id}] p`).after(`<div class='publish-date'>Published: ${dateFormatted}</div>`);
            });
        }
    }

    function deleteAll() {
        $('.user-comments').empty();
        localStorage.setItem("comments", []);
    }

    function updateComment() {
        console.log('%c *** Inside updateComment', 'color: purple');
        let id = $('.in-update-mode').data('updateid');

        //get data from the form
        let details = getDataFromForm();

        let index = comments.findIndex(comment => comment.id === id);
        let updatedComment = comments[index];
        updatedComment.Fname = details.Fname;
        updatedComment.comment = details.comment;
        addCommentToDOM(updatedComment);

        localStorage.setItem("comments", JSON.stringify(comments));

        $('.in-update-mode').hide();
    }

    function UpdateModeOn(e) {
        console.log('%c ***Inside UpdateModeOn', 'color: purple');
        //turn on update mode
        let closestId = $(e.target).closest('div.comment').data('id');

        let myComment = comments.filter(function (comment) {
            return comment.id === closestId;
        });
        myComment = myComment[0];
        console.log("Comment id in update mode:", myComment.id);

        //Fill in 'update form' with values
        let clonedForm = $(".form-for-comment").clone();
        clonedForm.find('input').each(function () {
            this.value = `${myComment.Fname} ${myComment.Lname}`;
        });
        clonedForm.find('textarea').each(function () {
            this.value = myComment.comment;
        });
        clonedForm.find('button').each(function () {
            this.value = 'update';
            $(this).html('Update');
        });
        clonedForm.attr('data-updateid', closestId);

        $('.form-for-comment').hide();

        $(`div[data-id=${closestId}]`).replaceWith(clonedForm);
        clonedForm.addClass('in-update-mode');
    }

    function deleteComment(e) {
        let closestId = $(e.target).closest('div.comment').data('id');
        comments = comments.filter(function (comment) {
            return comment.id != closestId;
        });
        localStorage.setItem("comments", JSON.stringify(comments));
        $(`div[data-id=${closestId}]`).remove();
    }

    function getDataFromForm() {
        console.log('%c ***Inside getDataFromForm', 'color: purple');
        let fullname = $('.form-for-comment input[name="user-name"]').val().split(' ');
        let commentDetails = {
            Fname: fullname[0],
            Lname: fullname[1],
            comment: $('.form-for-comment #user-comment').val(),
            id: new Date().getTime()
        }
        console.log("commentDetails", commentDetails);
        return commentDetails;
    }

    function addNewComment() {
        let commentDetails = getDataFromForm();
        comments.push(commentDetails);
        localStorage.setItem("comments", JSON.stringify(comments));
        addCommentToDOM(commentDetails);
        $('.form-for-comment').show();
    }

    function addCommentToDOM(commentDetails) {
        let commenthtml = `<div class="comment" data-id=${commentDetails.id}>
        <img src="https://ui-avatars.com/api/?name=${commentDetails.Fname}+${commentDetails.Lname}"/>
        <div class="comment-content">
            <h3>${commentDetails.Fname} ${commentDetails.Lname}</h3>
            <p>${commentDetails.comment}</p>
        </div>
        <div class="icons">
                <i class="fas fa-pencil-alt"></i>
                <i class="fas fa-trash-alt"></i>
        </div>
        </div>`

        $('.user-comments').append(commenthtml);
        $('.update-form').remove();
    }
});
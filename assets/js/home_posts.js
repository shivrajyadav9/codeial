{
    //method to submit the form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                // dataType: "json",
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post[0]);
                    console.log(data.message);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button')[0]);

                    // call the create comment class
                    //  new PostComments(data.data.post._id);

                     // CHANGE :: enable the functionality of the toggle like button on the new post
                     new ToggleLike($(' .toggle-like-button',newPost));

                     new Noty({
                         theme: 'relax',
                         text: "Post published!",
                         type: 'success',
                         layout: 'topRight',
                         timeout: 1500

                     }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to delete a post from dom

    let deletePost = function (deleteLink) {

        $(deleteLink).click(function (e) {
            // console.log(deleteLink);
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(data.message);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log('ERROR: ' + error.responseText);
                }
            })
        })
    }

    //method to create a post in dom 

    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
           <span id="post-user-name">
            <div class="post-user-photo">
                <img src="${post.user.avatar}">
            </div>
            ${post.user.name}
            </span>
                <small class="about-post">
                    ${post.user.createdAt}
                </small>
                <span>
                        <span>
                            <a class="delete-post-button button" href="/posts/destroy/${post._id}">Delete</a>
                        </span>
                    
                    </span>
        <br><br>
        ${post.content}
    
            <br>
            <small>
               
                    <a class="toggle-like-button" data-likes="${post.likes.length }" href="/likes/toggle/?id=${post._id}&type=Post">
                        ${post.likes.length } Likes
                    </a>   
                   
            </small>
    
            </p>
            <div class="post-comments">
               
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type your comment.." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" class="button" value="Add Comment">
                    </form>
    
            </div>
            <hr>
    </li>`)
    };


    createPost();
    for (button of $('.delete-post-button')) {
        deletePost(button);
    }

}

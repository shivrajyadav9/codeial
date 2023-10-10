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
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    console.log(data.message);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button')[0]);
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
    
            ${post.content}
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
                    </small>
                
                        <br>
                        <small class="about-post">
                            ${post.user.name}
                                ${post.createdAt}
                        </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type your comment.." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
    

    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
        </div>
    </li>`)
    };

    
    createPost();
    for (button of $('.delete-post-button')) {
        deletePost(button);
    }

}

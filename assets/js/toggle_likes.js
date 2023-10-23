class ToggleLike {


    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            //new way of writing ajax similar to promises
            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
                .done(function(data){
                    let likesCount = parseInt($(self).attr('data-likes'));
                    console.log(likesCount);

                    console.log(data);
                    if (data.data.deleted === true) {
                        likesCount -= 1;
                    } else {
                        likesCount += 1;
                    }

                    $(self).attr('data-likes', likesCount);
                    $(self).html(`${likesCount} Likes`)
                })
                .fail((err) => {
                    console.log('error in completing the request');
                });
        });
    }
}
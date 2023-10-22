# Doubts
1)  SOLVED : user which is signed in is not comming to the partials in views,for now i am passing the 'current_user' seperately while rendring the home.ejs file from home controller and using the 'current_user' in '_post.ejs' and '_comment.ejs'.


TODO :-
# AJAX
1) get user information without refresh
2) create and delete comments
3) display NOTY notifications

# File Upload
1) apply filters on the format size of file uploaded

<script>
                            <% if (flash.success && flash.success.length > 0) {%>
                            new Noty({
                                theme: 'relax',
                                text: '<%=flash.success%>',
                                type: 'success',
                                layout: 'topRight',
                                timeout: '1500'
                            }).show();
                               <%}%>
                               <% if (flash.error && flash.error.length > 0) {%>
                            new Noty({
                                theme: 'relax',
                                text: '<%=flash.error%>',
                                type: 'error',
                                layout: 'topRight',
                                timeout: '1500'
                            }).show();
                               <%}%>
                    </script>
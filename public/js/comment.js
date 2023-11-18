const newCommentHandler = async (event) => {
    event.preventDefault();

    const newCommentContent = $('#new-comment-content').val().trim();
    // traverse DOM to retreive post_id number from URL
    const newCommentPostId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const newCommentInput = {
        content: newCommentContent,
        post_id: newCommentPostId
    };

    console.log(newCommentInput)



    if (newCommentInput) {
        try {
            const response = await fetch('/api/comments/create', {
                method: 'POST',
                body: JSON.stringify(newCommentInput), 
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('New comment created:', responseData);
                document.location.reload();
            }
        } catch (error) {
        console.error(error);
        alert('An unexpected error occurred. Please try again.');
        }
    }   
}


// for testing
const buttonTest = async (event) => {
    event.preventDefault();
    document.location.replace('/test');
}

 
// event handler for the login button
$('#comment-btn').click(function(event) {
    newCommentHandler(event);
});
  
  // event handler for enter key on the last input field
$('#new-comment-content').on('keyup', function(event) {
    if (event.key === 'Enter') {
        newCommentHandler(event);
    }
});
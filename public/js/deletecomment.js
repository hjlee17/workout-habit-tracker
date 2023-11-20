const deleteCommentHandler = async (event) => {
    event.preventDefault();

    // retrieve comment_id from the html
    const commentClassesArray = event.target.classList;;
    console.log('commentClassesArray:', commentClassesArray)
    const commentFirstClassString = commentClassesArray[0];
    console.log('commentFirstClassString:', commentFirstClassString)
    const comment_id = commentFirstClassString.split('-')[1];
    console.log('comment_id:', comment_id)

    const deletedCommentID = {
        id: comment_id,
    };

    console.log('deletedCommentID: ', deletedCommentID)

    if (deletedCommentID) {
        try {
            const response = await fetch(`/api/comments/${comment_id}`, {
                method: 'DELETE',
                body: JSON.stringify(deletedCommentID),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('Post deleted:', responseData);
                window.location.reload();
            } else {
                console.error('Failed to delete comment:', response.status);
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
  
// event handler for the edit post button
$('.delete-comment').click(function(event) {
    deleteCommentHandler(event);
});
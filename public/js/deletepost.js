const deletePostHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 2
    ];

    const deletedPostID = {
        id: post_id,
    };

    console.log('deletedPostID:', deletedPostID)

    if (deletedPostID) {
        try {
            const response = await fetch(`/api/posts/delete/${post_id}`, {
                method: 'DELETE',
                body: JSON.stringify(deletedPostID),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('Post deleted:', responseData);
                document.location.replace(`/dashboard`);
            } else {
                console.error('Failed to delete post:', response.status);
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
$('#confirm-delete-btn').click(function(event) {
    deletePostHandler(event);
});
  

  
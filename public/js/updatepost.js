const updatePostHandler = async (event) => {
    event.preventDefault();

    const updatedTitle = $('#update-post-title').val().trim();
    const updatedPostContent = $('#update-post-content').val().trim();

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 2
    ];


    const updatedPostInput = {
        id: post_id,
        title: updatedTitle,
        content: updatedPostContent
    };

    console.log('updatedPostInput:', updatedPostInput)

    if (updatedTitle && updatedPostContent) {
        try {
            const response = await fetch(`/api/posts/update/${post_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedPostInput),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('Post updated:', responseData);
                document.location.replace(`/posts/${post_id}`);
            } else {
                console.error('Failed to update post:', response.status);
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
$('#update-btn').click(function(event) {
    updatePostHandler(event);
});
  

  
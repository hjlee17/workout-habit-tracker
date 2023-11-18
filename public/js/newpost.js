const newPostHandler = async (event) => {
    event.preventDefault();

    const title = $('#new-post-title').val().trim();
    const postContent = $('#new-post-content').val().trim();

    
    const newPostInput = {
        title: title,
        content: postContent
    };

    console.log(newPostInput)

    if (title && postContent) {
        try {
            const response = await fetch('api/posts/create', {
                method: 'POST',
                body: JSON.stringify(newPostInput),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('New post created:', responseData);
                document.location.replace('/dashboard');
            } else {
                console.error('Failed to create a new post:', response.status);
                alert('Failed to create a new post. Please try again.');
            } 
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again.');
        }
    }
}


// event handler for the login button
$('#create-btn').click(function(event) {
    newPostHandler(event);
});
  
  // event handler for enter key on the last input field
$('#new-post-content').on('keyup', function(event) {
    if (event.key === 'Enter') {
        newPostHandler(event);
    }
});
  
  
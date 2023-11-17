const signupHandler = async (event) => {
  event.preventDefault();

  const first_name = $('#first-name-signup').val().trim();
  const last_name = $('#last-name-signup').val().trim();
  const email = $('#email-signup').val().trim();
  const github = $('#github-signup').val().trim();
  const password = $('#password-signup').val().trim();

  if (!(first_name && last_name && email && password)) {
      alert('Please fill in all required fields.');
      return;
  }

  const newUserData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      github: github,
      password: password
  };

  try {
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(newUserData),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // replace with correct endpoint
          document.location.replace('/dashboard');
          
      } else {
          // can i implement error handling when the user already exists?
          const error_message = await response.text();
          console.error(error_message);
          alert(`Error: ${error_message}\nCheck console for further details.`);
      }
  } catch (error) {
      console.error(error);
      alert('An unexpected error occurred. Please try again.');
  }
};


// event handler for the signup button
$('#signup-btn').click(function(event) {
  signupHandler(event);
});

// event handler for enter key on the last input field
$('#password-signup').on('keyup', function(event) {
  if (event.key === 'Enter') {
      signupHandler(event);
  }
});


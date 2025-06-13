async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const container = document.getElementById('user-container');
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.className = 'user-block';
            userBlock.innerHTML = `<p>ID: ${user.id}</p><p>Name: ${user.name}</p><a href="user-data.html?id=${user.id}">View Details</a>`;
            container.appendChild(userBlock);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function loadPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = window.location.pathname.split('/').pop();

    if (page === 'main.html') {
        fetchUsers();
    } else if (page === 'user-data.html') {
        const userId = urlParams.get('id');
        fetchUserDetails(userId);
        document.getElementById('load-posts').addEventListener('click', () => fetchUserPosts(userId));
        document.getElementById('back-btn').addEventListener('click', () => window.location.href = 'main.html');
    } else if (page === 'post-data.html') {
        const postId = urlParams.get('id');
        fetchPostDetails(postId);
        document.getElementById('back-btn').addEventListener('click', () => window.location.href = 'main.html');
    }
}

async function fetchUserDetails(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        const detailsDiv = document.getElementById('user-details');
        detailsDiv.innerHTML = `
      <p>ID: ${user.id}</p>
      <p>Name: ${user.name}</p>
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
      <p>Geo: Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p>Company: ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}</p>
    `;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

async function fetchUserPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();
        const postList = document.getElementById('post-list');
        postList.innerHTML = '';
        posts.forEach(post => {
            const postBlock = document.createElement('div');
            postBlock.className = 'post-block';
            postBlock.innerHTML = `<p>Title: ${post.title}</p><a href="post-data.html?id=${post.id}">View Post</a>`;
            postList.appendChild(postBlock);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function fetchPostDetails(postId) {
    try {
        const [postResponse, commentsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        ]);
        const post = await postResponse.json();
        const comments = await commentsResponse.json();
        const postDetailsDiv = document.getElementById('post-details');
        postDetailsDiv.innerHTML = `
      <p>User ID: ${post.userId}</p>
      <p>ID: ${post.id}</p>
      <p>Title: ${post.title}</p>
      <p>Body: ${post.body}</p>
    `;
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.className = 'comment-block';
            commentBlock.innerHTML = `
        <p>ID: ${comment.id}</p>
        <p>Name: ${comment.name}</p>
        <p>Email: ${comment.email}</p>
        <p>Body: ${comment.body}</p>
      `;
            commentsContainer.appendChild(commentBlock);
        });
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
}

window.addEventListener('load', loadPage);
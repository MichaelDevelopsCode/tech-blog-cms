
const oldHTML = document.getElementById('user-posts') ? document.getElementById('user-posts').innerHTML : "" ;

const createPostHtml = `<section>
<h2>Create New Post</h2>

<form class="new-post-form">
  <div>
    <label for="post-title">Title</label>
    <input type="text" id="post-title" name="post-title" />
  </div>
  <div>
    <label for="content">Content</label>
    <textarea id="content" name="content"></textarea>
  </div>
  <div>
    <button type="submit" class="btn">Create</button>
    <button onclick="cancelPost()">Cancel</button>
  </div>
</form>
</section>`

async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  function startNewPost() {
    document.getElementById('post-section').innerHTML = createPostHtml;
    document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  }

  function cancelPost() {
    document.getElementById('post-section').innerHTML = "<button onclick='startNewPost()'>Create new post</button>" + oldHTML;
  }

console.log("dashboard scripts linked");
const username = document.getElementsByClassName('name')[0].id;
console.log(username)
let currentUser;

getUser = async (currentUser) => {
    user = await fetch(`/id`)
    .then((response) => response.json())
    currentUser = user;
    return currentUser;
}

getBlogs = async (currentUser) => {
    user = await fetch(`/id`)
    .then((response) => response.json()
    .then((user) => {
        fetch(`/api/blogs/one/${user}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const dataObject = {data:data};
        const template = Handlebars.compile(`{{#each data}}
        
        <div class="card card-body">
        <h3>{{this.title}}</h3>
        <p>{{this.text}}</p>
        <p>Posted by user {{this.username}} </p>
        </div>
        
        
        {{/each}}`)
        const filled = template(dataObject);

        console.log("filled-------------",filled);

        const blogEl = document.querySelector("#output");
        blogEl.innerHTML = filled;
    })
    }))
}

getBlogs();

newBlog = () => {
    const template = Handlebars.compile(`
    <form class="form blog-form">
    <div class="form-group">
      <label for="title">Title:</label>
      <input class="form-input" type="title" id="blog-title" />
    </div>
    <div class="form-group">
      <label for="body">body:</label>
      <textarea class="form-input" type="body" id="blog-body"> </textarea>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
    `);
    const filled = template();
    const outputEl = document.querySelector("#output");
    outputEl.innerHTML = filled;


    const blogFormHandler = async (event) => {
        event.preventDefault();
        const title = document.querySelector("#blog-title").value.trim();
        const text = document.querySelector("#blog-body").value.trim();
        const user_id = await getUser().then((user) => user);
        console.log("user_id for upload: ",user_id)
        if (title && text) {
            const upload = await fetch('api/blogs/', {
                method: 'POST',
                body: JSON.stringify( {title, text, user_id, username: username}),
                headers: {'Content-Type': 'application/json'},
            });
        }
    }

    document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);



} 
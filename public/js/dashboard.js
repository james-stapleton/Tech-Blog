console.log("dashboard scripts linked");

let currentUser;

getUser = async (currentUser) => {
    user = await fetch(`http://localhost:3001/id`)
    .then((response) => response.json())
    currentUser = user;
    return currentUser;
}

getBlogs = async (currentUser) => {
    user = await fetch(`http://localhost:3001/id`)
    .then((response) => response.json()
    .then((user) => {
        fetch(`http://localhost:3001/api/blogs/one/${user}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const dataObject = {data:data};
        const template = Handlebars.compile(`{{#each data}}
        
        <div class="card card-body">
        <h3>{{this.title}}</h3>
        <p>{{this.text}}</p>
        <p>Posted by user {{this.user_id}} </p>
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
      <label for="title">email:</label>
      <input class="form-input" type="title" id="blog-title" />
    </div>
    <div class="form-group">
      <label for="body">password:</label>
      <input class="form-input" type="body" id="blog-body" />
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
                body: JSON.stringify( {title, text, user_id}),
                headers: {'Content-Type': 'application/json'},
            });
        }
    }

    document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);



} 
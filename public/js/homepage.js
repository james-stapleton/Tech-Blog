console.log("file linked!")

fetch("/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const blogData = {data: data};
    const template = Handlebars.compile(`{{#each data}}

    <div class="card bg-success">
    <div class = "card-header bg-dark text-success text-center">
    <h3>{{this.title}}</h3>
    </div>
    <p class = "blog-text" >{{this.text}}</p>

      <footer > 

        <a class = "footer-btn" href="/blog/{{this.id}}"><button class = " btn btn-outline-dark"> View Comments </button></a>
        <p class = "footer" >Posted by {{this.username}} at {{this.createdAt}}</p>
        
      </footer>
    </div>
    
    {{/each}}`);

    const filled = template(blogData);
    const outputEl = document.querySelector("#output");
    outputEl.innerHTML = filled;
  });

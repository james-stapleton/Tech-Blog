console.log("file linked!")

fetch("/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const blogData = {data: data};
    const template = Handlebars.compile(`{{#each data}}

    <div class="card card-body">
    <h3>{{this.title}}</h3>
    <p>{{this.text}}</p>
    <p>Posted by user {{this.username}} </p>
    <a href="/blog/{{this.id}}"><button> View Comments </button></a>
    </div>
    
    {{/each}}`);

    const filled = template(blogData);
    const outputEl = document.querySelector("#output");
    outputEl.innerHTML = filled;
  });

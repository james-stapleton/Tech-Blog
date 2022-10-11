console.log("file linked!")

fetch("http://localhost:3001/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const blogData = {data: data};
    const template = Handlebars.compile(`{{#each data}}
    
    <h3>{{this.title}}</h3>
    <p>{{this.text}}</p>
    
    {{/each}}`);

    const filled = template(blogData);
    const outputEl = document.querySelector("#output");
    outputEl.innerHTML = filled;
  });

console.log("file linked!")
const blog = document.getElementsByClassName('id')[0].id
console.log(blog)

fetch(`/api/blogs/${blog}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.comments[0].text);
    const template = Handlebars.compile(`{{data}}

    <div class="card card-body">
    <h3>{{this.title}}</h3>
    <p>{{this.text}}</p>
    <p>Posted by user {{this.username}} </p>
    </div>
    `);

    const filled = template(data);
    const outputEl = document.querySelector("#output");
    outputEl.innerHTML = filled;

    console.log("Comments before formatting",data.comments)
    const comments = {data: data.comments};
    console.log("comments after formatting",comments)


    const template2 = Handlebars.compile(`{{#each data}}
        
    <div class="card card-body">
    <p>{{this.text}}</p>
    </div>
    
    
    {{/each}}`);

    console.log(template2);

    const filled2 = template2(comments);
    console.log("filled template: ",filled2)
    const outputEl2 = document.querySelector("#output2");
    outputEl2.innerHTML = filled2;

  });

  function addComment(event) {
    console.log("Event:",event)
    event.preventDefault();
    const commentBox = document.querySelector('#comment-box');
    const newComment = commentBox.value;
    console.log(newComment);
    const uploadObject = {
        "text": newComment,
        "user_id": 3,
        "blog_id": blog
    }

    const upload = JSON.stringify(uploadObject);

        //options for our post route
        const postOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: upload,
        };
      
        console.log(postOptions);
      
        fetch("/api/comments", postOptions).then(() => {
          console.log("Thank you for adding a new comment to this post!");
        });


  }

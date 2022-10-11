console.log("dashboard scripts linked");

fetch(`http://localhost:3001/id`)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    const user = data;
    fetch(`http://localhost:3001/api/users/${data}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
})
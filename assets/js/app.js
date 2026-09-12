const cl= console.log;

const BASE_URL = "https://jsonplaceholder.typicode.com/"

const POST_URL = `${BASE_URL}/posts`



const xhr = new XMLHttpRequest()

xhr.open("GET",POST_URL)


xhr.onload = function() {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.response)
        let result = ``;
        data.forEach(post => {

            result += ` <div class="col-4 mt-4" id="${post.id}">
                <div class="card h-100">
                    <div class="card-header">
                        <h3>${post.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>${post.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">

                        <button class=" btn btn-sm btn-outline-primary">EDIT</button>
                        <button class="btn btn-sm btn-outline-danger">DELETE</button>


                    </div>

                </div>
            </div>
            
            `
            
const postcontainer =document.getElementById("postcontainer")

            postcontainer.innerHTML = result;

        });
    } else {
        cl("error")
    }


}



xhr.send()
















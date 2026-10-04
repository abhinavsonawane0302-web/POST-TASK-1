const cl = console.log;


const form = document.getElementById("form")
const userId = document.getElementById("userId")
const title = document.getElementById("title")
const body = document.getElementById("body")
const addpostbtn = document.getElementById("addpostbtn")
const updatebtn = document.getElementById("updatebtn")
const spinner = document.getElementById("spinner")



const BASE_URL = "https://jsonplaceholder.typicode.com/"

const POST_URL = `${BASE_URL}/posts`



const xhr = new XMLHttpRequest()

xhr.open("GET", POST_URL)

xhr.send()

xhr.onload = function () {
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

                        <button onclick ="onedit(this)" class=" btn btn-sm btn-outline-primary">EDIT</button>
                        <button onclick ="ondelete(this)" class="btn btn-sm btn-outline-danger">DELETE</button>


                    </div>

                </div>
            </div>
            
            `

            const postcontainer = document.getElementById("postcontainer")

            postcontainer.innerHTML = result;

        });
    } else {
        cl("error")
    }


}



function oncreate(eve) {

    spinner.classList.remove("d-none")

    eve.preventDefault()

    let postobj = {
        userId: userId.value,
        title: title.value,
        body: body.value

    }

    let xhr = new XMLHttpRequest()

    xhr.open("POST", POST_URL)

    xhr.send(JSON.stringify(postobj))

    xhr.onload = function () {

        let response = JSON.parse(xhr.response)

        if (xhr.status === 201) {

            let newpost = document.createElement("div");
            newpost.className = `col-4 mt-4`
            newpost.id = response.id
            newpost.innerHTML = ` 
                                 
                <div class="card h-100">
                    <div class="card-header">
                        <h3>${postobj.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>${postobj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">

                        <button onclick ="onedit(this)" class=" btn btn-sm btn-outline-primary">EDIT</button>
                        <button onclick ="ondelete(this)" class="btn btn-sm btn-outline-danger">DELETE</button>


                    </div>

                </div>
            
              
            `
            postcontainer.prepend(newpost)
            form.reset()

            Swal.fire({
                text: "Your id is created successfully!!!",
                icon: "success",
                timer: 2000
            })
        } else {
            cl(`something went wrong !!!`)
        }

        spinner.classList.add("d-none")

    }

    xhr.onerror = function () {
        spinner.classList.add("d-none")
    }
}


function onedit(ele) {
    let editId = ele.closest(".col-4").id

    spinner.classList.remove("d-none")

    localStorage.setItem("updateId", editId);

    let editUrl = `${BASE_URL}/posts/${editId}`

    let xhr = new XMLHttpRequest()
    xhr.open("GET", editUrl)
    xhr.send(null)
    xhr.onload = function () {
        if (xhr.status == 200) {

            let response = JSON.parse(xhr.response)

            title.value = response.title
            body.value = response.body
            userId.value = response.userId

            addpostbtn.classList.add("d-none")
            updatebtn.classList.remove("d-none")



        } else {

        }
        spinner.classList.add("d-none")


    }

    xhr.onerror = function () {
        spinner.classList.add("d-none")
    }

}


function onupdate() {
    let updateId = localStorage.getItem("updateId")


    let updateobj = {

        title: title.value,
        body: body.value,
        userId: userId.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${POST_URL}/${updateId}`)
    xhr.send(JSON.stringify(updateobj))
    form.reset()
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status <= 299) {
            let response = JSON.parse(xhr.response)

            let updatecard = document.getElementById(updateId);
            updatecard.querySelector("h3").innerHTML = updateobj.title;
            updatecard.querySelector(".card-body").innerHTML = updateobj.body;

            updatebtn.classList.add("d-none")
            addpostbtn.classList.remove("d-none")

            Swal.fire({
                text: "Your ${updateId} is update successfully!!!",
                icon: "success",
                timer: 2000
            })


        }
    }

    localStorage.removeItem("updateID")
}


function ondelete(ele) {
    let deleteId = ele.closest(".col-4").id

    let deleteUrl = `${BASE_URL}/posts/${deleteId}`

    let xhr = new XMLHttpRequest();


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed)



            xhr.open("DELETE", deleteUrl)
        xhr.send(null)
        xhr.onload = function () {
            if (xhr.status === 200) {
                ele.closest(".col-4").remove()
            }
        }

        Swal.fire({
            text: `Your ${deleteId} is delete successfully!!!`,
            icon: "success",
            timer: 2000

        })

    })
}



form.addEventListener("submit", oncreate)
updatebtn.addEventListener("click", onupdate)






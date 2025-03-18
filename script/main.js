const loadCategory = async()=>{
    let response = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    let data = await response.json()
    displayCategories(data.categories);
}
const displayCategories = (data)=>{
    let cateContainer = document.getElementById("btn-container")
    
    data.forEach(element => {
        let div = document.createElement("div")
        div.innerHTML = `
         <button onclick="loadPet('${element.category}')" class="btn flex flex-row-reverse px-10 py-8 font-bold text-[24px]">${element.category}  <img class="w-[32px]" src="${element.category_icon}" alt=""></button>
        `
    document.getElementById("btn-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");
    }
});

        

        cateContainer.appendChild(div)
 
    });
}
const loadPet =async (name)=>{
    let lowerName = name.toLowerCase();
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${lowerName}`)
    let data = await response.json()
    displayPet(data.data);
}

const displayPet = (data)=>{
    let cardContainer = document.getElementById("card")
    cardContainer.innerHTML=" "


    if(data.length === 0){
        return cardContainer.innerHTML = `
        <div class="col-span-3 flex flex-col justify-center items-center text-center bg-base-300 p-10 rounded-lg">
        <img src="./images/error.webp" alt="logo">
         <h1 class="text-[131313] font-black text-[30px]">No Information Available</h1>
         <p class="text-[16px]">"No information available yet, but we're adding it soon. Stay updated!"</p>
        </div>
        `
    }



    data.forEach(element => {
        let div = document.createElement("div")
        div.innerHTML = `
       
                    <div class="card bg-base-100 shadow-lg">
                      <figure class="px-8 pt-8">
                        <img
                          src="${element.image}"
                          alt="img"
                          class="rounded-xl" />
                      </figure>
                      <div class="card-body text-left border-b-2 border-[#13131310]">
                        <h2 class="card-title">${element.pet_name ? `${element.pet_name}`:`Not Found`}</h2>
                        <p>Breed: ${element.breed ? `${element.breed}`:`Not Found`}</p>
                        <p>Birth: ${element.date_of_birth ? `${element.date_of_birth}`:`Not Found`}</p>
                        <p>Gender: ${element.gender ? `${element.gender}`:`Not Found`}</p>
                        <p>Price : ${element.price ? `${element.price}`:`Not Found`}</p>
                      </div>
                      <div class="space-x-5 p-5">
                        <button onclick="addImg('${element.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button id="adopted" onclick="adopted(this)" class="btn text-[#0E7A81]">Adopt</button>
                        <button onclick="loadModal('${element.petId}')" class="btn text-[#0E7A81]">Details</button>
                      </div>
                    </div>
                  </div>

        
        ` 
        cardContainer.appendChild(div)
 
    });
}
const loadModal =async (id) =>{
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    let data = await response.json()
    displayPetDetails(data.petData);
}
const displayPetDetails =(data)=>{
    console.log(data);
    let modal = document.getElementById("modal").showModal()
    let details = document.getElementById("details")
    details.innerHTML=" "
    let div = document.createElement("div")
    div.innerHTML = `
    
     <div class="">
                      <figure class="">
                        <img
                        class="w-full rounded-lg"
                          src="${data.image}"
                          alt="img"
                         />
                      </figure>
                      <div class="flex flex-col justify-center items-start gap-2">
                        <h1 class="text-[24px] font-bold">${data.pet_name}</h1>
                        <div class="flex gap-3 border-b-2 pb-2">
                          <div class="flex justify-center items-start flex-col">
                          <p><i class="fa-solid fa-paw"></i> Breed: ${data.breed ? `${data.breed}`:`Not Found`}</p>
                          <p><i class="fa-solid fa-venus"></i> Gender: ${data.gender ? `${data.gender}`:`Not Found`}</p>
                          <p><i class="fa-solid fa-vial-virus"></i> Vaccinated Status: ${data.vaccinated_status ? `${data.vaccinated_status}`:`Not Found`}</p>
                          </div>
                          <div class="flex justify-center items-start flex-col">
                           <p><i class="fa-solid fa-cake-candles"></i> Birth: ${data.date_of_birth ? `${data.date_of_birth}`:`Not Found`}</p>
                          <p><i class="fa-solid fa-dollar-sign"></i> Price: ${data.price ? `${data.price}`:`Not Found`}</p>
                          </div>
                        </div>
                        <div class="text-start flex flex-col">
                        <p class="font-bold">Details Information</p>
                          <p>${data.pet_details ? `${data.pet_details}`:`Not Found`}</p>
                        </div>
                      </div>
                    </div>
                      <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <div class="mt-2">
                          <button class="btn btn-outline btn-accent btn-block">Cancel</button>
                        </div>
                      </form>
                    </div>`
                    details.appendChild(div)
}
document.getElementById("img").style.display = "none"
const addImg = (img)=>{
    if (window.innerWidth <= 768) { 
        Swal.fire("Button Not Working!");
    }
    let imgContainer = document.getElementById("img")
    let div = document.createElement("div")
        div.innerHTML = `
        <img class="max-w-full rounded-lg" src="${img}" alt="img">
        `
        document.getElementById("img").style.display = "grid"
        imgContainer.appendChild(div)
}
const sortPrice = ()=>{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
}
const adopted = (button) => {
    Swal.fire({
      title: "Do you want to adopt?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        button.innerText = "Adopted";
        button.classList.add("bg-[#0E7A81]", "text-white");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
document.getElementById("home").addEventListener("click", ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

loadCategory()
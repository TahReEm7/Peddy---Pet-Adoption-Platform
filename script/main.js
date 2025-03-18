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
        div.addEventListener("click", (event) => {
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
                        <h2 class="card-title">${element.pet_name}</h2>
                        <p>Breed: ${element.breed}</p>
                        <p>Birth: ${element.date_of_birth}</p>
                        <p>Gender: ${element.gender}</p>
                        <p>Price : ${element.price}</p>
                      </div>
                      <div class="space-x-5 p-5">
                        <button onclick="addImg('${element.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button class="btn text-[#0E7A81]">Adopt</button>
                        <button class="btn text-[#0E7A81]">Details</button>
                      </div>
                    </div>
                  </div>

        
        ` 
        cardContainer.appendChild(div)
 
    });
}
document.getElementById("img").style.display = "none"
const addImg = (img)=>{
    let imgContainer = document.getElementById("img")
    let div = document.createElement("div")
        div.innerHTML = `
        <img class="max-w-full rounded-lg" src="${img}" alt="img">
        `
        document.getElementById("img").style.display = "grid"
        imgContainer.appendChild(div)
}

document.getElementById("home").addEventListener("click", ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

loadCategory()
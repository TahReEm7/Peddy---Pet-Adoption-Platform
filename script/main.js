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
         <button class="btn flex flex-row-reverse px-10 py-8 font-bold text-[24px]">${element.category}  <img class="w-[32px]" src="${element.category_icon}" alt=""></button>
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

loadCategory()
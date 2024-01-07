const LoadApi=(code,dataLimit)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${code}`;
     fetch(url)
    .then(response => response.json())
    .then(meals=>showData(meals.meals,dataLimit))
}

const showData = (meals,dataLimit) => {
const mealContainer=document.getElementById('mealContainer');
mealContainer.innerText=``;

const show=document.getElementById('show-all');
if(dataLimit&&meals.length>9){
//display 9 food only
meals= meals.slice(0,9);

show.classList.remove('d-none')
}
else {
    show.classList.add('d-none')

}
//display no food found message 
// const NoFoundDiv=document.getElementById('noFoodfound')
// console.log(NoFoundDiv);
// if(meals.length===0){
//     NoFoundDiv.classList.remove('d-none')
// }
// else{
//     NoFoundDiv.classList.add('d-none')
// }


//display all food
meals.forEach(meal=>{
    const mealDiv=document.createElement('div');
    mealDiv.classList.add('col'); 

    mealDiv.innerHTML=`
    <div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <button onclick="ModelView2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#foodModel">
    Details
    </button>
    </div>

    `
mealContainer.appendChild(mealDiv);
})
 
isLoading(false);

}
const ModelView=(idMeal)=>{
    
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(response=>response.json())
    .then(food=>showfoodDetails(food.meals[0]))

}

// async await
const ModelView2=async(idMeal)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
     const res=await fetch(url);
     const food=await res.json();
     showfoodDetails(food.meals[0]);

}

//loading spinner
const isLoading=value=>{
    const Load=document.getElementById('loading');
    if(value){
        Load.classList.remove('d-none')
    }
    else{
        Load.classList.add('d-none')
    }
}



const showfoodDetails=(food)=>{
//  console.log(food);
document.getElementById('foodModelLabel').innerText=food.strMeal;
document.getElementById('foodMealBody').innerHTML=`
<img class="img-fluid"src="${food.strMealThumb}" >
<div class="d-flex align-items-center justify-content-center ">
<p class="chip mx-2">${food.strArea}</p> <p class="chip">${food.strCategory}</p>
</div>
<p>${food.strInstructions}</p>
`

}
const searching=()=>{
    processSearch(9);
}
const processSearch=(dataLimit)=>{
    isLoading(true);
    const searchText=document.getElementById('inputText').value;
    LoadApi(searchText,dataLimit); 
}
document.getElementById('show-all-btn').addEventListener('click',function(){
    processSearch();

})

document.getElementById('inputText').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
});


LoadApi('fish',9);
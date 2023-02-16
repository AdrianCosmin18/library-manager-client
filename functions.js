async function  createHome(){

    let container=document.querySelector(".container");
    container.innerHTML=`
    
    <h1>Cars</h1>
    <p><a class="button button-to-page-new-car"> Create New Car</a></p>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Weight</th>
                <th>Availability</th>
            </tr>
        </thead>
        <tbody class="cars-container">
           
        </tbody>
    </table>
    
    `

    let data = await getAllCars();

    let carsContainer=document.querySelector(".cars-container");
    carsContainer.innerHTML= createAllTableRows(data);


    let buttonPageNewCar = document.querySelector(".button-to-page-new-car");
    buttonPageNewCar.addEventListener("click", () => {

        createNewCar();
    })

    carsContainer.addEventListener("click", async(e) => {
        let obj = e.target;
        if(obj.classList.contains("card-id")){
            let id = + obj.textContent;
            console.log(id);
            let currentCar = await getCarById(id);
            console.log(currentCar);
            createUpdateCar(currentCar);
        }
    })
}

//create row :parametru masina
function createTableRow(car){
    let text = `

        <tr>
            <td class="card-id">${car.id}</td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.weight}</td>
            <td>${car.isAvailable}</td>
        </tr>

    `;

    return text;
}


//create rows :array de masini
function createAllTableRows(cars){
    let text = "";
    for(let i = 0; i < cars.length; i++){
        text += createTableRow(cars[i]);
    }
    return text;
}

function createAlert(message){
    
    let div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert");
    div.classList.add("alert-danger");
    div.classList.add("alert-dismissible");
    div.role = "alert";

    div.innerHTML = `
     
            <div>${message}</div>
            <button type="button" class="btn-close close-alert" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    return div;

}

function createPositiveAlert(message){
    let div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert");
    div.classList.add("alert-success");
    div.classList.add("alert-dismissible");
    div.role = "alert";

    div.innerHTML = `
     
            <div>${message}</div>
            <button type="button" class="btn-close close-alert" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    return div;
}


function createSpinner(){

    let div = document.createElement("div");
    div.classList.add("spinner-border");
    div.classList.add("text-primary");
    div.role = "status";

    div.innerHTML = `
        <span class="visually-hidden">Loading...</span>
    `;

    return div;

}

function delay(){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
    });
}


// fct care creeaza un vect de erori, daca nu E erori
function createArrayAlert(brand, model, weight){
    let arr = [];

    let isBrandValid = isValidBrandOrModel(brand);
    if(!isBrandValid){
        arr.push(createAlert("The brand length has to have minim 2 characters"));
    }
    let isModelValid = isValidBrandOrModel(model);
    if(!isModelValid){
        arr.push(createAlert("Model's length must have minim 2 characters !"));
    }
    let isWeightValid = isValidWeight(weight);
    if(!isWeightValid){
        arr.push(createAlert("Weight's car must contain a valid number of minimum 100 kg"));
    }

    return arr;
}

function createNewCar(){

    let container=document.querySelector(".container");
    container.innerHTML = `

    <h1>New Car</h1>
    <form>
        <p>
            <label for="brand">Brand</label>
            <input name="brand" type="text" id="brand">
        </p>
        <p>
            <label for="model">Model</label>
            <input name="model" type="text" id="model">
        </p>
        <p>
            <label for="weight">Weight</label>
            <input name="weight" type="text" id="weight">
        </p>
        <p>
            <label for="availability">Availability</label>
            <input name="availability" type="checkbox" id="availability">
        </p>
        <p>
            <a class="button button-to-add">Add car</a>
        </p>
        <p>
            <a class="button button-to-home">Cancel</a>
        </p>
    </form>
    `
    ;

    let buttonGoHome = document.querySelector(".button-to-home");
    buttonGoHome.addEventListener("click", () => {

        createHome(); 
    });


    let buttonAddCar = document.querySelector(".button-to-add");
    buttonAddCar.addEventListener("click", async() => {

        
        let brand = document.getElementById("brand");
        let brandValue = brand.value;

        let model = document.getElementById("model");
        let modelValue = model.value;

        let weight = document.getElementById("weight");
        let weightValue = + weight.value;

        let isAvailable = document.getElementById("availability");
        let isAvailableValue = false;
        if(isAvailable.value.checked){
            isAvailableValue = true;
        }

        let alertList = createArrayAlert(brandValue, modelValue, weightValue);
        if(alertList.length > 0){
            alertList.forEach(elem => {
                container.appendChild(elem);
            });
        }else{
            let car = {
                brand: brandValue,
                model: modelValue,
                weight: weightValue,
                isAvailable: isAvailableValue
            };

            container.innerHTML = "",
            container.appendChild(createSpinner());
            await delay();
            
            let response = await addCar(car);
            console.log(response);
            if(response === "success"){
                createHome();
                container.appendChild(createPositiveAlert("Car created with success !"));
            }
        }
    });


}

function createUpdateCar(car){

    let container=document.querySelector(".container");
    container.innerHTML = `

    <h1>Update Car</h1>
    <form>
        <p>
            <label for="brand">Brand</label>
            <input name="brand" type="text" placeholder="${car.brand}" id="brand">
        </p>
        <p>
            <label for="model">Model</label>
            <input name="model" type="text" placeholder="${car.model}" id="model">
        </p>
        <p>
            <label for="weight">Weight</label>
            <input name="weight" type="text" placeholder="${car.weight}" id="weight">
        </p>
        <p>
            <label for="availability">Availability</label>
            <input name="availability" type="checkbox" id="availability">
        </p>
        <p>
            <a class="button button-to-save">Save car</a>
        </p>
        <p>
            <a class="button button-to-home">Cancel</a>
        </p>
        <p>
            <a class="button button-to-delete">Delete</a>
        </p>
    </form>
    `
    ;

    let buttonGoHome = document.querySelector(".button-to-home");
    buttonGoHome.addEventListener("click", () => {

        createHome(); 
    });

    let buttonSave = document.querySelector(".button-to-save");
    buttonSave.addEventListener("click", async() => {

        let brand = document.getElementById("brand");
        let brandValue = brand.value;

        let model = document.getElementById("model");
        let modelValue = model.value;

        let weight = document.getElementById("weight");
        let weightValue = + weight.value;

        let isAvailable = document.getElementById("availability");
        let isAvailableValue = false;
        if(isAvailable.value.checked){
            isAvailableValue = true;
        }

        let alertList = createArrayAlert(brandValue, modelValue, weightValue);
        if(alertList.length > 0){
            alertList.forEach(elem => {
                container.appendChild(elem);
            });
        }else{

            let carDTO = {
                brand: brandValue,
                model: modelValue,
                weight: weightValue,
                isAvailable: isAvailableValue
            };

            container.innerHTML = "",
            container.appendChild(createSpinner());
            await delay();

            let response = await updateCarById(car.id, carDTO);
            console.log(response);
            if(response === "success"){
                createHome();
                container.appendChild(createPositiveAlert("Car updated with success !"));
            }
        }
    })

    let buttonDelete = document.querySelector(".button-to-delete");
    buttonDelete.addEventListener("click", async() => {

        let response = await deleteCarById(car.id);
        if(response.length === 0){
            createHome();
        }else{
            alert(response);
        }
    })
}

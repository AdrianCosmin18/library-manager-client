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

        let car = {
            brand: brandValue,
            model: modelValue,
            weight: weightValue,
            isAvailable: isAvailableValue
        };
        
        let response = await addCar(car);
        console.log(response);
        if(response.length === 0){
            alert(brandValue + " " + modelValue + " insert with succes");
            createHome();
        }
        else{
            alert(response);
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


        let carDTO = {
            brand: brandValue,
            model: modelValue,
            weight: weightValue,
            isAvailable: isAvailableValue
        };

        let response = await updateCarById(car.id, carDTO);
        console.log(response);
        if(response.length === 0){
            alert("Car updated with success");
            createHome();
        }
        else{
            alert(response);
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

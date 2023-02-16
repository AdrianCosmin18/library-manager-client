const brand = document.getElementById("brand");
const model = document.getElementById("model");
const weight = document.getElementById("weight");

//must not be empty an have minimum 2 characters
function isValidBrandOrModel(field){
    return /\w{2,}$/.test(field);
}

//wieght must be a value of minimum 100
function isValidWeight(weight){
    return /[1-9]\d{2,}$/.test(weight);
}



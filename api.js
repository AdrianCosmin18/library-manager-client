

function api(path, method = "GET", body = null){

    const url = "http://localhost:9090/" + path;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode:"cors",
    };

    if(body !== null){
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

async function getAllCars(){
    try{

        let data = await api("crudJS/car");

        if(data.status === 200){
            data = await data.json();
            return data;
        }else{
            await data.json();
            throw Error(data.message);
        }
    }catch(e){
        throw new Error(e.message);
    }
}

async function getCarById(id){

    let response = await api("crudJS/car/" + `${id}`);
    if(response.status === 200){
        response = await response.json();
        return response;
    }else if(response.status === 400){
        return response.json().then(data => {
            return data.message;
        });
    }
    else{
        throw new Error();
    }

}

async function addCar(car){
    let response = await api("crudJS/car", "POST", car);
    if(response.status === 200){
        return "success";
    }
    else if (response.status === 400) {

        let data = await response.json();
        return data.errors[0].defaultMessage;

    }else {
        throw new Error();
    }
}

async function updateCarById(id, carDto){
    let response = await api("crudJS/car/" + `${id}`, "PUT", carDto);
    if(response.status === 200){
        return "success";
    }
    else if(response.status === 400){
        return response.json().then(data => {
            return data.message;
        });
    }else {
        throw new Error();
    }
}   

async function deleteCarById(id){
    let response = await api("crudJS/car/" + `${id}`, "DELETE");
    if(response.status === 200){
        return [];
    }
    else if(response.status === 400){
        return response.json().then(data => {
            return data.message;
        });
    }else {
        throw new Error();
    }
}
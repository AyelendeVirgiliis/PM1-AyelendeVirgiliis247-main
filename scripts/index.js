class Activity{
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
} //esto es el molde que se utiliza para casa vez que crea una nueva actividad

class Repository { //manioula las actividades  
    constructor(){
this.activities = [];
this.id = 0;
}
getAllActivities(){
    return this.activities;
}

createActivity(title, description, imgUrl){
this.id++;
const newActivity = new Activity(this.id, title, description, imgUrl);
this.activities.push(newActivity);
}

deleteActivity(id){
    this.activities = this.activities.filter((activity) => activity.id !== id);
}
}


const repository = new Repository();

const deleteHanlder = (id) => {
    repository.deleteActivity(id)
    addToDOM();

}

function activityToElement({id, title, description, imgUrl}) {
    const tituloTarjeta = document.createElement("h3");
     const descriptionTarjeta = document.createElement("p");
      const imgUrlTarjeta = document.createElement("img");
      const TarjetasContainer = document.createElement("div");

    tituloTarjeta.textContent = title;
    descriptionTarjeta.textContent = description;
    imgUrlTarjeta.src = imgUrl;
    imgUrlTarjeta.alt = title;

    TarjetasContainer.classList.add("contenedor-tarj");

    TarjetasContainer.append(tituloTarjeta);
    TarjetasContainer.append(descriptionTarjeta);
    TarjetasContainer.append(imgUrlTarjeta);

    const cardButton = document.createElement("button");
    cardButton.textContent = "Eliminar"
    cardButton.addEventListener("click", () => deleteHanlder(id));

    TarjetasContainer.appendChild(cardButton)

return TarjetasContainer;

}

function addToDOM() {
  const actividadesContenedor = document.getElementById("actividadesContenedor");
  actividadesContenedor.innerHTML = "";

  const activities = repository.getAllActivities();

  const activitiesToElements = activities.map(activityToElement);

  activitiesToElements.forEach((element) => actividadesContenedor.appendChild(element));
}

  function submitHandler(event){
event.preventDefault();

  const activityTitle = document.getElementById("activityTitle").value;
  const activityDescription = document.getElementById("activityDescription").value;
  const activityImgUrl = document.getElementById("activityImgUrl").value;

  console.log(activityDescription);
  
  if (!activityTitle || !activityDescription || !activityImgUrl){
    return alert("Hay datos incompletos");
  }
  repository.createActivity(activityTitle, activityDescription, activityImgUrl);

  addToDOM();

  alert("Actividad agregada");

  activityForm.reset();
}


const activityForm = document.getElementById("activityForm");
activityForm.addEventListener("submit", submitHandler);


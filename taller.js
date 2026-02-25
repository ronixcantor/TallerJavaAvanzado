const container = document.getElementById("athletes-container");
function getAthletes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const athletes = [
        { id: 1, user: "jUAn pErez", status: "inactive", points: 45 },
        { id: 2, user: "mArIa gArCiA", status: "active", points: 88 },
        { id: 3, user: "cArLoS rOdrIguEz", status: "inactive", points: 12 },
        { id: 4, user: "lUciA fErNAnDeZ", status: "active", points: 95 },
        { id: 5, user: "pAbLo mArTiN", status: "inactive", points: 30 },
      ];
      resolve(athletes);
    }, 1200);
  });
}

async function loadDashboard() {
  try {
    console.log("Cargando listado");
    const athletes = await getAthletes();
    let fixed = athletes.map((athlete) => {
      athlete.user = athlete.user.toUpperCase();
      athlete.level = athlete.points > 50 ? "Elite" : "Amateur";
      return athlete;
    });

    const container = document.getElementById("athletes-container");    
    container.innerHTML = "";
    fixed.forEach((athlete) => {
      const card = document.createElement("div");
      if (athlete.status === "active") {
        card.classList.add("active");
      }
      card.innerHTML = `
        <h3>${athlete.user}</h3>
        <p>Status: <span class="status">${athlete.status}</span></p>
        <p>Points: ${athlete.points}</p>
        <p>Level: ${athlete.level}</p>
        <button>COMPRAR</button>
        `;
      const button=card.querySelector("button");
      const statusText = card.querySelector(".status")
      button.addEventListener("click", () => {
        athlete.status = "active";
        statusText.textContent = "active";
        card.classList.add("active");

        button.disabled = true;
        button.textContent = "COMPRADO";
      });
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar el listado", error);
  }
}

loadDashboard();
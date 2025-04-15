interface FlightPlan {
  id: number;
  name: string;
  raw: string;
}

// Example flight plans (could come from a server or static JSON)
const flightPlans: FlightPlan[] = [
  {
    id: 1,
    name: "Dallas",
    raw: "AAL700  B738/L  1675  6057 KPDX - KDFW  350  WHAMY4 IMB J15 JNC ALS PNH MDANO VKTRY2",
  },
  {
    id: 2,
    name: "Denver",
    raw: "UAL123  H/B77W/L  1234  7412 KSFO - KDEN  370  TRUKN2 DVC J28 HBU",
  },
];

function getRandomBCN(): string {
  const ranges = [
    [650, 677],
    [2236, 2277],
    [3430, 3477],
    [7412, 7477],
  ];
  const [min, max] = ranges[Math.floor(Math.random() * ranges.length)];
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(value).padStart(4, "0");
}

function populateFPE(raw: string): void {
  const parts = raw.trim().split(/\s{2,}/);
  if (parts.length < 7) {
    alert("Input does not contain enough fields.");
    return;
  }

  const aid = parts[0];
  const typeEq = parts[1].replace(/^[A-Z]\//, "");
  const [typ, eq] = typeEq.split("/");
  const depDest = parts[4].split(" - ");
  const alt = parts[5];
  const rte = parts.slice(6).join(" ");

  const cid = Math.floor(Math.random() * (1950000 - 800000 + 1)) + 800000;
  const names = [
    "Alex",
    "Bailey",
    "Charlie",
    "Dakota",
    "Emery",
    "Finley",
    "Gray",
    "Harper",
    "Indigo",
    "Jordan",
    "Joss",
    "Logan",
    "Morgan",
    "Nova",
    "Oakley",
    "Parker",
    "Quinn",
    "Riley",
    "Skyler",
    "Taylor",
  ];
  const name = names[Math.floor(Math.random() * names.length)];

  const rawSpd = Math.floor(Math.random() * (450 - 80 + 1) + 80);
  const spd = String(Math.round(rawSpd / 5) * 5).padStart(3, "0");
  const bcn = getRandomBCN();

  (document.getElementById("fpe-aid-box") as HTMLElement).textContent = aid;
  (document.getElementById("fpe-typ-box") as HTMLElement).textContent =
    typ || "";
  (document.getElementById("fpe-eq-box") as HTMLElement).textContent = eq || "";
  (document.getElementById("fpe-bcn-box") as HTMLElement).textContent = bcn;
  (document.getElementById("fpe-dep-box") as HTMLElement).textContent =
    depDest[0] || "";
  (document.getElementById("fpe-dest-box") as HTMLElement).textContent =
    depDest[1] || "";
  (document.getElementById("fpe-alt-box") as HTMLElement).textContent = alt;
  (document.getElementById("fpe-rte-box") as HTMLElement).textContent = rte;
  (document.getElementById("fpe-cruiseid-box") as HTMLElement).textContent =
    cid.toString();
  (document.getElementById("fpe-spd-box") as HTMLElement).textContent = spd;
  (
    document.querySelector(".fpe-title") as HTMLElement
  ).textContent = `${aid} - ${name} (${cid})`;
}

function renderFlightPlanList(): void {
  const container = document.getElementById("flight-list");
  if (!container) return;
  container.innerHTML = "";
  for (const plan of flightPlans) {
    const li = document.createElement("li");
    li.textContent = plan.name;
    li.onclick = () => populateFPE(plan.raw);
    container.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFlightPlanList();
});

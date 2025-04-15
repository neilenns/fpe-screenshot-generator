import flightPlansData from "./flightPlans.json" assert { type: "json" };

interface FlightPlan {
  id: number;
  name: string;
  raw: string;
  isValid: boolean;
}

// Replace the hardcoded flightPlans array with the imported data
const flightPlans: FlightPlan[] = flightPlansData;

function getElementSafe(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element with id '${id}' not found`);
  }
  return el;
}

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

function populateInputString(raw: string): void {
  const inputString = getElementSafe("input-string");
  inputString.textContent = raw;
}

function populateFPE(raw: string): void {
  const parts = raw.trim().split(/\s{2,}/);

  if (parts.length < 6) {
    alert("Input does not contain enough fields.");
    return;
  }

  const aid = parts[0];
  const typeEq = parts[1].replace(/^[A-Z]\//, "");
  const [typ, eq] = typeEq.split("/");
  const depDest = parts[3].split(" - ");
  const alt = parts[4];
  const rte = parts.slice(5).join(" ");

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

  getElementSafe("fpe-aid-box").textContent = aid;
  getElementSafe("fpe-typ-box").textContent = typ;
  getElementSafe("fpe-eq-box").textContent = eq;
  getElementSafe("fpe-bcn-box").textContent = bcn;
  getElementSafe("fpe-dep-box").textContent = depDest[0];
  getElementSafe("fpe-dest-box").textContent = depDest[1];
  getElementSafe("fpe-alt-box").textContent = alt;
  getElementSafe("fpe-rte-box").textContent = rte;
  getElementSafe("fpe-cruiseid-box").textContent = cid.toString();
  getElementSafe("fpe-spd-box").textContent = spd;
  getElementSafe(
    ".fpe-title"
  ).textContent = `${aid} - ${name} (${cid.toString()})`;
}

function renderFlightPlanList(): void {
  const container = document.getElementById("flight-plan-list");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  for (const plan of flightPlans) {
    const li = document.createElement("li");
    li.textContent = plan.name;

    if (plan.isValid) {
      const checkmark = document.createElement("span");
      checkmark.textContent = "✔";
      checkmark.classList.add("valid-checkmark");
      li.appendChild(checkmark);
    }

    li.onclick = () => {
      populateInputString(plan.raw);
      populateFPE(plan.raw);
    };

    container.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFlightPlanList();
});

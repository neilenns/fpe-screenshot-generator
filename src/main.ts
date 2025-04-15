import { copyFpeToClipboard } from "./copyFpeToClipboard";
import flightPlansData from "@data/flightPlans.json" assert { type: "json" };
import { FlightPlan } from "@interfaces/flightPlan";

// Replace the hardcoded flightPlans array with the imported data
const flightPlans: FlightPlan[] = flightPlansData;

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

function getElementSafe(id: string): HTMLElement {
  const el = document.getElementById(id);

  if (!el) {
    throw new Error(`Element with id '${id}' not found`);
  }

  return el;
}

function getRandomBCN(): number {
  const ranges = [
    [650, 677],
    [2236, 2277],
    [3430, 3477],
    [7412, 7477],
  ];

  const [min, max] = ranges[Math.floor(Math.random() * ranges.length)];
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

function rawToFlightPlan(raw: string): FlightPlan | undefined {
  const parts = raw.trim().split(/\s{2,}/);

  if (parts.length < 6) {
    alert("Input does not contain enough fields.");
    return;
  }

  const aid = parts[0];
  const typeEq = parts[1].replace(/^[A-Z]\//, "");
  const [typ, eq] = typeEq.split("/");
  const [dep, dest] = parts[3].split(" - ");
  const alt = parseInt(parts[4], 10);
  const rte = parts.slice(5).join(" ");

  return {
    aid,
    typ,
    alt,
    rte,
    eq,
    dep,
    dest,
  } as FlightPlan;
}

function displayFPE(flightPlan: FlightPlan): void {
  // Populate the flight plan with default values if not provided
  flightPlan.pilotName ??= names[Math.floor(Math.random() * names.length)];
  flightPlan.spd ??=
    Math.round(Math.floor(Math.random() * (450 - 80 + 1) + 80) / 5) * 5; // Speed is always in increments of 5 kts.
  flightPlan.bcn ??= getRandomBCN();
  flightPlan.cid ??=
    Math.floor(Math.random() * (1950000 - 800000 + 1)) + 800000;

  getElementSafe("fpe-aid-box").textContent = flightPlan.aid;
  getElementSafe("fpe-typ-box").textContent = flightPlan.typ;
  getElementSafe("fpe-eq-box").textContent = flightPlan.eq;
  getElementSafe("fpe-bcn-box").textContent = String(flightPlan.bcn).padStart(
    4,
    "0"
  );
  getElementSafe("fpe-dep-box").textContent = flightPlan.dep;
  getElementSafe("fpe-dest-box").textContent = flightPlan.dest;
  getElementSafe("fpe-alt-box").textContent = String(flightPlan.alt).padStart(
    3,
    "0"
  );
  getElementSafe("fpe-rte-box").textContent = flightPlan.rte;
  getElementSafe("fpe-cruiseid-box").textContent = String(flightPlan.cid);
  getElementSafe("fpe-spd-box").textContent = String(flightPlan.spd).padStart(
    3,
    "0"
  );
  getElementSafe(".fpe-title").textContent = `${flightPlan.aid} - ${
    flightPlan.pilotName
  } (${flightPlan.cid.toString()})`;
}

function renderFlightPlanList(): void {
  const container = document.getElementById("flight-plan-list");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  for (const plan of flightPlans) {
    const li = document.createElement("li");
    li.textContent = `${plan.dep} - ${plan.dest} (${plan.aid})`;

    if (plan.isValid) {
      const checkmark = document.createElement("span");
      checkmark.textContent = "✔";
      checkmark.classList.add("valid-checkmark");
      li.appendChild(checkmark);
    }

    li.onclick = () => {
      displayFPE(plan);
    };

    container.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFlightPlanList();

  getElementSafe("screenshot-button").addEventListener("click", () => {
    copyFpeToClipboard().catch((err: unknown) => {
      console.error("Error copying to clipboard: ", err);
    });
  });

  getElementSafe("load-button").addEventListener("click", () => {
    const inputString = (
      getElementSafe("input-string") as HTMLInputElement
    ).value.trim();

    if (!inputString) {
      return;
    }

    const flightPlan = rawToFlightPlan(inputString);
    if (flightPlan) {
      displayFPE(flightPlan);
    }
  });
});

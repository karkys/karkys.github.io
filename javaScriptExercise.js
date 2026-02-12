"use strict";

function getCounterValue() {
  const el = document.getElementById("counter");
  const n = parseInt(el.textContent || el.innerText || "0", 10);
  return isNaN(n) ? 0 : n;
}

function setCounterValue(val) {
  const el = document.getElementById("counter");
  el.textContent = String(val);
}

function tickUp() {
  setCounterValue(getCounterValue() + 1);
}

function tickDown() {
  setCounterValue(getCounterValue() - 1);
}

function runForLoop() {
  const limit = getCounterValue();
  const out = [];
  for (let i = 0; i <= limit; i++) out.push(i);
  const el = document.getElementById("forLoopResult");
  el.textContent = out.join(" ");
}

function showOddNumbers() {
  const limit = getCounterValue();
  const out = [];
  for (let i = 1; i <= limit; i += 2) out.push(i);
  const el = document.getElementById("oddNumberResult");
  el.textContent = out.join(" ");
}

function addMultiplesToArray() {
  const limit = getCounterValue();
  const result = [];
  for (let x = Math.floor(limit / 5) * 5; x >= 5; x -= 5) result.push(x);
  console.log(result);
}

function printCarObject() {
  const car = {
    cType: (document.getElementById("carType").value || "").trim(),
    cMPG: (document.getElementById("carMPG").value || "").trim(),
    cColor: (document.getElementById("carColor").value || "").trim(),
  };
  console.log(car);
}

function loadCar(n) {
  let src;
  if (n === 1 && typeof carObject1 !== "undefined") src = carObject1;
  if (n === 2 && typeof carObject2 !== "undefined") src = carObject2;
  if (n === 3 && typeof carObject3 !== "undefined") src = carObject3;
  if (!src) {
    console.warn("Requested car not available:", n);
    return;
  }
  document.getElementById("carType").value = src.cType || "";
  document.getElementById("carMPG").value = src.cMPG || "";
  document.getElementById("carColor").value = src.cColor || "";
}

function changeColor(n) {
  const el = document.getElementById("styleParagraph");
  let color = "";
  if (n === 1) color = "red";
  if (n === 2) color = "green";
  if (n === 3) color = "blue";
  el.style.color = color;
}


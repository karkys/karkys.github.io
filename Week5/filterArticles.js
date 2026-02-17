"use strict";


function toggleDisplay(el, show) {
  if (!el) return;
  if (typeof show === "boolean") {
    el.style.display = show ? "block" : "none";
    return;
  }

  el.style.display = (el.style.display === "none" || window.getComputedStyle(el).display === "none") ? "block" : "none";
}

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");
  toggleDisplay(filterForm);
  if (newForm) newForm.style.display = "none";
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");
  toggleDisplay(newForm);
  if (filterForm) filterForm.style.display = "none";
}

function setTypeVisibility(type, visible) {
  document.querySelectorAll(`#articleList article.${type}`).forEach(el => {
    el.style.display = visible ? "" : "none";
  });
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox")?.checked ?? true;
  const showRecipe = document.getElementById("recipeCheckbox")?.checked ?? true;
  const showUpdate = document.getElementById("updateCheckbox")?.checked ?? true;

  setTypeVisibility("opinion", showOpinion);
  setTypeVisibility("recipe", showRecipe);
  setTypeVisibility("update", showUpdate);
}

function addNewArticle() {
  const title = (document.getElementById("inputHeader")?.value || "").trim();
  const text = (document.getElementById("inputArticle")?.value || "").trim();
  const isOpinion = document.getElementById("opinionRadio")?.checked;
  const isRecipe = document.getElementById("recipeRadio")?.checked;
  const isLife = document.getElementById("lifeRadio")?.checked;

  let type = "";
  let label = "";
  if (isOpinion) { type = "opinion"; label = "Opinion"; }
  else if (isRecipe) { type = "recipe"; label = "Recipe"; }
  else if (isLife) { type = "update"; label = "Update"; }

  if (!title || !text || !type) {
    alert("Please enter a title, text, and select a type.");
    return;
  }

  const list = document.getElementById("articleList");
  if (!list) return;

  const art = document.createElement("article");
  art.className = type;

  const badge = document.createElement("span");
  badge.className = "marker";
  badge.textContent = label;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const p = document.createElement("p");
  p.textContent = text;

  const pMore = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pMore.appendChild(a);

  art.appendChild(badge);
  art.appendChild(h2);
  art.appendChild(p);
  art.appendChild(pMore);
  list.appendChild(art);


  filterArticles();


  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  ["opinionRadio","recipeRadio","lifeRadio"].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
}


document.addEventListener("DOMContentLoaded", () => {
  filterArticles();
});


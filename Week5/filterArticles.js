"use strict";

function toggleDisplay(el, show) {
  if (!el) { return; }
  if (typeof show === "boolean") {
    if (show) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
    return;
  }
  var isHidden = false;
  if (el.style.display === "none") {
    isHidden = true;
  } else {
    var cs = window.getComputedStyle(el);
    if (cs && cs.display === "none") {
      isHidden = true;
    }
  }
  if (isHidden) {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

function showFilter() {
  var filterForm = document.getElementById("filterContent");
  var newForm = document.getElementById("newContent");
  toggleDisplay(filterForm);
  if (newForm) { newForm.style.display = "none"; }
}

function showAddNew() {
  var filterForm = document.getElementById("filterContent");
  var newForm = document.getElementById("newContent");
  toggleDisplay(newForm);
  if (filterForm) { filterForm.style.display = "none"; }
}

function setTypeVisibility(type, visible) {
  var list = document.querySelectorAll('#articleList article.' + type);
  for (var i = 0; i < list.length; i++) {
    var el = list[i];
    if (visible) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
}

function filterArticles() {
  var opBox = document.getElementById("opinionCheckbox");
  var reBox = document.getElementById("recipeCheckbox");
  var upBox = document.getElementById("updateCheckbox");

  var showOpinion = true;
  var showRecipe = true;
  var showUpdate = true;

  if (opBox) { showOpinion = opBox.checked; }
  if (reBox) { showRecipe = reBox.checked; }
  if (upBox) { showUpdate = upBox.checked; }

  setTypeVisibility("opinion", showOpinion);
  setTypeVisibility("recipe", showRecipe);
  setTypeVisibility("update", showUpdate);
}

function addNewArticle() {
  var titleEl = document.getElementById("inputHeader");
  var textEl = document.getElementById("inputArticle");
  var opinionEl = document.getElementById("opinionRadio");
  var recipeEl = document.getElementById("recipeRadio");
  var lifeEl = document.getElementById("lifeRadio");

  var title = "";
  var text = "";
  if (titleEl && typeof titleEl.value === "string") { title = titleEl.value.trim(); }
  if (textEl && typeof textEl.value === "string") { text = textEl.value.trim(); }

  var isOpinion = false;
  var isRecipe = false;
  var isLife = false;
  if (opinionEl) { isOpinion = !!opinionEl.checked; }
  if (recipeEl) { isRecipe = !!recipeEl.checked; }
  if (lifeEl) { isLife = !!lifeEl.checked; }

  var type = "";
  var label = "";
  if (isOpinion) {
    type = "opinion";
    label = "Opinion";
  } else if (isRecipe) {
    type = "recipe";
    label = "Recipe";
  } else if (isLife) {
    type = "update";
    label = "Update";
  }

  if (!title || !text || !type) {
    alert("Please enter a title, text, and select a type.");
    return;
  }

  var list = document.getElementById("articleList");
  if (!list) { return; }

  var art = document.createElement("article");
  art.className = type;

  var badge = document.createElement("span");
  badge.className = "marker";
  badge.textContent = label;

  var h2 = document.createElement("h2");
  h2.textContent = title;

  var p = document.createElement("p");
  p.textContent = text;

  var pMore = document.createElement("p");
  var a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pMore.appendChild(a);

  art.appendChild(badge);
  art.appendChild(h2);
  art.appendChild(p);
  art.appendChild(pMore);
  list.appendChild(art);

  filterArticles();

  var ids = ["opinionRadio", "recipeRadio", "lifeRadio"];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) { el.checked = false; }
  }
  if (titleEl) { titleEl.value = ""; }
  if (textEl) { textEl.value = ""; }
}

document.addEventListener("DOMContentLoaded", function() {
  filterArticles();
});

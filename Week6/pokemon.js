"use strict";

const API_BASE = "https://pokeapi.co/api/v2"; // base api url

const els = { // all the elements i will use later
  form: null,
  input: null,
  status: null,
  card: null,
  img: null,
  name: null,
  id: null,
  types: null,
  audio: null,
  playBtn: null,
  selects: [],
  addBtn: null,
  teamList: null,
  clearTeamBtn: null,
};

const team = []; // this will store the pokemon team

function toTitle(s) { // make words look nicer
  if (!s) return "";
  var parts = String(s).split("-");
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    if (p.length > 0) {
      parts[i] = p.charAt(0).toUpperCase() + p.slice(1);
    }
  }
  return parts.join(" ");
}

async function fetchPokemon(query) { // ask the api for the pokemon data
  const q = String(query).trim().toLowerCase();
  const res = await fetch(`${API_BASE}/pokemon/${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Not found: ${q}`);
  return res.json();
}

function getArtwork(data) { // try to get a nice picture, else a basic one
  if (data && data.sprites && data.sprites.other && data.sprites.other["official-artwork"] && data.sprites.other["official-artwork"].front_default) {
    return data.sprites.other["official-artwork"].front_default;
  }
  if (data && data.sprites && data.sprites.front_default) {
    return data.sprites.front_default;
  }
  return "";
}

function getCryUrl(data) { // use the cry url from the api
  return data?.cries?.latest || "";
}

function fillMoves(data) { // put all moves in the 4 dropdowns
  var movesArray = [];
  if (data && data.moves) {
    for (var i = 0; i < data.moves.length; i++) {
      var mv = data.moves[i];
      if (mv && mv.move && mv.move.name) {
        movesArray.push(mv.move.name);
      }
    }
  }
  movesArray.sort();
  var optsHtml = '<option value="">Select a move…</option>';
  for (var j = 0; j < movesArray.length; j++) {
    var nm = movesArray[j];
    optsHtml += '<option value="' + nm + '">' + toTitle(nm) + '</option>';
  }
  for (var k = 0; k < els.selects.length; k++) {
    var sel = els.selects[k];
    sel.innerHTML = optsHtml;
    sel.value = "";
  }
}

function renderPokemon(data) { // update the page with the pokemon info
  els.card.classList.remove("hidden");
  els.img.src = getArtwork(data);
  els.img.alt = `${toTitle(data.name)} artwork`;
  els.name.textContent = toTitle(data.name);
  els.id.textContent = `#${data.id}`;
  const typeList = (data.types || []).map(t => toTitle(t.type.name)).join(", ");
  els.types.textContent = typeList;

  const cryUrl = getCryUrl(data);
  if (cryUrl) {
    els.audio.src = cryUrl;
    els.playBtn.disabled = false;
  } else {
    els.audio.removeAttribute("src");
    els.playBtn.disabled = true;
  }

  fillMoves(data);
}

function addToTeam() { // save this pokemon and the chosen moves
  var moveVals = [];
  for (var i = 0; i < els.selects.length; i++) {
    var v = els.selects[i].value;
    if (v) moveVals.push(v);
  }
  var seen = {};
  var uniqueMoves = [];
  for (var j = 0; j < moveVals.length && uniqueMoves.length < 4; j++) {
    var mv = moveVals[j];
    if (!seen[mv]) {
      seen[mv] = true;
      uniqueMoves.push(mv);
    }
  }
  var name = els.name.textContent;
  var id = els.id.textContent;
  var types = els.types.textContent;
  var img = els.img.src;
  if (!name || !img) return;
  team.push({ name: name, id: id, types: types, img: img, moves: uniqueMoves });
  renderTeam();
}

function renderTeam() { // draw the team cards at the bottom
  var html = "";
  for (var i = 0; i < team.length; i++) {
    var m = team[i];
    html += '<div class="team-card" data-idx="' + i + '">';
    html += '<header>';
    html += '<img src="' + m.img + '" alt="' + m.name + ' sprite" />';
    html += '<div>';
    html += '<h4>' + m.name + ' <small>' + m.id + '</small></h4>';
    html += '<div class="types">' + m.types + '</div>';
    html += '</div>';
    html += '</header>';
    html += '<ul>';
    for (var j = 0; j < m.moves.length; j++) {
      html += '<li>' + toTitle(m.moves[j]) + '</li>';
    }
    html += '</ul>';
    html += '</div>';
  }
  els.teamList.innerHTML = html;
}

function clearTeam() { // remove everything from the team
  team.splice(0, team.length);
  renderTeam();
}

function setStatus(msg, isError) { // show messages to the user
  els.status.textContent = msg || "";
  els.status.style.color = isError ? "#b91c1c" : "#6b7280";
}

function onSubmit(e) { // when user clicks search
  e.preventDefault();
  const q = els.input.value.trim();
  if (!q) return;
  setStatus("Loading…");
  fetchPokemon(q)
    .then(data => { renderPokemon(data); setStatus(""); })
    .catch(err => { setStatus(err.message || "Failed to load.", true); });
}

function onPlay() { // play the pokemon cry
  if (els.audio && els.audio.src) {
    els.audio.currentTime = 0;
    var _p = els.audio.play();
    if (_p && _p.catch) { _p.catch(function(){}); }
  }
}

document.addEventListener("DOMContentLoaded", function() { // grab all the elements and hook up buttons
  els.form = document.getElementById("searchForm");
  els.input = document.getElementById("pokeInput");
  els.status = document.getElementById("status");
  els.card = document.getElementById("pokemonCard");
  els.img = document.getElementById("pokemonImg");
  els.name = document.getElementById("pokemonName");
  els.id = document.getElementById("pokemonId");
  els.types = document.getElementById("pokemonTypes");
  els.audio = document.getElementById("pokemonAudio");
  els.playBtn = document.getElementById("playCryBtn");
  els.selects = [
    document.getElementById("move1"),
    document.getElementById("move2"),
    document.getElementById("move3"),
    document.getElementById("move4")
  ];
  els.addBtn = document.getElementById("addToTeamBtn");
  els.teamList = document.getElementById("teamList");
  els.clearTeamBtn = document.getElementById("clearTeamBtn");

  els.form.addEventListener("submit", onSubmit);
  els.playBtn.addEventListener("click", onPlay);
  els.addBtn.addEventListener("click", addToTeam);
  els.clearTeamBtn.addEventListener("click", clearTeam);
});

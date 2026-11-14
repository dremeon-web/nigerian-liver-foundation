/* Content your team will edit. In the live site this moves into simple
   files they can change from an editor screen, with no code. */
var CONTENT = {
  updates: [
    { date: "2026-11-14", title: "Sample update: community screening day", text: "A short summary of the event, who it reached and what happens next. Your team replaces this.", sample: true },
    { date: "2026-10-30", title: "Sample update: volunteers wanted", text: "A short call for volunteers with the date, place and how to sign up.", sample: true },
    { date: "2026-10-12", title: "Sample update: new partnership", text: "One or two sentences announcing a partner hospital, sponsor or programme.", sample: true }
  ],
  resources: [
    { type: "PDF", title: "Sample: hepatitis B fact sheet", note: "Uploaded leaflets appear here for download.", sample: true },
    { type: "PDF", title: "Sample: annual report", note: "Reports and newsletters.", sample: true },
    { type: "JPG", title: "Sample: outreach poster", note: "Posters and photos.", sample: true }
  ]
};

var ANSWERS = {
  no: "A simple blood test will tell you. Ask any hospital or laboratory for a hepatitis B test (HBsAg). Results are often ready the same day.",
  neg: "Good. If you have not been vaccinated, ask a health facility about the hepatitis B vaccine. It is given as a short series of injections.",
  pos: "Many people with hepatitis B live long, healthy lives. See a doctor for regular check-ups, and encourage your family and partner to get tested."
};

function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}
function niceDate(iso) {
  var p = String(iso || "").slice(0, 10).split("-");
  if (p.length < 3) return String(iso || "");
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return Number(p[2]) + " " + months[Number(p[1]) - 1] + " " + p[0];
}

function isSample(title) { return /^sample/i.test(String(title || "")); }

function showUpdates(list) {
  var ul = document.getElementById("update-list");
  if (!ul) return;
  ul.textContent = "";
  var limit = Number(ul.getAttribute("data-limit")) || list.length;
  list.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).slice(0, limit).forEach(function (u) {
    var li = el("li");
    var t = el("time", "", niceDate(u.date)); t.setAttribute("datetime", String(u.date || "").slice(0, 10));
    li.appendChild(t);
    li.appendChild(el("h3", isSample(u.title) ? "ph" : "", u.title));
    if (u.text) li.appendChild(el("p", "", u.text));
    ul.appendChild(li);
  });
}

function showResources(list) {
  var rl = document.getElementById("resource-list");
  if (!rl) return;
  rl.textContent = "";
  list.forEach(function (r) {
    var li = el("li");
    var m = /\.([a-z0-9]{2,4})$/i.exec(r.file || "");
    li.appendChild(el("span", "ext", (m ? m[1] : (r.type || "File")).toUpperCase()));
    var d = el("div");
    var h = el("h3", isSample(r.title) ? "ph" : "");
    if (r.file) { var a = el("a", "", r.title); a.href = r.file; h.appendChild(a); } else { h.textContent = r.title; }
    d.appendChild(h);
    if (r.note) d.appendChild(el("p", "", r.note));
    li.appendChild(d);
    rl.appendChild(li);
  });
}

/* Show the built-in samples first, then replace them with the team's files. */
showUpdates(CONTENT.updates);
showResources(CONTENT.resources);
function load(file, show) {
  fetch(file, { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) { if (Array.isArray(data) && data.length) show(data); })
    .catch(function () { /* keep the samples */ });
}
load("updates.json", showUpdates);
load("resources.json", showResources);

var SITE = {
  "about": {
    "vision": "A Nigeria where liver disease is history",
    "who": "The Nigerian Liver Foundation is a nonprofit with passionate staff dedicated to addressing the indiscriminate burden of liver diseases in Nigeria. We constantly welcome individuals who are passionate about liver health and who share in our vision to join our growing team.",
    "mission": "To eliminate the burden of liver diseases in Nigeria and Sub-Saharan Africa through education, advocacy, research, and improved access to healthcare, while promoting a healthier future for all."
  },
  "values": [
    {
      "name": "Compassion",
      "text": "We care deeply about the well-being of individuals and communities affected by liver diseases."
    },
    {
      "name": "Integrity",
      "text": "We operate with transparency, honesty, and accountability in all our endeavors."
    },
    {
      "name": "Collaboration",
      "text": "We believe in the power of partnerships and collaboration to achieve our mission."
    },
    {
      "name": "Innovation",
      "text": "We embrace new ideas and approaches to address the challenges of liver diseases."
    },
    {
      "name": "Equity",
      "text": "We strive to ensure that everyone has access to the care and support they need, regardless of their background or circumstances."
    }
  ],
  "programmes": [
    {
      "name": "Education",
      "text": "We go to where people are. Through community engagements, screenings and school outreaches, we teach people how to protect their liver and why testing early matters."
    },
    {
      "name": "Advocacy",
      "text": "We speak up for people affected by liver disease. We work with health authorities, professional bodies and community leaders to make hepatitis testing, vaccination and treatment easier to reach and to afford."
    },
    {
      "name": "Research",
      "text": "We collect primary data from communities on hepatitis and MASLD, the fatty liver disease linked to metabolic health, so that decisions about liver care in Nigeria rest on local evidence."
    },
    {
      "name": "Access to healthcare",
      "text": "When someone needs specialist care, we refer them promptly to a tertiary hospital and follow up afterwards, so that no one is lost between a test result and treatment."
    }
  ],
  "involved": [
    {
      "name": "Join the team",
      "text": "We welcome people who are passionate about liver health and share our vision. Health workers, students and organisers all have a place."
    },
    {
      "name": "Partner with us",
      "text": "Schools, hospitals, companies and community groups can host an outreach or work with us on a programme."
    }
  ],
  "contact": {
    "email": "thenigerianliverfoundation@gmail.com",
    "phone": "+1 (423) 6728858",
    "whatsapp": "+1 (423) 6728858",
    "address": "421 E 93rd St\nBrooklyn, NY 11212\nUnited States",
    "instagram": "https://www.instagram.com/thenigerianliverfoundation",
    "facebook": "https://www.facebook.com/share/1GESCUrgD4/",
    "x": "https://x.com/tnlfprojects",
    "linkedin": "https://www.linkedin.com/company/the-nigerian-liver-foundation/"
  }
};

function pairs(id, list, tag, cls) {
  var box = document.getElementById(id);
  if (!box || !Array.isArray(list) || !list.length) return;
  box.textContent = "";
  list.forEach(function (it) {
    var n = el(tag, cls || "");
    n.appendChild(el("h3", "", it.name));
    n.appendChild(el("p", "", it.text));
    box.appendChild(n);
  });
}
function link(href, text) { var a = el("a", "", text); a.href = href; return a; }
function showSite(s) {
  document.querySelectorAll("[data-k]").forEach(function (n) {
    var v = n.getAttribute("data-k").split(".").reduce(function (o, k) { return o && o[k]; }, s);
    if (typeof v === "string" && v.trim()) n.textContent = v;
  });
  pairs("value-list", s.values, "li");
  pairs("programme-list", s.programmes, "div", "row");
  pairs("involved-list", s.involved, "div");
  var c = s.contact || {}, dl = document.getElementById("contact-list");
  if (!dl) return;
  dl.textContent = "";
  function row(label, node) { dl.appendChild(el("dt", "", label)); var dd = el("dd"); dd.appendChild(node); dl.appendChild(dd); return dd; }
  if (c.email) row("Email", link("mailto:" + c.email, c.email));
  if (c.phone) row("Phone", link("tel:" + c.phone.replace(/[^+\d]/g, ""), c.phone));
  if (c.whatsapp) row("WhatsApp", document.createTextNode(c.whatsapp));
  if (c.address) row("Address", document.createTextNode(c.address));
  var soc = [["Instagram", c.instagram], ["Facebook", c.facebook], ["X", c.x], ["LinkedIn", c.linkedin]].filter(function (p) { return p[1]; });
  if (soc.length) {
    var wrap = el("span", "social");
    soc.forEach(function (p) { wrap.appendChild(link(p[1], p[0])); });
    row("Follow us", wrap);
  }
}
showSite(SITE);
fetch("site.json", { cache: "no-store" })
  .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(function (d) { if (d && typeof d === "object") showSite(d); })
  .catch(function () { /* keep the built-in text */ });

var buttons = document.querySelectorAll(".check button");
buttons.forEach(function (b) {
  b.addEventListener("click", function () {
    buttons.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
    b.setAttribute("aria-pressed", "true");
    document.getElementById("check-answer").textContent = ANSWERS[b.getAttribute("data-a")];
  });
});
document.getElementById("year").textContent = new Date().getFullYear();

/* team page */
function showTeam(list) {
  var box = document.getElementById("team-groups");
  if (!box || !Array.isArray(list) || !list.length) return;
  box.textContent = "";
  var order = ["Leadership", "Board and advisers", "Staff", "Volunteers"], groups = {};
  list.forEach(function (m) { var g = m.group || "Staff"; (groups[g] = groups[g] || []).push(m); if (order.indexOf(g) < 0) order.push(g); });
  order.forEach(function (g) {
    if (!groups[g]) return;
    var sec = el("section", "team-group"); sec.appendChild(el("h2", "", g));
    var grid = el("div", "team-grid");
    groups[g].forEach(function (m) {
      var card = el("div", "member"), ph;
      if (m.photo) { ph = el("img", "photo"); ph.src = m.photo; ph.alt = "Portrait of " + m.name; ph.loading = "lazy"; }
      else { ph = el("div", "photo", String(m.name || "?").replace(/^sample:\s*/i, "").charAt(0).toUpperCase()); ph.setAttribute("aria-hidden", "true"); }
      card.appendChild(ph);
      card.appendChild(el("h3", isSample(m.name) ? "ph" : "", m.name));
      if (m.role) card.appendChild(el("p", "role", m.role));
      if (m.bio) card.appendChild(el("p", "bio", m.bio));
      grid.appendChild(card);
    });
    sec.appendChild(grid); box.appendChild(sec);
  });
}
load("team.json", showTeam);

/* menus: one open at a time; close on outside click or Escape */
var menus = document.querySelectorAll("details.menu");
menus.forEach(function (m) {
  m.addEventListener("toggle", function () { if (m.open) menus.forEach(function (o) { if (o !== m) o.open = false; }); });
});
document.addEventListener("click", function (e) { menus.forEach(function (m) { if (!m.contains(e.target)) m.open = false; }); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") menus.forEach(function (m) { m.open = false; }); });

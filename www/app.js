// Prototype Training — séance test de 3 minutes.
// Principe : on CÉDULE toutes les annonces auprès du système (notifications
// locales avec son vocal pré-rendu) au moment du départ. Le minuteur à
// l'écran n'est qu'un affichage ; la vérité, ce sont les notifications.
(function () {
  var PHASES = [
    { at: 0,   label: "Échauffement — marche", sound: "annonce-depart.wav" },
    { at: 30,  label: "Course — cycle 1 de 3", sound: "annonce-course-1.wav" },
    { at: 50,  label: "Marche — cycle 1 de 3", sound: "annonce-marche-1.wav" },
    { at: 70,  label: "Course — cycle 2 de 3", sound: "annonce-course-2.wav" },
    { at: 90,  label: "Marche — cycle 2 de 3", sound: "annonce-marche-2.wav" },
    { at: 110, label: "Course — cycle 3 de 3", sound: "annonce-course-3.wav" },
    { at: 130, label: "Marche — cycle 3 de 3", sound: "annonce-marche-3.wav" },
    { at: 150, label: "Retour au calme",       sound: "annonce-calme.wav" },
    { at: 180, label: "Entraînement terminé",  sound: "annonce-fin.wav" }
  ];
  var TOTAL = 180;
  var FIRST_ID = 4100;
  var startedAt = null, tick = null;

  var $ = function (id) { return document.getElementById(id); };
  function fmt(s) { s = Math.max(0, Math.ceil(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
  function phaseAt(elapsed) {
    var cur = PHASES[0];
    for (var i = 0; i < PHASES.length; i++) if (elapsed >= PHASES[i].at) cur = PHASES[i];
    return cur;
  }
  $("scheduleList").innerHTML = PHASES.map(function (p) {
    return "<li>" + fmt(p.at) + " — " + p.label + "</li>";
  }).join("");

  function plugins() { return window.Capacitor && window.Capacitor.Plugins; }
  function isNative() { return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()); }
  $("envLine").textContent = isNative()
    ? "Environnement : app native Capacitor — le vrai test."
    : "Environnement : navigateur — aperçu seulement. Les annonces système exigent l'app installée via SideStore.";

  async function scheduleAll(start) {
    var LN = plugins() && plugins().LocalNotifications;
    if (!LN) throw new Error("Plugin LocalNotifications introuvable (pas en natif ?)");
    var perm = await LN.requestPermissions();
    if (perm.display !== "granted") throw new Error("Permission de notifications refusée : " + JSON.stringify(perm));
    // L'annonce de départ (at=0) est cédulée à +1 s : une notification "dans le
    // passé" serait rejetée, et +1 s laisse le temps de verrouiller l'écran.
    var notifications = PHASES.map(function (p, i) {
      return {
        id: FIRST_ID + i,
        title: "Training",
        body: p.label,
        sound: p.sound,
        schedule: { at: new Date(start + Math.max(p.at, 1) * 1000), allowWhileIdle: true }
      };
    });
    await LN.schedule({ notifications: notifications });
    return notifications.length;
  }

  async function cancelAll() {
    var LN = plugins() && plugins().LocalNotifications;
    if (!LN) return;
    var pending = PHASES.map(function (_, i) { return { id: FIRST_ID + i }; });
    try { await LN.cancel({ notifications: pending }); } catch (e) {}
  }

  function startTick() {
    clearInterval(tick);
    tick = setInterval(function () {
      if (!startedAt) return;
      var elapsed = (Date.now() - startedAt) / 1000;
      if (elapsed >= TOTAL) {
        $("phaseLabel").textContent = "Terminé";
        $("timer").textContent = "00:00";
        clearInterval(tick);
        return;
      }
      $("phaseLabel").textContent = phaseAt(elapsed).label;
      $("timer").textContent = fmt(TOTAL - elapsed);
    }, 250);
  }

  $("startBtn").addEventListener("click", async function () {
    try {
      startedAt = Date.now();
      var n = 0;
      if (isNative()) {
        n = await scheduleAll(startedAt);
        $("status").innerHTML = "<span class='ok'>" + n + " annonces cédulées auprès d'iOS.</span> Verrouille l'écran, mets le téléphone dans ta poche, et écoute.";
      } else {
        $("status").innerHTML = "<span class='warn'>Aperçu navigateur : aucune annonce système. Installe l'app pour le vrai test.</span>";
      }
      $("startBtn").style.display = "none";
      $("stopBtn").style.display = "";
      startTick();
    } catch (e) {
      startedAt = null;
      $("status").textContent = "Échec au départ : " + (e && e.message ? e.message : e);
    }
  });

  $("stopBtn").addEventListener("click", async function () {
    await cancelAll();
    startedAt = null;
    clearInterval(tick);
    $("phaseLabel").textContent = "Prêt";
    $("timer").textContent = "03:00";
    $("status").textContent = "Annonces annulées. Tu peux relancer le test.";
    $("startBtn").style.display = "";
    $("stopBtn").style.display = "none";
  });
})();

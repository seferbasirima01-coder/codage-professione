// ==============================================================================
// FICHIER : script.js
// RÔLE    : Gérer toute l'interactivité "Côté Client" (Frontend) du site web.
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. GESTION DES FENÊTRES MODALES (Les Pop-ups de cours)
// ------------------------------------------------------------------------------

/**
 * Fonction pour OUVRIR une fenêtre modale
 * @param {string} id - L'identifiant (ID html) de la fenêtre à ouvrir
 */
function openModal(id) {
    // On cible la fenêtre par son ID et on change son affichage en 'flex' (visible)
    document.getElementById(id).style.display = 'flex';
    // On bloque le défilement de la page principale quand la modale est ouverte
    document.body.style.overflow = 'hidden';
}

/**
 * Fonction pour FERMER une fenêtre modale
 * @param {string} id - L'identifiant de la fenêtre à fermer
 */
function closeModal(id) {
    // On cache la fenêtre
    document.getElementById(id).style.display = 'none';
    // On réactive le défilement normal de la page
    document.body.style.overflow = 'auto';
}

// Événement : Si l'utilisateur clique *à côté* de la boîte de texte (sur le fond noir)
window.onclick = function (event) {
    // Vérifie si l'élément cliqué possède la classe 'modal' (le fond flouté)
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// ------------------------------------------------------------------------------
// 2. EFFETS D'APPARITION AU DÉFILEMENT (Scroll Animation)
// ------------------------------------------------------------------------------

// Configuration de notre "observateur"
const observerOptions = {
    root: null,         // On observe par rapport à toute la fenêtre du navigateur
    rootMargin: '0px',  // Pas de marge cachée
    threshold: 0.15     // L'action se déclenche quand 15% de l'élément est visible à l'écran
};

// Création de l'Intersection Observer (un outil JS très performant pour le défilement)
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si la section entre dans le champ de vision (isIntersecting)...
        if (entry.isIntersecting) {
            // ...on lui ajoute la classe "visible" (qui lance la transition CSS)
            entry.target.classList.add('visible');
            // On arrête de l'observer pour ne pas répéter l'animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// On cible toutes les sections HTML qui possèdent la classe ".fade-in"
document.querySelectorAll('.fade-in').forEach(section => {
    // On demande à notre observateur de les surveiller !
    observer.observe(section);
});

// ------------------------------------------------------------------------------
// 3. NAVIGATION FLUIDE (Smooth Scrolling du Menu)
// ------------------------------------------------------------------------------

// On cible tous les liens <a> dont l'attribut href commence par "#" (les ancres inter-pages)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Empêche le saut instantané (comportement par défaut)
        e.preventDefault();
        // Fait glisser la vue lentement jusqu'à l'élément ciblé
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ------------------------------------------------------------------------------
// 4. GESTION DU THÈME JOUR / NUIT (Light / Dark Mode)
// ------------------------------------------------------------------------------

// On cible le bouton dans la barre de navigation
const themeBtn = document.getElementById('theme-toggle');

if (themeBtn) {
    // Si le bouton existe, on écoute le clic dessus
    themeBtn.addEventListener('click', () => {
        // On active (on on désactive) la classe "light-mode" sur le <body>
        // Cette classe est définie dans "style.css" et remplace les couleurs sombres par les claires
        document.body.classList.toggle('light-mode');
    });
}

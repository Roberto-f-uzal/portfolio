const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

const ITEMS_PER_PAGE = window.innerWidth <= 768 ? 1 : 2;

const state = {
    particulares: 0,
    colegios: 0,
    comercios: 0,
    negocios: 0
};

// =========================
// TABS
// =========================
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');

        // al cambiar de tab renderizamos su página actual
        renderTab(tab.dataset.tab);
    });
});

// =========================
// PAGINACIÓN
// =========================
function initPagination(tabId) {
    const tab = document.getElementById(tabId);

    const cards = tab.querySelectorAll(".card");
    const prevBtn = tab.querySelector(".prev");
    const nextBtn = tab.querySelector(".next");
    const pageInfo = tab.querySelector(".page-info");

    const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

    function render() {
        const page = state[tabId];

        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        cards.forEach((card, i) => {
            card.style.display = (i >= start && i < end) ? "block" : "none";
        });

        pageInfo.textContent = `${page + 1} de ${totalPages}`;

        prevBtn.disabled = page === 0;
        nextBtn.disabled = page >= totalPages - 1;
    }

    prevBtn.addEventListener("click", () => {
        if (state[tabId] > 0) {
            state[tabId]--;
            render();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (state[tabId] < totalPages - 1) {
            state[tabId]++;
            render();
        }
    });

    // primera carga
    render();

    return render;
}

// guardamos renders para poder reutilizarlos
const renderers = {};

// inicializar todo
["particulares", "colegios", "comercios", "negocios"].forEach(id => {
    renderers[id] = initPagination(id);
});

// render cuando cambias tab
function renderTab(tabId) {
    if (renderers[tabId]) {
        renderers[tabId]();
    }
}

// inicializar tab activo al cargar
renderTab("particulares");
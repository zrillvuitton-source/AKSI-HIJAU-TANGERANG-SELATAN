// --- 1. STATE MANAGEMENT & MOCK DATA ---
let campaigns = [
    {
        id: 1,
        category: 'Mangrove',
        title: 'Adopsi 5.000 Bibit Mangrove Pesisir',
        location: 'Pesisir Muara Indah, Dekat Tangsel',
        description: 'Melindungi daratan dari abrasi pantai, memulihkan ekosistem biota laut, dan membangun benteng hijau alami pemecah ombak.',
        target: 50000000,
        current: 32450000,
        backers: 142,
        daysLeft: 18,
        imageColor: 'from-emerald-600 to-teal-800',
        metric: 'Bibit Mangrove',
        metricTarget: 5000,
        metricCurrent: 3245,
        co2Absorption: 22,
        coordinator: 'Fajar Kurniawan (Pecinta Alam Tangsel)',
        achievements: ['Selesai survei lahan', 'Pembibitan 2.000 mangrove siap tanam']
    },
    {
        id: 2,
        category: 'Edukasi Sampah',
        title: 'Edukasi Pengelolaan Sampah Kreatif Warga',
        location: 'Kecamatan Pamulang & Ciputat, Tangsel',
        description: 'Penyediaan tempat sampah pilah terintegrasi, pelatihan pembuatan kompos rumahan, dan workshop upcycling plastik untuk ibu-ibu PKK.',
        target: 25000000,
        current: 18700000,
        backers: 89,
        daysLeft: 24,
        imageColor: 'from-amber-600 to-emerald-700',
        metric: 'Kepala Keluarga (KK)',
        metricTarget: 300,
        metricCurrent: 224,
        co2Absorption: 5,
        coordinator: 'Siti Sarah (Komunitas ZeroWaste Tangsel)',
        achievements: ['Penyusunan modul edukasi', 'Distribusi 50 tong sampah pilah perdana']
    }
];

let donations = [
    { id: 1, name: 'Siti Rahmawati', amount: 500000, campaignId: 1, message: 'Semoga mangrove tumbuh subur dan membawa berkah buat nelayan sekitar!', time: '2 jam yang lalu', badge: 'Pelindung Bumi' },
    { id: 2, name: 'Budi Santoso', amount: 150000, campaignId: 2, message: 'Sangat setuju dengan edukasi pilah sampah, semoga lingkungan Tangsel makin bersih.', time: '5 jam yang lalu', badge: 'Penyebar Kebaikan' },
    { id: 3, name: 'Alvin Pratama', amount: 1000000, campaignId: 1, message: 'Maju terus pemuda Tangsel! Aksi nyata untuk masa depan bumi kita.', time: '1 hari yang lalu', badge: 'Pahlawan Hijau' },
    { id: 4, name: 'Rina Wijaya', amount: 50000, campaignId: 2, message: 'Langkah kecil, harapan besar. Semangat tim Aksi Hijau!', time: '2 hari yang lalu', badge: 'Kawan Hijau' }
];

let leaderboard = [
    { id: 1, name: 'Dewi Lestari', points: 300, badge: 'Duta Mangrove' },
    { id: 2, name: 'Rizky Pratama', points: 280, badge: 'Pahlawan Hijau' },
    { id: 3, name: 'Anisa Rahma', points: 250, badge: 'Sahabat Pesisir' },
    { id: 4, name: 'Fahri Ramadhan', points: 200, badge: 'Pejuang Kompos' }
];

const QUIZ_QUESTIONS = [
    {
        question: "Apa fungsi utama hutan mangrove bagi kawasan pesisir?",
        options: [
            "Sebagai bahan baku utama kertas berkualitas tinggi",
            "Mencegah abrasi laut, menyaring polutan, dan menjadi habitat satwa pesisir",
            "Membuat air laut menjadi terasa tawar",
            "Mempercepat proses penguapan air laut menjadi awan hujan"
        ],
        answer: 1,
        explanation: "Hutan mangrove memiliki akar kokoh yang mampu memecah energi gelombang laut, mencegah erosi pantai (abrasi), menyerap emisi karbon tinggi, serta menjadi tempat pemijahan alami ikan dan kepiting."
    },
    {
        question: "Manakah jenis sampah berikut yang memerlukan waktu paling lama untuk terurai secara alami?",
        options: [
            "Kulit buah pisang",
            "Kertas karton pembungkus",
            "Kantong plastik sekali pakai",
            "Popok sekali pakai atau botol plastik mikro"
        ],
        answer: 3,
        explanation: "Popok sekali pakai dan botol plastik mengandung material sintetis super-absorbent polymer dan PET yang membutuhkan waktu sekitar 250 hingga 500 tahun untuk hancur menjadi mikroplastik di alam liar."
    },
    {
        question: "Dalam prinsip pengelolaan sampah 3R, apa tindakan yang paling diutamakan (prioritas tertinggi)?",
        options: [
            "Recycle (Mendaur ulang kembali sampah menjadi produk baru)",
            "Reuse (Menggunakan kembali wadah yang masih layak)",
            "Reduce (Mengurangi timbulan sampah sejak dari sumbernya)",
            "Replace (Mengganti barang sekali pakai dengan yang awet)"
        ],
        answer: 2,
        explanation: "Reduce (mengurangi produksi sampah sejak awal) adalah hierarki tertinggi. Menghindari timbulan sampah jauh lebih efektif daripada mengelola sampah yang sudah terlanjur diproduksi."
    },
    {
        question: "Tangerang Selatan saat ini mengoperasikan TPA utama untuk menampung sampah domestik kota. Apa nama TPA tersebut?",
        options: [
            "TPA Bantargebang",
            "TPA Cipeucang",
            "TPA Rawakucing",
            "TPA Galuga"
        ],
        answer: 1,
        explanation: "TPA Cipeucang berlokasi di Serpong, Tangerang Selatan. Kapasitasnya yang terbatas menuntut kita semua meningkatkan kesadaran pilah sampah mandiri dari rumah."
    }
];

let isMuted = false;
let fundingChartInstance = null;
let selectedDonateCampaignId = 1;
let selectedDonateAmount = 100000;

let quizActive = false;
let quizCurrentQuestion = 0;
let quizSelectedOption = null;
let quizScore = 0;
let quizShowFeedback = false;
let quizPlayerName = "";

function playSound(type) {
    if (isMuted) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (type === 'success') {
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
                gainNode.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
                osc.connect(gainNode);
                gainNode.connect(ctx.destination);
                osc.start(ctx.currentTime + idx * 0.1);
                osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
            });
        } else if (type === 'click') {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'wrong') {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, ctx.currentTime);
            osc.frequency.setValueAtTime(140, ctx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'slide') {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300 + Math.random() * 200, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        }
    } catch (error) {
        console.warn("Audio Context diblokir kebijakan browser sebelum interaksi pengguna.", error);
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const icon = document.getElementById('sound-icon');
    if (isMuted) {
        icon.setAttribute('data-lucide', 'volume-x');
    } else {
        icon.setAttribute('data-lucide', 'volume-2');
        playSound('click');
    }
    lucide.createIcons();
}

function switchTab(tabId) {
    playSound('click');
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('block');
    });
    const activeView = document.getElementById(`view-${tabId}`);
    activeView.classList.remove('hidden');
    activeView.classList.add('block');
    document.querySelectorAll('nav button').forEach(btn => {
        btn.className = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-600 hover:text-emerald-600 hover:bg-slate-50";
    });
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.className = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-emerald-600 text-white shadow-md";
    }
    if (tabId === 'beranda') {
        setTimeout(initializeChart, 50);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

function updateGlobalStats() {
    const totalRaised = campaigns.reduce((acc, c) => acc + c.current, 0);
    const totalBackers = campaigns.reduce((acc, c) => acc + c.backers, 0);
    const globalTarget = campaigns.reduce((acc, c) => acc + c.target, 0);
    const progressPct = (totalRaised / globalTarget) * 100;
    document.getElementById('stat-raised').innerText = `${(totalRaised / 1e6).toFixed(2)} Jt+`;
    document.getElementById('stat-backers').innerText = totalBackers;
    document.getElementById('dashboard-total-raised').innerText = formatRupiah(totalRaised);
    document.getElementById('dashboard-progress-percentage').innerText = `${progressPct.toFixed(1)}% Target`;
    document.getElementById('dashboard-progress-bar').style.width = `${progressPct}%`;
    document.getElementById('dashboard-target').innerText = `Target: ${formatRupiah(globalTarget)}`;
    document.getElementById('dashboard-backers-count').innerText = `${totalBackers} Donatur Aktif`;
    const miniCampaignsContainer = document.getElementById('mini-campaigns-list');
    miniCampaignsContainer.innerHTML = campaigns.map(camp => `
        <div onclick="openDonateModal(${camp.id})" class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer group animate-fadeIn">
            <div class="flex items-center space-x-3">
                <div class="bg-emerald-500 text-white p-2 rounded-xl">
                    <i data-lucide="${camp.category === 'Mangrove' ? 'trees' : 'trash-2'}" class="h-4 w-4"></i>
                </div>
                <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">${camp.title}</h4>
                    <span class="text-[10px] sm:text-xs font-medium text-slate-400 font-mono">${camp.metricCurrent}/${camp.metricTarget} ${camp.metric}</span>
                </div>
            </div>
            <i data-lucide="chevron-right" class="h-5 w-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"></i>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderCampaigns() {
    const grid = document.getElementById('campaigns-grid');
    grid.innerHTML = campaigns.map(camp => {
        const progressPct = (camp.current / camp.target) * 100;
        return `
        <div class="bg-white border border-slate-100/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-emerald-500/10 transition-all flex flex-col h-full animate-fadeIn">
            <div class="h-52 bg-gradient-to-br ${camp.imageColor} relative p-8 flex flex-col justify-between text-white">
                <div class="absolute top-0 right-0 p-8 opacity-25">
                    <i data-lucide="${camp.category === 'Mangrove' ? 'trees' : 'trash-2'}" style="width: 160px; height: 160px;" class="transform translate-x-12 -translate-y-8"></i>
                </div>
                <div class="flex justify-between items-start z-10">
                    <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${camp.category}</span>
                    <span class="flex items-center text-xs bg-slate-950/20 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                        <i data-lucide="map-pin" class="h-3.5 w-3.5 mr-1"></i> ${camp.location}
                    </span>
                </div>
                <h2 class="text-xl sm:text-2xl font-black leading-tight z-10 line-clamp-2">${camp.title}</h2>
            </div>

            <div class="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <p class="text-slate-600 text-sm leading-relaxed">${camp.description}</p>

                <div class="border-t border-slate-100 pt-4 space-y-2">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kondisi & Milestone Terkini:</span>
                    <ul class="space-y-1.5 text-xs text-slate-600">
                        ${camp.achievements.map(ach => `
                            <li class="flex items-center space-x-1.5">
                                <i data-lucide="check-circle-2" class="h-4 w-4 text-emerald-600 flex-shrink-0"></i>
                                <span>${ach}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div class="flex justify-between items-end">
                        <div>
                            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block">Realisasi Lapangan</span>
                            <span class="text-sm sm:text-base font-extrabold text-slate-900 font-mono">${camp.metricCurrent} dari ${camp.metricTarget} ${camp.metric}</span>
                        </div>
                        <span class="text-xs font-black text-emerald-600 font-mono">${progressPct.toFixed(0)}%</span>
                    </div>
                    <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div class="bg-emerald-600 h-full rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/50 text-xs font-semibold text-slate-500 font-mono">
                        <div>
                            <span class="block text-[10px] text-slate-400 uppercase tracking-wider font-sans">Terkumpul</span>
                            <span class="block text-xs sm:text-sm font-bold text-emerald-600">${formatRupiah(camp.current)}</span>
                        </div>
                        <div>
                            <span class="block text-[10px] text-slate-400 uppercase tracking-wider font-sans">Target Dana</span>
                            <span class="block text-xs sm:text-sm font-bold text-slate-800">${formatRupiah(camp.target)}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div class="flex items-center space-x-4 text-xs font-semibold text-slate-500">
                        <span class="flex items-center"><i data-lucide="users" class="h-4 w-4 mr-1 text-slate-400"></i> ${camp.backers} Donatur</span>
                        <span class="flex items-center"><i data-lucide="calendar" class="h-4 w-4 mr-1 text-slate-400"></i> ${camp.daysLeft} Hari</span>
                    </div>
                    <button onclick="openDonateModal(${camp.id})" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center space-x-1 hover:shadow-lg hover:shadow-emerald-100">
                        <i data-lucide="heart" class="h-4 w-4 fill-white"></i>
                        <span>Donasi</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
    lucide.createIcons();
}

function renderDonationsWall() {
    const wall = document.getElementById('donations-wall');
    wall.innerHTML = donations.map(don => `
        <div class="pt-4 first:pt-0 animate-fadeIn">
            <div class="flex justify-between items-start mb-1.5">
                <div>
                    <span class="font-bold text-slate-900 block text-sm sm:text-base">${don.name}</span>
                    <span class="text-[10px] text-slate-400 block font-mono">${don.time}</span>
                </div>
                <span class="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">${don.badge}</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 italic bg-slate-50 p-3 rounded-2xl border border-slate-100/50 mt-1">"${don.message}"</p>
            <span class="text-xs font-extrabold text-emerald-600 mt-2 block font-mono">Mendonasi: ${formatRupiah(don.amount)}</span>
        </div>
    `).join('');
}

function initializeChart() {
    const ctx = document.getElementById('fundingChart').getContext('2d');
    if (fundingChartInstance) {
        fundingChartInstance.destroy();
    }
    const labels = campaigns.map(c => c.category);
    const currentData = campaigns.map(c => c.current);
    const targetData = campaigns.map(c => c.target);
    fundingChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Terkumpul (Rp)',
                    data: currentData,
                    backgroundColor: ['#059669', '#d97706'],
                    borderRadius: 8,
                    borderSkipped: false,
                },
                {
                    label: 'Target (Rp)',
                    data: targetData,
                    backgroundColor: '#e2e8f0',
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { family: 'Inter', size: 11, weight: '600' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${formatRupiah(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return `Rp ${value / 1e6}jt`;
                        },
                        font: { family: 'Inter', size: 10 }
                    },
                    grid: { drawBorder: false, color: '#f1f5f9' }
                },
                x: {
                    ticks: { font: { family: 'Inter', size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function selectMapNode(id) {
    playSound('click');
    document.getElementById('map-card-1').className = "p-4 rounded-2xl border transition-all cursor-pointer border-slate-100 bg-slate-50 hover:border-emerald-300";
    document.getElementById('map-card-2').className = "p-4 rounded-2xl border transition-all cursor-pointer border-slate-100 bg-slate-50 hover:border-amber-300";
    document.getElementById('map-dot-1').setAttribute('fill', '#047857');
    document.getElementById('map-dot-2').setAttribute('fill', '#b45309');
    const tooltip = document.getElementById('map-tooltip');
    const category = document.getElementById('map-tooltip-category');
    const title = document.getElementById('map-tooltip-title');
    const desc = document.getElementById('map-tooltip-desc');
    tooltip.classList.remove('hidden');
    if (id === 1) {
        document.getElementById('map-card-1').className = "p-4 rounded-2xl border transition-all cursor-pointer border-emerald-500 bg-emerald-50/30";
        document.getElementById('map-dot-1').setAttribute('fill', '#10b981');
        category.innerText = "Konservasi Mangrove";
        category.className = "text-xs font-bold text-emerald-400 uppercase tracking-widest";
        title.innerText = campaigns[0].title;
        desc.innerText = `Progres terkini berhasil menanam ${campaigns[0].metricCurrent} bibit untuk menahan pasang air laut di pesisir Tangsel.`;
    } else {
        document.getElementById('map-card-2').className = "p-4 rounded-2xl border transition-all cursor-pointer border-amber-500 bg-amber-50/30";
        document.getElementById('map-dot-2').setAttribute('fill', '#f59e0b');
        category.innerText = "Edukasi Pengelolaan Sampah";
        category.className = "text-xs font-bold text-amber-400 uppercase tracking-widest";
        title.innerText = campaigns[1].title;
        desc.innerText = `Sebanyak ${campaigns[1].metricCurrent} kepala keluarga di Pamulang telah berpartisipasi aktif melakukan biokonversi mandiri.`;
    }
}

function closeMapTooltip() {
    playSound('click');
    document.getElementById('map-tooltip').classList.add('hidden');
    document.getElementById('map-card-1').className = "p-4 rounded-2xl border transition-all cursor-pointer border-slate-100 bg-slate-50 hover:border-emerald-300";
    document.getElementById('map-card-2').className = "p-4 rounded-2xl border transition-all cursor-pointer border-slate-100 bg-slate-50 hover:border-amber-300";
    document.getElementById('map-dot-1').setAttribute('fill', '#047857');
    document.getElementById('map-dot-2').setAttribute('fill', '#b45309');
}

function calculateImpact() {
    playSound('slide');
    const mangroveVal = parseInt(document.getElementById('calc-mangrove-slider').value);
    const wasteVal = parseInt(document.getElementById('calc-waste-slider').value);
    document.getElementById('calc-mangrove-lbl').innerText = `${mangroveVal} Bibit`;
    document.getElementById('calc-waste-lbl').innerText = `${wasteVal} Sesi`;
    const co2Absorption = mangroveVal * 22;
    const peopleImpacted = wasteVal * 35;
    const wasteReduced = wasteVal * 250;
    document.getElementById('calc-co2-val').innerText = `${co2Absorption.toLocaleString('id-ID')} kg CO2 / Thn`;
    document.getElementById('calc-people-val').innerText = `${peopleImpacted.toLocaleString('id-ID')} Jiwa`;
    document.getElementById('calc-tpa-val').innerText = `${wasteReduced.toLocaleString('id-ID')} Kg / Bln`;
    document.getElementById('preview-co2-val').innerText = `${co2Absorption.toLocaleString('id-ID')} kg`;
    document.getElementById('preview-waste-val').innerText = `${peopleImpacted.toLocaleString('id-ID')} Jiwa`;
    const costMangrove = mangroveVal * 10000;
    const costWaste = wasteVal * 500000;
    const totalEquivalent = costMangrove + costWaste;
    document.getElementById('calc-total-dana-lbl').innerText = formatRupiah(totalEquivalent);
    return totalEquivalent;
}

function convertImpactToDonation() {
    const totalEquivalent = calculateImpact();
    openDonateModal(1, totalEquivalent);
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = leaderboard.slice(0, 5).map((p, idx) => `
        <div class="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100/50 animate-fadeIn">
            <div class="flex items-center space-x-3">
                <span class="font-black text-slate-400 text-sm w-5">${idx + 1}.</span>
                <div>
                    <span class="font-bold text-slate-800 block text-sm">${p.name}</span>
                    <span class="text-[10px] text-emerald-600 font-semibold">${p.badge}</span>
                </div>
            </div>
            <span class="text-sm font-extrabold text-slate-900 font-mono">${p.points} Poin</span>
        </div>
    `).join('');
}

function startQuiz() {
    const nameInput = document.getElementById('quiz-player-name').value.trim();
    if (!nameInput) {
        showToast('Harap masukkan nama pahlawanmu!', 'error');
        playSound('wrong');
        return;
    }
    playSound('click');
    quizPlayerName = nameInput;
    quizActive = true;
    quizCurrentQuestion = 0;
    quizScore = 0;
    quizSelectedOption = null;
    quizShowFeedback = false;
    document.getElementById('quiz-reg-panel').classList.add('hidden');
    document.getElementById('quiz-play-panel').classList.remove('hidden');
    showQuizQuestion();
}

function showQuizQuestion() {
    const qData = QUIZ_QUESTIONS[quizCurrentQuestion];
    document.getElementById('quiz-q-progress').innerText = `Pertanyaan ${quizCurrentQuestion + 1} dari ${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-score-indicator').innerText = `Skor: ${quizScore}/${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-question-text').innerText = qData.question;
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = qData.options.map((opt, idx) => `
        <button onclick="handleQuizAnswer(${idx})" class="quiz-opt-btn w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between border-slate-200 text-slate-700 hover:bg-slate-50">
            <span>${opt}</span>
        </button>
    `).join('');
    document.getElementById('quiz-explanation-box').classList.add('hidden');
}

function handleQuizAnswer(idx) {
    if (quizShowFeedback) return;
    quizSelectedOption = idx;
    quizShowFeedback = true;
    const qData = QUIZ_QUESTIONS[quizCurrentQuestion];
    const isCorrect = idx === qData.answer;
    const optButtons = document.querySelectorAll('.quiz-opt-btn');
    if (isCorrect) {
        playSound('success');
        quizScore++;
        document.getElementById('quiz-score-indicator').innerText = `Skor: ${quizScore}/${QUIZ_QUESTIONS.length}`;
    } else {
        playSound('wrong');
    }
    optButtons.forEach((btn, buttonIdx) => {
        btn.disabled = true;
        if (buttonIdx === qData.answer) {
            btn.className = "quiz-opt-btn w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold";
            btn.innerHTML += `<i data-lucide="check-circle-2" class="h-5 w-5 text-emerald-600"></i>`;
        } else if (buttonIdx === idx) {
            btn.className = "quiz-opt-btn w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between bg-rose-50 border-rose-500 text-rose-800";
        } else {
            btn.className = "quiz-opt-btn w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between border-slate-100 text-slate-400 opacity-60";
        }
    });
    document.getElementById('quiz-explanation-text').innerText = qData.explanation;
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.innerText = quizCurrentQuestion === QUIZ_QUESTIONS.length - 1 ? "Selesaikan Kuis" : "Lanjut ke Pertanyaan Berikutnya";
    document.getElementById('quiz-explanation-box').classList.remove('hidden');
    lucide.createIcons();
}

function nextQuizQuestion() {
    playSound('click');
    if (quizCurrentQuestion < QUIZ_QUESTIONS.length - 1) {
        quizCurrentQuestion++;
        quizSelectedOption = null;
        quizShowFeedback = false;
        showQuizQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('quiz-play-panel').classList.add('hidden');
    document.getElementById('quiz-finish-panel').classList.remove('hidden');
    document.getElementById('quiz-congrats').innerText = `Selamat, ${quizPlayerName}!`;
    document.getElementById('quiz-final-score').innerText = `${quizScore} / ${QUIZ_QUESTIONS.length} Benar`;
    const pointsAwarded = quizScore * 50;
    const badgeAward = document.getElementById('quiz-badge-award');
    let finalBadge = 'Pecinta Alam';
    if (quizScore === QUIZ_QUESTIONS.length) {
        finalBadge = 'Pakar Ekologi';
        badgeAward.innerHTML = `🎖️ Luar biasa! Wawasan lingkungan Anda setingkat Ahli. Lencana "Pakar Ekologi" resmi terbuka untuk profil Anda.`;
    } else {
        badgeAward.innerHTML = `💡 Bagus sekali! Anda telah belajar hal penting hari ini untuk disebarluaskan di komunitas terdekat.`;
    }
    leaderboard.push({
        id: Date.now(),
        name: quizPlayerName,
        points: pointsAwarded,
        badge: finalBadge
    });
    leaderboard.sort((a, b) => b.points - a.points);
    renderLeaderboard();
}

function resetQuiz() {
    playSound('click');
    document.getElementById('quiz-player-name').value = "";
    document.getElementById('quiz-finish-panel').classList.add('hidden');
    document.getElementById('quiz-reg-panel').classList.remove('hidden');
}

function downloadBadge() {
    playSound('success');
    showToast('Lencana berhasil diunduh ke folder Downloads secara simulasi!', 'success');
}

function submitVolunteerForm(e) {
    e.preventDefault();
    playSound('success');
    const volName = document.getElementById('vol-name').value;
    showToast(`Pendaftaran Berhasil! Terima kasih ${volName}. Tim kami akan segera menghubungi Anda.`, 'success');
    document.getElementById('vol-name').value = "";
    document.getElementById('vol-phone').value = "";
    document.getElementById('vol-email').value = "";
    document.getElementById('vol-domicile').value = "";
    document.getElementById('vol-motivation').value = "";
}

function openDonateModal(campaignId, overrideAmount = null) {
    playSound('click');
    selectedDonateCampaignId = campaignId;
    const selectEl = document.getElementById('donate-campaign-select');
    selectEl.innerHTML = campaigns.map(c => `
        <option value="${c.id}" ${c.id === campaignId ? 'selected' : ''}>${c.title}</option>
    `).join('');
    if (overrideAmount) {
        selectedDonateAmount = 'custom';
        document.getElementById('custom-amount-wrapper').classList.remove('hidden');
        document.getElementById('custom-amount-input').value = overrideAmount;
    } else {
        selectedDonateAmount = 100000;
        document.getElementById('custom-amount-wrapper').classList.add('hidden');
    }
    updatePresetButtons();
    document.getElementById('donate-modal').classList.remove('hidden');
}

function closeDonateModal() {
    playSound('click');
    document.getElementById('donate-modal').classList.add('hidden');
}

function selectPresetAmount(amount) {
    playSound('click');
    selectedDonateAmount = amount;
    const customWrapper = document.getElementById('custom-amount-wrapper');
    if (amount === 'custom') {
        customWrapper.classList.remove('hidden');
    } else {
        customWrapper.classList.add('hidden');
    }
    updatePresetButtons();
}

function updatePresetButtons() {
    const btns = document.querySelectorAll('.preset-btn');
    btns.forEach(btn => {
        const text = btn.innerText.replace(/[^\d]/g, '');
        const numVal = parseInt(text, 10);
        if (selectedDonateAmount === 'custom' && btn.innerText.includes('Custom')) {
            btn.className = "preset-btn w-full py-2.5 rounded-xl border text-center text-xs font-bold transition-all mt-2 bg-emerald-600 border-emerald-600 text-white shadow-md";
        } else if (selectedDonateAmount === numVal && !btn.innerText.includes('Custom')) {
            btn.className = "preset-btn py-3 px-1.5 rounded-xl border text-center text-xs font-bold transition-all bg-emerald-600 border-emerald-600 text-white shadow-md";
        } else {
            if (btn.innerText.includes('Custom')) {
                btn.className = "preset-btn w-full py-2.5 rounded-xl border text-center text-xs font-bold transition-all mt-2 border-slate-200 text-slate-500 hover:bg-slate-50";
            } else {
                btn.className = "preset-btn py-3 px-1.5 rounded-xl border text-center text-xs font-bold transition-all border-slate-200 text-slate-700 hover:bg-slate-50";
            }
        }
    });
}

function toggleAnon() {
    playSound('click');
    const isAnon = document.getElementById('anon-checkbox').checked;
    const fields = document.getElementById('donator-info-fields');
    if (isAnon) {
        fields.classList.add('hidden');
    } else {
        fields.classList.remove('hidden');
    }
}

function handleDonationSubmit(e) {
    e.preventDefault();
    let finalAmount = selectedDonateAmount;
    if (selectedDonateAmount === 'custom') {
        finalAmount = parseInt(document.getElementById('custom-amount-input').value, 10);
    }
    if (!finalAmount || finalAmount < 10000) {
        playSound('wrong');
        showToast('Minimal donasi adalah Rp 10.000', 'error');
        return;
    }
    const isAnon = document.getElementById('anon-checkbox').checked;
    const name = isAnon ? 'Donatur Anonim' : (document.getElementById('donate-name').value.trim() || 'Hamba Allah');
    const email = isAnon ? '' : document.getElementById('donate-email').value.trim();
    const message = document.getElementById('donate-message').value.trim() || 'Mendukung penuh kelestarian lingkungan!';
    const campaignId = parseInt(document.getElementById('donate-campaign-select').value, 10);
    let donBadge = 'Kawan Hijau';
    if (finalAmount >= 1000000) donBadge = 'Pahlawan Hijau';
    else if (finalAmount >= 500000) donBadge = 'Pelindung Bumi';
    else if (finalAmount >= 200000) donBadge = 'Penyebar Kebaikan';
    const newDonation = {
        id: Date.now(),
        name: name,
        amount: finalAmount,
        campaignId: campaignId,
        message: message,
        time: 'Baru saja',
        badge: donBadge
    };
    campaigns = campaigns.map(c => {
        if (c.id === campaignId) {
            const addedMetricValue = Math.floor(finalAmount / 10000);
            return {
                ...c,
                current: c.current + finalAmount,
                backers: c.backers + 1,
                metricCurrent: Math.min(c.metricTarget, c.metricCurrent + addedMetricValue)
            };
        }
        return c;
    });
    donations.unshift(newDonation);
    document.getElementById('donate-modal').classList.add('hidden');
    updateGlobalStats();
    renderCampaigns();
    renderDonationsWall();
    showCertificate(name, finalAmount, campaignId);
    document.getElementById('donate-name').value = "";
    document.getElementById('donate-email').value = "";
    document.getElementById('donate-message').value = "";
    document.getElementById('anon-checkbox').checked = false;
    document.getElementById('donator-info-fields').classList.remove('hidden');
}

function showCertificate(name, amount, campaignId) {
    playSound('success');
    const campaignTitle = campaigns.find(c => c.id === campaignId).title;
    const randNo = `AH/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const localDateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('cert-no').innerText = `No: ${randNo}`;
    document.getElementById('cert-name').innerText = name;
    document.getElementById('cert-campaign').innerText = campaignTitle;
    document.getElementById('cert-amount').innerText = formatRupiah(amount);
    document.getElementById('cert-date').innerText = localDateStr;
    document.getElementById('certificate-modal').classList.remove('hidden');
}

function closeCertificateModal() {
    playSound('click');
    document.getElementById('certificate-modal').classList.add('hidden');
    showToast('Donasi berhasil disalurkan secara simulasi! Terima kasih banyak.', 'success');
}

function simulateDownload() {
    playSound('success');
    showToast('Sertifikat berhasil diunduh ke folder Downloads secara simulasi!', 'success');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-container');
    const iconContainer = document.getElementById('toast-icon-container');
    const messageEl = document.getElementById('toast-message');
    messageEl.innerText = message;
    toast.classList.remove('hidden');
    if (type === 'error') {
        toast.className = "fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 bg-rose-50 border-l-4 border-rose-500 text-rose-800 animate-scaleUp";
        iconContainer.innerHTML = `<i data-lucide="info" class="h-6 w-6 text-rose-500"></i>`;
    } else {
        toast.className = "fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 animate-scaleUp";
        iconContainer.innerHTML = `<i data-lucide="check-circle-2" class="h-6 w-6 text-emerald-500"></i>`;
    }
    lucide.createIcons();
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

function runLiveSimulation() {
    const randomDonors = ['Andika Prasetyo', 'Mega Utami', 'Guntur Wibowo', 'Indah Permata', 'Agus Salim', 'Putri Handayani'];
    const randomMessages = [
        'Menjaga masa depan pesisir tempat bermain masa kecil.',
        'Sampah Tangsel adalah tanggung jawab kita bersama!',
        'Mari sukseskan zero waste di tingkat rukun tetangga.',
        'Kontribusi kecil dari Pamulang untuk bumi pertiwi.',
        'Maju terus pemuda-pemudi penggerak aksi hijau!'
    ];
    setInterval(() => {
        if (Math.random() > 0.65) {
            const targetCamp = campaigns[Math.floor(Math.random() * campaigns.length)];
            const simulatedAmount = [50000, 100000, 150000, 200000, 500000][Math.floor(Math.random() * 5)];
            const donorName = randomDonors[Math.floor(Math.random() * randomDonors.length)];
            const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            const generatedDonation = {
                id: Date.now(),
                name: donorName,
                amount: simulatedAmount,
                campaignId: targetCamp.id,
                message: msg,
                time: 'Baru saja',
                badge: simulatedAmount >= 500000 ? 'Pelindung Bumi' : 'Kawan Hijau'
            };
            campaigns = campaigns.map(c => {
                if (c.id === targetCamp.id) {
                    const addedMetricValue = Math.floor(simulatedAmount / 10000);
                    return {
                        ...c,
                        current: c.current + simulatedAmount,
                        backers: c.backers + 1,
                        metricCurrent: Math.min(c.metricTarget, c.metricCurrent + addedMetricValue)
                    };
                }
                return c;
            });
            donations.unshift(generatedDonation);
            if (donations.length > 8) donations.pop();
            const liveNotif = document.getElementById('live-notification');
            const notifText = document.getElementById('notification-text');
            notifText.innerHTML = `<strong class="text-emerald-400">${donorName}</strong> mendonasikan <strong>${formatRupiah(simulatedAmount)}</strong> untuk <i>${targetCamp.title}</i>`;
            liveNotif.classList.remove('hidden');
            playSound('success');
            updateGlobalStats();
            renderCampaigns();
            renderDonationsWall();
            if (fundingChartInstance) {
                initializeChart();
            }
            setTimeout(() => {
                liveNotif.classList.add('hidden');
            }, 5000);
        }
    }, 25000);
}

window.onload = function() {
    document.getElementById('footer-year').innerText = new Date().getFullYear();
    updateGlobalStats();
    renderCampaigns();
    renderDonationsWall();
    renderLeaderboard();
    calculateImpact();
    setTimeout(initializeChart, 100);
    runLiveSimulation();
};

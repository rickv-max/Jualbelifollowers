document.addEventListener('DOMContentLoaded', () => {
    // Data Produk (sesuai pricelist Anda)
    const products = {
        instagram: {
            followers: [
                { amount: 500, price: 28000 },
                { amount: 1000, price: 56000 },
                { amount: 1500, price: 84000 },
                { amount: 2000, price: 112000 },
                { amount: 2500, price: 140000 },
                { amount: 3000, price: 168000 },
                { amount: 5000, price: 280000 },
                { amount: 10000, price: 560000 },
            ],
            likes: [
                { amount: 500, price: 5000 },
                { amount: 1000, price: 10000 },
                { amount: 2000, price: 20000 },
                { amount: 3000, price: 30000 },
                { amount: 5000, price: 50000 },
                { amount: 10000, price: 100000 },
                { amount: 15000, price: 150000 },
                { amount: 20000, price: 200000 },
            ],
            views_reels: [
                { amount: 1000, price: 3000 },
                { amount: 10000, price: 30000 },
                { amount: 20000, price: 60000 },
                { amount: 30000, price: 90000 },
                { amount: 50000, price: 150000 },
            ],
        },
        tiktok: {
            followers: [
                { amount: 500, price: 25000 },
                { amount: 1000, price: 50000 },
                { amount: 1500, price: 75000 },
                { amount: 2000, price: 100000 },
                { amount: 2500, price: 125000 },
                { amount: 3000, price: 150000 },
                { amount: 5000, price: 250000 },
                { amount: 10000, price: 500000 },
            ],
            likes: [
                { amount: 500, price: 2500 },
                { amount: 1000, price: 5000 },
                { amount: 2000, price: 10000 },
                { amount: 3000, price: 15000 },
                { amount: 5000, price: 25000 },
                { amount: 10000, price: 50000 },
                { amount: 15000, price: 75000 },
                { amount: 20000, price: 100000 },
            ],
            views: [
                { amount: 1000, price: 1500 },
                { amount: 10000, price: 15000 },
                { amount: 20000, price: 30000 },
                { amount: 30000, price: 45000 },
                { amount: 50000, price: 75000 },
            ],
        },
        paket_hemat: {
            ig: {
                name: "Paket Hemat Instagram",
                details: "1000 Followers IG, 2000 Likes IG, 10000 Views Reels",
                bonus: "5rb views",
                price: 90000
            },
            tiktok: {
                name: "Paket Hemat TikTok",
                details: "1000 Followers TikTok, 2000 Likes TikTok, 30000 Views TikTok",
                bonus: "10rb views",
                price: 85000
            }
        }
    };

    // Fungsi untuk memformat angka menjadi format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi untuk merender produk ke dalam DOM
    const renderProducts = (platform, type, elementIndex) => {
        const productListDiv = document.querySelector(`#${platform} .product-category:nth-of-type(${elementIndex}) .product-list`);
        if (!productListDiv) return;

        let htmlContent = '';
        products[platform][type].forEach(item => {
            htmlContent += `
                <div class="product-item">
                    <span class="name">${item.amount} ${type.replace('_', ' ')}</span>
                    <span class="price">${formatRupiah(item.price)}</span>
                    <button class="btn btn-secondary order-btn" data-product-id="${platform}_${type}_${item.amount}" data-price="${item.price}">Pesan</button>
                </div>
            `;
        });
        productListDiv.innerHTML = htmlContent;
    };

    // Render semua produk saat DOM dimuat (mereka akan disembunyikan oleh CSS secara default)
    renderProducts('instagram', 'followers', 1);
    renderProducts('instagram', 'likes', 2);
    renderProducts('instagram', 'views_reels', 3);
    renderProducts('tiktok', 'followers', 1);
    renderProducts('tiktok', 'likes', 2);
    renderProducts('tiktok', 'views', 3);

    // Fungsi untuk menampilkan bagian tertentu dan menyembunyikan bagian lainnya
    const showSection = (sectionId) => {
        const allSections = document.querySelectorAll('.page-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Fungsionalitas menu hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMobileNav = document.getElementById('close-mobile-nav');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    const showProductsBtn = document.querySelector('.show-products-btn');

    // Referensi ke elemen modal
    const serviceChoiceModal = document.getElementById('service-choice-modal');
    const closeModalButton = serviceChoiceModal.querySelector('.close-button');
    const modalServiceButtons = serviceChoiceModal.querySelectorAll('.modal-btn');

    // --- Perbaikan Teks Tertimpa (Dynamically set padding for hero section) ---
    const mainHeader = document.querySelector('.main-header');
    const heroSection = document.getElementById('hero');

    const adjustHeroPadding = () => {
        if (mainHeader && heroSection) {
            const headerHeight = mainHeader.offsetHeight; // Dapatkan tinggi header secara real-time
            // Tambahkan padding-top asli hero-section ke tinggi header
            // padding-top asli hero-section adalah 60px (dari CSS)
            heroSection.style.paddingTop = `${60 + headerHeight}px`;
        }
    };

    // Panggil saat DOMContentLoaded dan juga saat window di-resize
    adjustHeroPadding();
    window.addEventListener('resize', adjustHeroPadding);
    // --- Akhir Perbaikan Teks Tertimpa ---


    // Event listener untuk membuka menu hamburger
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    // Event listener untuk menutup menu hamburger
    closeMobileNav.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });

    // Tangani klik pada tautan navigasi (desktop dan mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionId = event.target.dataset.targetSection;
            if (targetSectionId) {
                showSection(targetSectionId);
            }
            mobileNav.classList.remove('active');
        });
    });

    // Fungsionalitas Tombol "Lihat Layanan Kami"
    if (showProductsBtn) {
        showProductsBtn.addEventListener('click', (event) => {
            event.preventDefault();
            serviceChoiceModal.style.display = 'flex'; // Tampilkan modal
        });
    }

    // Event listener untuk tombol tutup modal
    closeModalButton.addEventListener('click', () => {
        serviceChoiceModal.style.display = 'none'; // Sembunyikan modal
    });

    // Event listener untuk menutup modal jika mengklik di luar konten modal
    window.addEventListener('click', (event) => {
        if (event.target == serviceChoiceModal) {
            serviceChoiceModal.style.display = 'none';
        }
    });

    // Event listener untuk tombol pilihan layanan di dalam modal
    modalServiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const service = event.target.dataset.service; // Ambil 'instagram', 'tiktok', atau 'paket-hemat'
            showSection(service); // Tampilkan bagian layanan yang dipilih
            serviceChoiceModal.style.display = 'none'; // Sembunyikan modal setelah pilihan
        });
    });

    // Tangani klik tombol "Pesan" pada setiap produk
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const price = parseFloat(event.target.dataset.price);
            let message = '';

            // Buat pesan WhatsApp berdasarkan ID produk
            if (productId.startsWith('paket_ig_hemat')) {
                message = `Halo admin, saya ingin memesan Paket Hemat Instagram (${products.paket_hemat.ig.details} + bonus ${products.paket_hemat.ig.bonus}) dengan harga ${formatRupiah(products.paket_hemat.ig.price)}.`;
            } else if (productId.startsWith('paket_tiktok_hemat')) {
                message = `Halo admin, saya ingin memesan Paket Hemat TikTok (${products.paket_hemat.tiktok.details} + bonus ${products.paket_hemat.tiktok.bonus}) dengan harga ${formatRupiah(products.paket_hemat.tiktok.price)}.`;
            } else {
                const [platform, type, amount] = productId.split('_');
                // Sesuaikan nama tipe untuk pesan WhatsApp agar lebih mudah dibaca
                let formattedType = type.replace('views_reels', 'Views Reels').replace('views', 'Views').replace('followers', 'Followers').replace('likes', 'Likes');
                message = `Halo admin, saya ingin memesan ${amount} ${formattedType} ${platform} dengan harga ${formatRupiah(price)}.`;
            }

            // Nomor WhatsApp Anda
            const whatsappNumber = '6285856618965';

            // Buat dan buka tautan WhatsApp
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
    });

    // Kondisi awal: Hanya bagian hero dan why-choose-us yang aktif saat halaman pertama kali dimuat
    document.getElementById('hero').classList.add('active');
    document.getElementById('why-choose-us').classList.add('active');
});

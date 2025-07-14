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

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const renderProducts = (platform, type, elementId) => {
        // Selector yang lebih spesifik untuk menargetkan div product-list dalam product-category yang benar
        const productListDiv = document.querySelector(`#${platform} .product-category:nth-of-type(${elementId}) .product-list`);
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

    // Render Instagram products
    renderProducts('instagram', 'followers', 1); // Followers Instagram (1st .product-category)
    renderProducts('instagram', 'likes', 2);     // Likes Instagram (2nd .product-category)
    renderProducts('instagram', 'views_reels', 3); // Views Reels Instagram (3rd .product-category)

    // Render TikTok products
    renderProducts('tiktok', 'followers', 1); // Followers TikTok (1st .product-category)
    renderProducts('tiktok', 'likes', 2);     // Likes TikTok (2nd .product-category)
    renderProducts('tiktok', 'views', 3);     // Views TikTok (3rd .product-category)

    // Handle order button clicks
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const price = parseFloat(event.target.dataset.price);
            let message = '';

            if (productId.startsWith('paket_ig_hemat')) {
                message = `Halo admin, saya ingin memesan Paket Hemat Instagram (${products.paket_hemat.ig.details} + bonus ${products.paket_hemat.ig.bonus}) dengan harga ${formatRupiah(products.paket_hemat.ig.price)}.`;
            } else if (productId.startsWith('paket_tiktok_hemat')) {
                message = `Halo admin, saya ingin memesan Paket Hemat TikTok (${products.paket_hemat.tiktok.details} + bonus ${products.paket_hemat.tiktok.bonus}) dengan harga ${formatRupiah(products.paket_hemat.tiktok.price)}.`;
            } else {
                // Untuk produk individual
                const [platform, type, amount] = productId.split('_');
                // Penyesuaian nama tipe untuk pesan WhatsApp agar lebih mudah dibaca
                let formattedType = type.replace('views_reels', 'Views Reels').replace('views', 'Views').replace('followers', 'Followers').replace('likes', 'Likes');
                message = `Halo admin, saya ingin memesan ${amount} ${formattedType} ${platform} dengan harga ${formatRupiah(price)}.`;
            }

            // Nomor WhatsApp Anda
            const whatsappNumber = '6285856618965'; // Nomor WhatsApp yang sudah diperbarui

            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
    });
});

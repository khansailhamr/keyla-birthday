// Menunggu semua elemen halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // Inisialisasi variabel elemen
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const activeIdxText = document.getElementById('activeIdx');
    const musicControl = document.getElementById('musicControl');
    const lagu = document.getElementById('lagu');
    const musicStatus = document.getElementById('musicStatus');

    let currentSlide = 0;
    let isMusicPlaying = false;

    // FUNGSI UNTUK PINDAH SLIDE
    function moveSlide(index) {
        // Hapus kelas active dari slide sebelumnya
        slides.forEach(s => s.classList.remove('active'));

        // Tambahkan kelas active ke slide target
        slides[index].classList.add('active');

        // Update nomor indikator slide
        activeIdxText.textContent = index + 1;

        // Animasi khusus untuk Slide 3 (List Alasan)
        if (index === 2) {
            const listItems = slides[index].querySelectorAll('.reason');

            listItems.forEach((item, i) => {
                // Memberikan delay kemunculan tiap poin agar bergantian
                setTimeout(() => {
                    item.classList.add('show');
                }, i * 400);
            });
        }

        // Cek jika mencapai Slide Terakhir (Slide 8)
        if (index === slides.length - 1) {
            jalankanConfetti();
        }
    }

    // EVENT LISTENER TOMBOL LANJUT
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            moveSlide(currentSlide);
        }
    });

    // EVENT LISTENER TOMBOL KEMBALI
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            moveSlide(currentSlide);
        }
    });

    // NAVIGASI KEYBOARD (Panah Kanan & Kiri)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });

    // KONTROL MUSIK
    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            lagu.pause();
            musicStatus.textContent = "🔇 Musik Berhenti";
        } else {
            lagu.play().catch(err => {
                console.log("Musik butuh interaksi user pertama kali.");
            });

            musicStatus.textContent = "🎵 Musik Dimulai";
        }

        isMusicPlaying = !isMusicPlaying;
    });

    // FUNGSI EFEK CONFETTI
    function jalankanConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;

        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            // Kembang api kiri
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2
                    }
                })
            );

            // Kembang api kanan
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2
                    }
                })
            );
        }, 250);
    }
});
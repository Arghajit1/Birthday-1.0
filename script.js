// Global variables
let currentImageIndex = 1;
const totalImages = 4;
let memoriesUnlocked = false;
let candleBlown = false;
let currentPage = 'page1';

// DOM elements
const beginSurpriseBtn = document.getElementById('beginSurpriseBtn');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const unlockContainer = document.getElementById('unlockContainer');
const galleryContainer = document.getElementById('galleryContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const downloadButtons = document.querySelectorAll('.download-btn');
const bgMusic = document.getElementById('bgMusic');
const cakeContainer = document.getElementById('cakeContainer');
const candle = document.getElementById('candle');
const message = document.getElementById('message');

// Music functions
function getMusicState() {
    return localStorage.getItem('musicPlaying') === 'true';
}

function setMusicState(state) {
    localStorage.setItem('musicPlaying', state ? 'true' : 'false');
}

function toggleMusic() {
    const currentState = getMusicState();
    const newState = !currentState;
    setMusicState(newState);
    
    if (newState) {
        bgMusic.play().catch(() => {});
        // Update all music icons and toggles
        updateMusicIconsAndToggles('ON');
        console.log('🎵 Music turned ON');
    } else {
        bgMusic.pause();
        updateMusicIconsAndToggles('OFF');
        console.log('🔇 Music turned OFF');
    }
}

// New helper function to update all music icons and toggles on all pages
function updateMusicIconsAndToggles(state) {
    const musicIcons = [
        document.getElementById('musicIcon'),
        document.getElementById('musicIconPage3'),
        document.getElementById('musicIconPage4'),
        document.getElementById('musicIconPage5')
    ];
    const musicToggleButtons = [
        document.getElementById('musicToggle'),
        document.getElementById('musicTogglePage3'),
        document.getElementById('musicTogglePage4'),
        document.getElementById('musicTogglePage5')
    ];
    
    musicIcons.forEach(icon => {
        if (!icon) return;
        if (state === 'ON') {
            icon.classList.add('playing');
            icon.style.color = '#9d4edd';
        } else {
            icon.classList.remove('playing');
            icon.style.color = '#999';
        }
    });
    
    musicToggleButtons.forEach(btn => {
        if (!btn) return;
        if (state === 'ON') {
            btn.textContent = 'ON';
            btn.classList.remove('off');
        } else {
            btn.textContent = 'OFF';
            btn.classList.add('off');
        }
    });
    
    if (state === 'ON') {
        createMultipleSparkles();
    }
}

function initializeMusicState() {
    if (getMusicState()) {
        updateMusicIconsAndToggles('ON');
    } else {
        updateMusicIconsAndToggles('OFF');
    }
}

function updateMusicToggleButtons(state) {
    const buttons = [
        musicToggle,
        document.getElementById('musicTogglePage3'),
        document.getElementById('musicTogglePage4'),
        document.getElementById('musicTogglePage5')
    ];
    buttons.forEach(btn => {
        if (!btn) return;
        if (state === 'ON') {
            btn.textContent = 'ON';
            btn.classList.remove('off');
        } else {
            btn.textContent = 'OFF';
            btn.classList.add('off');
        }
    });
}

function initializeMusicState() {
    if (getMusicState()) {
        musicIcon.classList.add('playing');
        musicIcon.style.color = '#9d4edd';
        updateMusicToggleButtons('ON');
        createMultipleSparkles();
    } else {
        musicIcon.classList.remove('playing');
        musicIcon.style.color = '#999';
        updateMusicToggleButtons('OFF');
    }
}

function initializeMusicState() {
    if (getMusicState()) {
        musicIcon.classList.add('playing');
        musicIcon.style.color = '#9d4edd';
        musicToggle.textContent = 'ON';
        musicToggle.classList.remove('off');
        createMultipleSparkles();
    } else {
        musicIcon.classList.remove('playing');
        musicIcon.style.color = '#999';
        musicToggle.textContent = 'OFF';
        musicToggle.classList.add('off');
    }
}

function playMusic() {
    if (!bgMusic) return;
    if (getMusicState()) {
        const savedTime = parseFloat(localStorage.getItem('musicPlaybackTime'));
        if (!isNaN(savedTime)) {
            bgMusic.currentTime = savedTime;
        }
        bgMusic.play().catch(() => {});
    } else {
        bgMusic.pause();
    }
}

// Page navigation functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'flex';
        page.classList.add('active');
    }
    currentPage = pageId;
}

function nextPage(targetPage) {
    if (targetPage) {
        showPage(targetPage);
    } else {
        // Default next page logic
        const pages = ['page1', 'page2', 'page3', 'page4', 'page5'];
        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex < pages.length - 1) {
            showPage(pages[currentIndex + 1]);
        }
    }
}

function prevPage(targetPage) {
    if (targetPage) {
        showPage(targetPage);
    } else {
        // Default previous page logic
        const pages = ['page1', 'page2', 'page3', 'page4', 'page5'];
        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex > 0) {
            showPage(pages[currentIndex - 1]);
        }
    }
}

// Memory gallery functions
function unlockMemories() {
    if (memoriesUnlocked) return;
    
    const unlockText = document.querySelector('.unlock-text');
    const headerTitle = document.querySelector('#page2 .header h1');
    
    unlockContainer.style.transform = 'scale(1.1)';
    unlockContainer.style.background = 'rgba(255, 255, 255, 0.5)';
    
    createMultipleSparkles();
    
    setTimeout(() => {
        unlockText.innerHTML = 'Memories Unlocked! ✨';
        unlockText.style.color = '#ff69b4';
        
        setTimeout(() => {
            unlockContainer.classList.add('hidden');
            galleryContainer.classList.add('visible');
            if (headerTitle) {
                headerTitle.style.display = 'none';
            }
            memoriesUnlocked = true;
            showNextPageButton();
            updateNavigationButtons();
        }, 1000);
    }, 500);
}

function showNextPageButton() {
    if (nextPageBtn && memoriesUnlocked) {
        nextPageBtn.classList.add('visible');
        nextPageBtn.disabled = false;
        nextPageBtn.style.display = 'inline-block';
        nextPageBtn.style.opacity = '1';
        nextPageBtn.style.transform = 'translateY(0)';
        nextPageBtn.style.pointerEvents = 'all';
    }
}

function showImage(index) {
    for (let i = 1; i <= totalImages; i++) {
        const imageCard = document.getElementById(`image${i}`);
        if (imageCard) {
            imageCard.classList.remove('active');
        }
    }
    
    const currentCard = document.getElementById(`image${index}`);
    if (currentCard) {
        currentCard.classList.add('active');
    }
    
    const currentImageSpan = document.getElementById('currentImage');
    if (currentImageSpan) {
        currentImageSpan.textContent = index;
    }
    
    currentImageIndex = index;
    updateNavigationButtons();
    
    if (memoriesUnlocked) {
        showNextPageButton();
    }
}

function nextImage() {
    if (currentImageIndex < totalImages) {
        showImage(currentImageIndex + 1);
    }
}

function previousImage() {
    if (currentImageIndex > 1) {
        showImage(currentImageIndex - 1);
    }
}

function updateNavigationButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentImageIndex === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentImageIndex === totalImages;
    }
}

// Download functions
function downloadMemory(imageNumber, event) {
    event.stopPropagation();
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    
    console.log(`Downloading memory ${imageNumber}`);
    
    btn.innerHTML = '⬇️ Downloading...';
    btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    btn.disabled = true;
    
    const imageElement = document.getElementById(`image${imageNumber}`);
    if (!imageElement) {
        console.error(`Image element ${imageNumber} not found`);
        btn.innerHTML = '❌ Image not found';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
            btn.disabled = false;
        }, 2000);
        return;
    }
    
    const imgElement = imageElement.querySelector('img');
    if (!imgElement) {
        console.error(`IMG element in image${imageNumber} not found`);
        btn.innerHTML = '❌ Image not found';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
            btn.disabled = false;
        }, 2000);
        return;
    }
    
    const imgSrc = imgElement.src;
    console.log(`Image source: ${imgSrc}`);
    
    downloadImage(imgSrc, `memory_${imageNumber}`, () => {
        btn.innerHTML = '✅ Downloaded!';
        createSparkle(btn.offsetLeft + btn.offsetWidth/2, btn.offsetTop);
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
            btn.disabled = false;
        }, 2000);
    }, () => {
        btn.innerHTML = '❌ Download Failed';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
            btn.disabled = false;
        }, 2000);
    });
}

function downloadImage(imageUrl, fileName, onSuccess, onError) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        try {
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName + '.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    if (onSuccess) onSuccess();
                } else {
                    fallbackDownload();
                }
            }, 'image/png');
        } catch (e) {
            console.error('Canvas method failed:', e);
            fallbackDownload();
        }
    };
    
    img.onerror = function() {
        console.error('Image load failed');
        fallbackDownload();
    };
    
    function fallbackDownload() {
        try {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            if (onSuccess) onSuccess();
        } catch (e) {
            console.error('Fallback download failed:', e);
            if (onError) onError();
        }
    }
    
    if (imageUrl.startsWith('http') && !imageUrl.includes(window.location.hostname)) {
        img.crossOrigin = 'anonymous';
    }
    
    img.src = imageUrl;
}

// Animation effects
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '24px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

function createMultipleSparkles() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
}

function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#00ff7f', '#87ceeb', '#ff4500', '#9370db', '#ff6347'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 4 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
    }
}

function createSparkles() {
    const cake = document.getElementById('cakeContainer');
    const rect = cake.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkles';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

function createBalloons() {
    const balloonColors = ['#ff69b4', '#ff1493', '#ffd700', '#00ff7f', '#87ceeb', '#ff4500', '#9370db', '#ff6347'];
    
    for (let i = 0; i < 12; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDelay = Math.random() * 1.5 + 's';
        balloon.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        const balloonString = document.createElement('div');
        balloonString.className = 'balloon-string';
        balloon.appendChild(balloonString);
        
        document.body.appendChild(balloon);
        
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
            }
        }, 6000);
    }
}

// Light up functionality
function turnLightsOn(event) {
    const page4 = document.getElementById('page4');
    page4.classList.remove('dark-mode');
    page4.classList.add('light-mode');
    event.target.textContent = 'Light On';
    setTimeout(() => {
        nextPage('page5');
    }, 500);
}

function savePlaybackTime() {
    if (bgMusic && !bgMusic.paused) {
        localStorage.setItem('musicPlaybackTime', bgMusic.currentTime.toString());
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        100% { opacity: 0; transform: translateY(-80px) scale(0.3) rotate(180deg); }
    }
`;
document.head.appendChild(sparkleStyle);

// Event listeners
function initializeEventListeners() {
    if (beginSurpriseBtn) {
        beginSurpriseBtn.addEventListener('click', () => {
            bgMusic.play();
            setTimeout(() => {
                showPage('page2');
            }, 500);
        });
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Add event listeners for new music toggle buttons on pages 3, 4, and 5
    const musicTogglePage3 = document.getElementById('musicTogglePage3');
    if (musicTogglePage3) {
        musicTogglePage3.addEventListener('click', toggleMusic);
    }
    const musicTogglePage4 = document.getElementById('musicTogglePage4');
    if (musicTogglePage4) {
        musicTogglePage4.addEventListener('click', toggleMusic);
    }
    const musicTogglePage5 = document.getElementById('musicTogglePage5');
    if (musicTogglePage5) {
        musicTogglePage5.addEventListener('click', toggleMusic);
    }

    if (unlockContainer) {
        unlockContainer.addEventListener('click', unlockMemories);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', previousImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    downloadButtons.forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
            downloadMemory(index + 1, event);
        });
    });

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            console.log('Next page button clicked');
            showPage('page3');
        });
    }

    if (cakeContainer) {
        cakeContainer.addEventListener('click', function() {
            if (!candleBlown) {
                candle.classList.add('blown-out');
                candleBlown = true;
                
                message.textContent = '🎉 Happy Birthday! The wish is made! 🎉';
                message.classList.add('show');
                
                const nextBtn = document.querySelector('.next-btn');
                if (nextBtn) {
                    nextBtn.style.display = 'block';
                    nextBtn.style.opacity = '0';
                    setTimeout(() => {
                        nextBtn.style.opacity = '1';
                    }, 1000);
                }
                
                createSparkles();
                
                setTimeout(() => {
                    createBalloons();
                }, 500);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!memoriesUnlocked) return;
        
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

function initializeEventListeners() {
    if (beginSurpriseBtn) {
        beginSurpriseBtn.addEventListener('click', () => {
            bgMusic.play();
            setTimeout(() => {
                showPage('page2');
            }, 500);
        });
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Add event listeners for new music toggle buttons on pages 3, 4, and 5
    const musicTogglePage3 = document.getElementById('musicTogglePage3');
    if (musicTogglePage3) {
        musicTogglePage3.addEventListener('click', toggleMusic);
    }
    const musicTogglePage4 = document.getElementById('musicTogglePage4');
    if (musicTogglePage4) {
        musicTogglePage4.addEventListener('click', toggleMusic);
    }
    const musicTogglePage5 = document.getElementById('musicTogglePage5');
    if (musicTogglePage5) {
        musicTogglePage5.addEventListener('click', toggleMusic);
    }

    if (unlockContainer) {
        unlockContainer.addEventListener('click', unlockMemories);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', previousImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    downloadButtons.forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
            downloadMemory(index + 1, event);
        });
    });

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            console.log('Next page button clicked');
            showPage('page3');
        });
    }

    if (cakeContainer) {
        cakeContainer.addEventListener('click', function() {
            if (!candleBlown) {
                candle.classList.add('blown-out');
                candleBlown = true;
                
                message.textContent = '🎉 Happy Birthday! The wish is made! 🎉';
                message.classList.add('show');
                
                const nextBtn = document.querySelector('.next-btn');
                if (nextBtn) {
                    nextBtn.style.display = 'block';
                    nextBtn.style.opacity = '0';
                    setTimeout(() => {
                        nextBtn.style.opacity = '1';
                    }, 1000);
                }
                
                createSparkles();
                
                setTimeout(() => {
                    createBalloons();
                }, 500);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!memoriesUnlocked) return;
        
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    showPage(currentPage);
    updateNavigationButtons();
    initializeMusicState();
    playMusic();
    initializeEventListeners();
    
    // Show initial message on page3
    if (currentPage === 'page3' && message) {
        setTimeout(() => {
            message.classList.add('show');
        }, 1000);
    }
    
    // Save music playback time periodically
    setInterval(savePlaybackTime, 1000);
});

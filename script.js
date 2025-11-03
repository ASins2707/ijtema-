 // Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateLiveStats();
    startLiveUpdates();
    setupMobileMenu();
    initializeSocialFeeds();
}

// Update live statistics
function updateLiveStats() {
    // Simulated data - in real implementation, this would come from Google Forms
    const stats = {
        male: 245,
        female: 189,
        child: 134,
        youth: 167
    };
    
    document.getElementById('maleCount').textContent = stats.male;
    document.getElementById('femaleCount').textContent = stats.female;
    document.getElementById('childCount').textContent = stats.child;
    document.getElementById('youthCount').textContent = stats.youth;
}

// Start live updates simulation
function startLiveUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        const randomIncrement = Math.floor(Math.random() * 5) + 1;
        const currentMale = parseInt(document.getElementById('maleCount').textContent);
        const currentFemale = parseInt(document.getElementById('femaleCount').textContent);
        const currentChild = parseInt(document.getElementById('childCount').textContent);
        const currentYouth = parseInt(document.getElementById('youthCount').textContent);
        
        document.getElementById('maleCount').textContent = currentMale + randomIncrement;
        document.getElementById('femaleCount').textContent = currentFemale + randomIncrement;
        document.getElementById('childCount').textContent = currentChild + Math.floor(randomIncrement/2);
        document.getElementById('youthCount').textContent = currentYouth + randomIncrement;
        
        // Update mosque circles randomly
        updateMosqueCircles();
        
    }, 30000);
}

// Update mosque circle counts
function updateMosqueCircles() {
    const circleItems = document.querySelectorAll('.circle-item');
    circleItems.forEach(circle => {
        const currentCount = parseInt(circle.getAttribute('data-count'));
        const randomIncrement = Math.floor(Math.random() * 3);
        const newCount = currentCount + randomIncrement;
        circle.setAttribute('data-count', newCount);
        circle.textContent = circle.textContent.split(' ')[0]; // Keep only mosque name
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Initialize social feeds (placeholder for actual implementation)
function initializeSocialFeeds() {
    console.log("Social feeds would be initialized here with:");
    console.log("1. Instagram API integration");
    console.log("2. YouTube API integration");
    console.log("3. Automatic content loading");
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav link
        updateActiveNavLink(sectionId);
    }
}

// Update active navigation link
function updateActiveNavLink(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Open Google Form
function openGoogleForm() {
    const formUrl = "https://forms.gle/your-ijtema-form-link";
    window.open(formUrl, '_blank');
    
    // Show success message
    showNotification("Google Form opened in new tab!", "success");
}

// Copy Dawat link
function copyDawatLink() {
    const linkInput = document.getElementById('dawatLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    try {
        navigator.clipboard.writeText(linkInput.value).then(() => {
            showNotification("दावत लिंक कॉपी हो गया!", "success");
            
            // Update button text temporarily
            const copyBtn = document.querySelector('.btn-copy');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> कॉपीड';
            copyBtn.style.background = '#0A5D2C';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    } catch (err) {
        // Fallback for older browsers
        document.execCommand('copy');
        showNotification("दावत लिंक कॉपी हो गया!", "success");
    }
}

// Open Google Maps
function openGoogleMaps() {
    const mapsUrl = "https://goo.gl/maps/your-location-link";
    window.open(mapsUrl, '_blank');
    showNotification("Google Maps opened!", "success");
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#0A5D2C' : '#1A5276'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Intersection Observer for active navigation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            updateActiveNavLink(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Add click listeners to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Handle banner upload (placeholder)
function handleBannerUpload() {
    showNotification("Banner upload feature would be implemented here", "info");
}

// Simulate social media feed loading
function loadSocialFeeds() {
    setTimeout(() => {
        const instagramFeed = document.querySelector('.instagram-feed .feed-placeholder');
        const youtubeFeed = document.querySelector('.youtube-feed .feed-placeholder');
        
        if (instagramFeed) {
            instagramFeed.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fab fa-instagram" style="font-size: 3rem; color: #E4405F; margin-bottom: 1rem;"></i>
                    <p>Instagram फीड लोड हो रही है...</p>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
                        वास्तविक इंटीग्रेशन के लिए Instagram API की जरूरत होगी
                    </p>
                </div>
            `;
        }
        
        if (youtubeFeed) {
            youtubeFeed.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fab fa-youtube" style="font-size: 3rem; color: #FF0000; margin-bottom: 1rem;"></i>
                    <p>YouTube वीडियो लोड हो रहे हैं...</p>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
                        वास्तविक इंटीग्रेशन के लिए YouTube API की जरूरत होगी
                    </p>
                </div>
            `;
        }
    }, 2000);
}

// Initialize social feeds on page load
loadSocialFeeds();

// Export data function (for admin use)
function exportParticipantsData() {
    showNotification("डेटा एक्सपोर्ट फीचर यहाँ इम्प्लीमेंट किया जाएगा", "info");
}

// Print participants list
function printParticipantsList() {
    window.print();
}

// Add window load event for final initialization
window.addEventListener('load', function() {
    console.log("Ijtema Website Fully Loaded");
    console.log("Features included:");
    console.log("✅ Hindi Hadith in moving banner");
    console.log("✅ Teams section with management teams");
    console.log("✅ Live participation statistics");
    console.log("✅ Mosque circle visualization");
    console.log("✅ Social media gallery");
    console.log("✅ Contact table");
    console.log("✅ Dawat instructions");
    console.log("✅ Location with maps");
    console.log("✅ Fully responsive design");
});
let zIndexCounter = 1;
let dragTarget = null;
let offsetX, offsetY;

// Responsive Design Functions
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust window positions on resize
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        if (isMobile()) {
            // On mobile, center windows
            window.style.left = '5vw';
            window.style.top = '10vh';
        }
    });
});

// Taskbar functionality
function updateTaskbar() {
    const taskbarItems = document.getElementById('taskbarItems');
    const openWindows = document.querySelectorAll('.window[style*="display: block"], .window:not([style*="display: none"])');
    
    // Clear existing taskbar items
    taskbarItems.innerHTML = '';
    
    // Add taskbar items for open windows
    openWindows.forEach(window => {
        if (window.id && window.id !== 'loadingScreen') {
            const taskbarItem = document.createElement('div');
            taskbarItem.style.cssText = 'background: linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 50%, #808080 100%); border: 1px solid #000; padding: 2px 8px; margin: 2px; cursor: pointer; font-size: 10px; color: #000; display: flex; align-items: center; gap: 4px;';
            taskbarItem.innerHTML = window.querySelector('.title-bar-text')?.textContent || window.id;
            taskbarItem.onclick = () => bringToFront(window.id);
            taskbarItems.appendChild(taskbarItem);
        }
    });
}

// Update time in taskbar
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    const timeElement = document.querySelector('#taskbar div:last-child');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Update time every minute
setInterval(updateTime, 60000);
updateTime(); // Initial time update

// Start Menu functionality
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    if (startMenu.style.display === 'none' || startMenu.style.display === '') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
}

function closeStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = 'none';
}

// Close start menu when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.style.display = 'none';
    }
});

// Loading Screen Functionality
window.addEventListener('load', function() {
    startLoadingSequence();
});

function startLoadingSequence() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingMessage = document.getElementById('loadingMessage');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingDots = document.getElementById('loadingDots');
    const loadingScreen = document.getElementById('loadingScreen');
    
    const messages = [
        'Starting up...',
        'Loading system files...',
        'Initializing desktop...',
        'Loading portfolio data...',
        'Preparing windows...',
        'Almost ready...',
        'System ready!'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress between 5-20%
        
        if (progress > 100) {
            progress = 100;
        }
        
        loadingBar.style.width = progress + '%';
        loadingProgress.textContent = Math.round(progress) + '%';
        
        // Update message
        if (progress > (messageIndex + 1) * 14) {
            if (messageIndex < messages.length - 1) {
                messageIndex++;
                loadingMessage.textContent = messages[messageIndex];
            }
        }
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Add a small delay before hiding
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 200);
    
    // Animate dots
    let dotCount = 0;
    setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingDots.textContent = '.'.repeat(dotCount);
    }, 500);
}

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    bringToFront(id);
    updateTaskbar(); // Update taskbar when window opens
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
    updateTaskbar(); // Update taskbar when window closes
}

function bringToFront(id) {
    zIndexCounter++;
    const win = document.getElementById(id);
    win.style.zIndex = zIndexCounter;
}

function dragStart(e, id) {
    dragTarget = document.getElementById(id);
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.onmousemove = dragMove;
    document.onmouseup = dragEnd;
}

function dragMove(e) {
    if (dragTarget) {
        dragTarget.style.left = (e.pageX - offsetX) + 'px';
        dragTarget.style.top = (e.pageY - offsetY) + 'px';
    }
}

function dragEnd() {
    dragTarget = null;
    document.onmousemove = null;
    document.onmouseup = null;
}

function openPopup(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    bringToFront(id);
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

function downloadResume() {
    window.open('resume.pdf', '_blank');
}


function openEmail() {
    // This would open the user's default email client
    window.location.href = 'mailto:annabelletiew12345@gmail.com?subject=Hello from your portfolio!';
}

function openLinkedIn() {
    // Opens LinkedIn profile in new tab
    window.open('https://www.linkedin.com/in/annabelle-tiew-66431828a/', '_blank');
}

function openGitHub() {
    // Opens GitHub profile in new tab
    window.open('https://github.com/icecreampuppy1231', '_blank');
}

function openProject(projectId) {
    // Handle different project links - UPDATE THESE WITH YOUR ACTUAL REPOSITORIES
    const projectLinks = {
        // Replace these with your actual GitHub repository URLs
        'github1': 'https://github.com/icecreampuppy1231/2006-',
        'github3': 'https://github.com/icecreampuppy1231/icecreampuppy1231.github.io',
        'demo3': 'https://icecreampuppy1231.github.io',
        'github4': 'https://github.com/icecreampuppy1231/',
    };
    
    if (projectLinks[projectId]) {
        window.open(projectLinks[projectId], '_blank');
    } else {
        alert('Project link not found! Please update the project links in script.js');
    }
}

function openAllProjects() {
    // Opens main GitHub profile
    window.open('https://github.com/icecreampuppy1231', '_blank');
}

function switchTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.style.background = '#f0f0f0';
        tab.style.color = '#666';
    });
    
    // Show selected tab content
    document.getElementById(tabName + '-content').style.display = 'block';
    
    // Add active class to selected tab
    const activeTab = document.getElementById('tab-' + tabName);
    activeTab.style.background = '#df96ba';
    activeTab.style.color = 'white';
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    // In a real implementation, you might want to add it to a taskbar
}

function maximizeWindow(id) {
    const win = document.getElementById(id);
    const isMaximized = win.getAttribute('data-maximized') === 'true';
    
    if (isMaximized) {
        // Restore to original size
        win.style.width = win.getAttribute('data-original-width') || '500px';
        win.style.height = win.getAttribute('data-original-height') || '400px';
        win.style.top = win.getAttribute('data-original-top') || '100px';
        win.style.left = win.getAttribute('data-original-left') || '100px';
        win.setAttribute('data-maximized', 'false');
    } else {
        // Save original dimensions and position
        win.setAttribute('data-original-width', win.style.width);
        win.setAttribute('data-original-height', win.style.height);
        win.setAttribute('data-original-top', win.style.top);
        win.setAttribute('data-original-left', win.style.left);
        
        // Maximize to full screen
        win.style.width = '95vw';
        win.style.height = '90vh';
        win.style.top = '2.5vh';
        win.style.left = '2.5vw';
        win.setAttribute('data-maximized', 'true');
    }
}
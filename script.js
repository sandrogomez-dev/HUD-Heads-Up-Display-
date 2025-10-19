// ===== BOOT SEQUENCE =====
let bootMessages = [
    'Initializing core systems...',
    'Loading neural network...',
    'Calibrating sensors...',
    'Establishing connections...',
    'JARVIS online'
];

let bootIndex = 0;
const bootInterval = setInterval(() => {
    if (bootIndex < bootMessages.length) {
        document.getElementById('bootStatus').textContent = bootMessages[bootIndex];
        bootIndex++;
    } else {
        clearInterval(bootInterval);
    }
}, 800);

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== HEXAGON FIELD =====
function generateHexagons() {
    const hexField = document.getElementById('hexField');
    for (let i = 0; i < 15; i++) {
        const hex = document.createElement('div');
        hex.className = 'hexagon';
        hex.style.left = `${Math.random() * 100}%`;
        hex.style.top = `${Math.random() * 100}%`;
        hex.style.animationDelay = `${Math.random() * 3}s`;
        hex.style.animationDuration = `${3 + Math.random() * 2}s`;
        hexField.appendChild(hex);
    }
}

generateHexagons();

// ===== CIRCULAR PROGRESS =====
function setProgress(elementId, percent) {
    const circle = document.getElementById(elementId);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Initialize progress rings
setTimeout(() => {
    setProgress('progress-1', 98);
    setProgress('progress-2', 100);
    setProgress('progress-3', 89);
}, 100);

// ===== HUD SYSTEM DATA =====
class HUDSystem {
    constructor() {
        this.altitude = 8450;
        this.velocity = 1247;
        this.heading = 85;
        
        this.powerCore = 98;
        this.shields = 100;
        this.weapons = 89;
        
        this.scanProgress = 0;
        this.targetLocked = false;
        
        this.messages = [];
        
        this.init();
    }
    
    init() {
        // Start system updates
        setInterval(() => this.updateTelemetry(), 100);
        setInterval(() => this.updateSystemStatus(), 3000);
        setInterval(() => this.updateScan(), 2000);
        setInterval(() => this.updateTarget(), 4000);
        
        // Add initial message
        this.addMessage('Systems operational', 'info');
        
        setTimeout(() => {
            this.addMessage('Radar online', 'info');
        }, 2000);
        
        setTimeout(() => {
            this.addMessage('Weapons armed', 'warning');
        }, 4000);
    }
    
    updateTelemetry() {
        // Simulate altitude changes
        this.altitude += (Math.random() - 0.5) * 10;
        this.altitude = Math.max(0, Math.min(15000, this.altitude));
        
        // Simulate velocity changes
        this.velocity += (Math.random() - 0.5) * 5;
        this.velocity = Math.max(0, Math.min(2500, this.velocity));
        
        // Simulate heading changes
        this.heading += (Math.random() - 0.5) * 2;
        this.heading = ((this.heading % 360) + 360) % 360;
        
        // Update display
        document.getElementById('altitude').textContent = 
            Math.round(this.altitude).toString().padStart(5, '0');
        document.getElementById('velocity').textContent = 
            Math.round(this.velocity).toString().padStart(4, '0');
        document.getElementById('heading').textContent = 
            Math.round(this.heading).toString().padStart(3, '0') + '°';
    }
    
    updateSystemStatus() {
        // Simulate system fluctuations
        const rand = Math.random();
        
        if (rand > 0.7) {
            this.powerCore = Math.max(50, this.powerCore - Math.random() * 20);
        } else {
            this.powerCore = Math.min(100, this.powerCore + Math.random() * 10);
        }
        
        if (rand > 0.8) {
            this.shields = Math.max(0, this.shields - Math.random() * 30);
            if (this.shields < 30) {
                this.addMessage('SHIELDS CRITICAL!', 'danger');
            }
        } else {
            this.shields = Math.min(100, this.shields + Math.random() * 15);
        }
        
        if (rand > 0.85) {
            this.weapons = Math.max(30, this.weapons - Math.random() * 15);
        } else {
            this.weapons = Math.min(100, this.weapons + Math.random() * 10);
        }
        
        // Update progress rings
        setProgress('progress-1', Math.round(this.powerCore));
        setProgress('progress-2', Math.round(this.shields));
        setProgress('progress-3', Math.round(this.weapons));
        
        // Update percentages
        document.getElementById('power-percent').textContent = 
            Math.round(this.powerCore) + '%';
        document.getElementById('shield-percent').textContent = 
            Math.round(this.shields) + '%';
        document.getElementById('weapon-percent').textContent = 
            Math.round(this.weapons) + '%';
    }
    
    updateScan() {
        this.scanProgress = 0;
        const scanInterval = setInterval(() => {
            this.scanProgress += 10;
            document.getElementById('scanProgress').textContent = this.scanProgress + '%';
            
            if (this.scanProgress >= 100) {
                clearInterval(scanInterval);
                document.querySelector('.scan-result').textContent = 'SCAN COMPLETE';
                
                setTimeout(() => {
                    document.querySelector('.scan-result').textContent = 'SCANNING TARGET...';
                }, 1000);
            }
        }, 200);
    }
    
    updateTarget() {
        this.targetLocked = !this.targetLocked;
        const targetText = document.getElementById('targetText');
        
        if (this.targetLocked) {
            targetText.textContent = 'TARGET LOCKED';
            targetText.style.color = '#ff0040';
            this.addMessage('Target acquired', 'warning');
        } else {
            targetText.textContent = 'ACQUIRING TARGET';
            targetText.style.color = '#ffd700';
        }
    }
    
    addMessage(text, type = 'info') {
        const messageFeed = document.getElementById('messageFeed');
        const now = new Date();
        const time = now.toTimeString().split(' ')[0];
        
        const message = document.createElement('div');
        message.className = `message-item ${type}`;
        message.innerHTML = `
            <span class="msg-time">${time}</span>
            <span class="msg-text">${text}</span>
        `;
        
        messageFeed.insertBefore(message, messageFeed.firstChild);
        
        // Keep only last 5 messages
        while (messageFeed.children.length > 5) {
            messageFeed.removeChild(messageFeed.lastChild);
        }
    }
}

// ===== INITIALIZE SYSTEM =====
setTimeout(() => {
    const hud = new HUDSystem();
    
    // Random event messages
    const events = [
        { msg: 'Hostile detected', type: 'danger' },
        { msg: 'Navigation updated', type: 'info' },
        { msg: 'Power surge detected', type: 'warning' },
        { msg: 'Shields recharging', type: 'info' },
        { msg: 'Entering combat zone', type: 'warning' },
        { msg: 'Enemy missile locked', type: 'danger' },
        { msg: 'Countermeasures deployed', type: 'info' },
        { msg: 'Hull integrity stable', type: 'info' },
        { msg: 'Ammunition: 78%', type: 'info' },
        { msg: 'Radar interference', type: 'warning' }
    ];
    
    setInterval(() => {
        const event = events[Math.floor(Math.random() * events.length)];
        hud.addMessage(event.msg, event.type);
    }, 8000);
    
}, 5500);

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== INTERACTIVE EFFECTS =====
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    // Parallax effect on circles
    const circles = document.querySelector('.hud-circles');
    if (circles) {
        circles.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c⚡ JARVIS PROTOCOL ACTIVATED ⚡', 
    'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%cWelcome to the HUD Interface System', 
    'color: #0af; font-size: 14px;');
console.log('%cAll systems operational', 
    'color: #00ff88; font-size: 12px;');

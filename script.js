// HUD Data Simulation System

class HUDSystem {
    constructor() {
        this.altitude = 0;
        this.speed = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.heading = 0;
        
        this.shield = 100;
        this.power = 100;
        this.hull = 100;
        
        this.init();
    }
    
    init() {
        // Start all systems
        this.updateTelemetry();
        this.updateNavigation();
        this.updateSystemStatus();
        this.generateRadarBlips();
        
        // Update intervals
        setInterval(() => this.updateTelemetry(), 100);
        setInterval(() => this.updateNavigation(), 500);
        setInterval(() => this.updateSystemStatus(), 2000);
        setInterval(() => this.updateRadarBlips(), 3000);
    }
    
    updateTelemetry() {
        // Simulate altitude changes
        this.altitude += (Math.random() - 0.5) * 50;
        this.altitude = Math.max(0, Math.min(50000, this.altitude));
        
        // Simulate speed changes
        this.speed += (Math.random() - 0.5) * 20;
        this.speed = Math.max(0, Math.min(2000, this.speed));
        
        // Update display
        document.getElementById('altitude').textContent = Math.round(this.altitude).toString().padStart(5, '0');
        document.getElementById('speed').textContent = Math.round(this.speed).toString().padStart(4, '0');
    }
    
    updateNavigation() {
        // Simulate coordinate changes
        this.latitude += (Math.random() - 0.5) * 0.01;
        this.longitude += (Math.random() - 0.5) * 0.01;
        this.heading += (Math.random() - 0.5) * 10;
        
        // Normalize heading
        this.heading = (this.heading + 360) % 360;
        
        // Update display
        document.getElementById('lat').textContent = this.latitude.toFixed(4) + '°';
        document.getElementById('lon').textContent = this.longitude.toFixed(4) + '°';
        
        // Update compass needle
        const compass = document.querySelector('.compass-needle');
        compass.style.setProperty('--rotation', `${this.heading}deg`);
    }
    
    updateSystemStatus() {
        // Simulate system drain and recharge
        const drainShield = Math.random() > 0.5;
        const drainPower = Math.random() > 0.6;
        const drainHull = Math.random() > 0.8;
        
        if (drainShield) {
            this.shield = Math.max(0, this.shield - Math.random() * 30);
        } else {
            this.shield = Math.min(100, this.shield + Math.random() * 15);
        }
        
        if (drainPower) {
            this.power = Math.max(0, this.power - Math.random() * 25);
        } else {
            this.power = Math.min(100, this.power + Math.random() * 20);
        }
        
        if (drainHull) {
            this.hull = Math.max(0, this.hull - Math.random() * 10);
        } else {
            this.hull = Math.min(100, this.hull + Math.random() * 5);
        }
        
        // Update bars
        this.updateBar('shield', this.shield);
        this.updateBar('power', this.power);
        this.updateBar('hull', this.hull);
    }
    
    updateBar(type, value) {
        const bar = document.getElementById(`${type}-bar`);
        const valueDisplay = document.getElementById(`${type}-value`);
        
        bar.style.width = `${value}%`;
        valueDisplay.textContent = `${Math.round(value)}%`;
        
        // Change color based on value
        if (value < 30) {
            bar.style.filter = 'hue-rotate(120deg)';
            valueDisplay.style.color = '#ff4444';
        } else if (value < 60) {
            bar.style.filter = 'hue-rotate(60deg)';
            valueDisplay.style.color = '#ffaa44';
        } else {
            bar.style.filter = 'hue-rotate(0deg)';
            valueDisplay.style.color = '#0ff';
        }
    }
    
    generateRadarBlips() {
        const radarBlips = document.querySelector('.radar-blips');
        radarBlips.innerHTML = '';
        
        // Generate 3-7 random blips
        const blipCount = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < blipCount; i++) {
            const blip = document.createElement('div');
            blip.className = 'radar-blip';
            
            // Random position within radar circle
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 10; // 10-70px from center
            
            const x = 50 + Math.cos(angle) * distance;
            const y = 50 + Math.sin(angle) * distance;
            
            blip.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: 4px;
                height: 4px;
                background: #0ff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px #0ff;
                animation: blipPulse 1.5s ease-in-out infinite;
            `;
            
            // Random animation delay
            blip.style.animationDelay = `${Math.random() * 1.5}s`;
            
            radarBlips.appendChild(blip);
        }
    }
    
    updateRadarBlips() {
        this.generateRadarBlips();
    }
}

// Add blip pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blipPulse {
        0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Initialize HUD System
const hud = new HUDSystem();

// Target lock simulation
let targetLocked = false;
setInterval(() => {
    targetLocked = !targetLocked;
    const targetStatus = document.querySelector('.target-status');
    
    if (targetLocked) {
        targetStatus.textContent = 'TARGET LOCKED';
        targetStatus.style.color = '#f00';
        document.querySelector('.target-lock').style.borderColor = '#f00';
    } else {
        targetStatus.textContent = 'SCANNING...';
        targetStatus.style.color = '#0ff';
        document.querySelector('.target-lock').style.borderColor = '#0ff';
    }
}, 4000);

console.log('HUD System initialized successfully');


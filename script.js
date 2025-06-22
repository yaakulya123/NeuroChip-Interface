// Comprehensive hardcoded data for the NeuroHeal system
const patients = [
    {
        id: 1,
        name: 'Marcus Rivera',
        age: 28,
        condition: 'Combat PTSD',
        severity: 'Critical',
        status: 'Scheduled',
        lastScan: '2047-01-15',
        traumaScore: 89,
        alerts: ['High-risk PTSD episode detected', 'Amygdala hyperactivity 94%'],
        memories: [
            { id: 1, event: 'IED Explosion - Kandahar', date: '2046-03-15', intensity: 95, targeted: true },
            { id: 2, event: 'Loss of Unit Members', date: '2046-03-15', intensity: 98, targeted: true },
            { id: 3, event: 'Combat Engagement', date: '2046-02-28', intensity: 78, targeted: false }
        ]
    },
    {
        id: 2,
        name: 'Elena Vasquez',
        age: 34,
        condition: 'Vehicular Trauma',
        severity: 'High',
        status: 'In Progress',
        lastScan: '2047-01-18',
        traumaScore: 72,
        alerts: ['Mild anxiety spike', 'Session scheduled tomorrow'],
        memories: [
            { id: 4, event: 'Highway Collision', date: '2046-09-12', intensity: 87, targeted: true },
            { id: 5, event: 'Hospital Recovery', date: '2046-09-13', intensity: 45, targeted: false }
        ]
    },
    {
        id: 3,
        name: 'David Kim',
        age: 41,
        condition: 'Assault Recovery',
        severity: 'Moderate',
        status: 'Monitoring',
        lastScan: '2047-01-20',
        traumaScore: 58,
        alerts: [],
        memories: [
            { id: 6, event: 'Physical Assault', date: '2046-11-08', intensity: 71, targeted: true }
        ]
    },
    {
        id: 4,
        name: 'Sarah Mitchell',
        age: 26,
        condition: 'Workplace Incident',
        severity: 'Low',
        status: 'Evaluation',
        lastScan: '2047-01-22',
        traumaScore: 34,
        alerts: ['Initial assessment complete'],
        memories: []
    },
    {
        id: 5,
        name: 'James Thompson',
        age: 39,
        condition: 'Natural Disaster Trauma',
        severity: 'High',
        status: 'Post-Procedure',
        lastScan: '2047-01-14',
        traumaScore: 28,
        alerts: ['Recovery progressing well', 'Follow-up in 3 days'],
        memories: [
            { id: 7, event: 'Earthquake Survival', date: '2046-05-15', intensity: 15, targeted: true }
        ]
    }
];

const procedures = [
    { patient: 'Marcus Rivera', time: '09:00', type: 'Neural Mapping', room: 'NeuroSuite A' },
    { patient: 'Elena Vasquez', time: '11:30', type: 'Memory Intervention', room: 'NeuroSuite B' },
    { patient: 'David Kim', time: '14:00', type: 'Progress Assessment', room: 'Evaluation Room 1' },
    { patient: 'Sarah Mitchell', time: '16:30', type: 'Initial Consultation', room: 'Consultation Room' }
];

const therapyNotes = [
    { date: '2047-01-22', patient: 'Marcus Rivera', note: 'Patient showing improved sleep patterns. Nightmares reduced from daily to 2-3 times per week. Appetite returning to normal.' },
    { date: '2047-01-21', patient: 'Elena Vasquez', note: 'Driving anxiety significantly decreased. Patient successfully completed 30-minute highway drive without panic response.' },
    { date: '2047-01-20', patient: 'David Kim', note: 'Social interactions improving. Patient attended group therapy session and showed positive engagement.' },
    { date: '2047-01-19', patient: 'James Thompson', note: 'Remarkable progress post-intervention. No trauma triggers detected in controlled environment testing.' }
];

const sideEffects = [
    { patient: 'Marcus Rivera', effect: 'Mild headache', severity: 'Low', duration: '2-3 hours post-procedure' },
    { patient: 'Elena Vasquez', effect: 'Temporary disorientation', severity: 'Low', duration: '30 minutes' },
    { patient: 'David Kim', effect: 'None reported', severity: 'None', duration: 'N/A' }
];

// Authentication system
function authenticate() {
    const doctorId = document.getElementById('doctor-id').value;
    const securityCode = document.getElementById('security-code').value;
    
    if (doctorId === 'DR001' && securityCode === 'NEURAL2047') {
        document.getElementById('login-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
        initializeSystem();
    } else {
        alert('Invalid credentials. Try DR001 / NEURAL2047');
    }
}

function logout() {
    document.getElementById('login-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Navigation system
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetSection) {
                    section.classList.add('active-section');
                }
            });
            
            // Initialize section-specific content
            if (targetSection === 'memory-mapping') initializeMemoryMapping();
            if (targetSection === 'procedure-planning') initializeProcedurePlanning();
            if (targetSection === 'progress-tracking') initializeProgressTracking();
        });
    });
}

// Dashboard population
function populateDashboard() {
    populatePatientList();
    populateAlerts();
    populateTodaysProcedures();
}

function populatePatientList() {
    const patientList = document.getElementById('patient-list');
    patientList.innerHTML = '';
    
    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.className = 'patient-card';
        patientCard.innerHTML = `
            <div class="patient-header">
                <strong>${patient.name}</strong>
                <span class="severity-badge ${patient.severity.toLowerCase()}">${patient.severity}</span>
            </div>
            <div class="patient-details">
                <div>Age: ${patient.age} | ${patient.condition}</div>
                <div>Status: ${patient.status}</div>
                <div>Trauma Score: ${patient.traumaScore}%</div>
                <div>Last Scan: ${patient.lastScan}</div>
            </div>
        `;
        patientList.appendChild(patientCard);
    });
}

function populateAlerts() {
    const alertsList = document.getElementById('monitoring-alerts');
    alertsList.innerHTML = '';
    
    patients.forEach(patient => {
        patient.alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            alertItem.innerHTML = `
                <div class="alert-header">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>${patient.name}</strong>
                </div>
                <div class="alert-message">${alert}</div>
                <div class="alert-time">2 min ago</div>
            `;
            alertsList.appendChild(alertItem);
        });
    });
}

function populateTodaysProcedures() {
    const proceduresList = document.getElementById('todays-procedures');
    proceduresList.innerHTML = '';
    
    procedures.forEach(procedure => {
        const procedureItem = document.createElement('div');
        procedureItem.className = 'procedure-item';
        procedureItem.innerHTML = `
            <div class="procedure-time">${procedure.time}</div>
            <div class="procedure-details">
                <strong>${procedure.patient}</strong>
                <div>${procedure.type}</div>
                <div class="room">${procedure.room}</div>
            </div>
        `;
        proceduresList.appendChild(procedureItem);
    });
}

// Memory mapping
function initializeMemoryMapping() {
    populateMemoryTimeline();
    drawNeuralPathways();
    populateRiskAssessment();
}

function populateMemoryTimeline() {
    const timeline = document.getElementById('memory-timeline');
    const currentPatient = patients[0]; // Marcus Rivera
    
    timeline.innerHTML = '';
    currentPatient.memories.forEach((memory, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-marker ${memory.targeted ? 'targeted' : 'safe'}"></div>
            <div class="timeline-content">
                <h4>${memory.event}</h4>
                <p>Date: ${memory.date}</p>
                <p>Trauma Intensity: ${memory.intensity}%</p>
                <p>Status: ${memory.targeted ? 'Targeted for Intervention' : 'Preserved'}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

function drawNeuralPathways() {
    const canvas = document.getElementById('neural-pathways');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw network nodes
    const nodes = [
        { x: 100, y: 50, label: 'Trigger A', active: true },
        { x: 200, y: 80, label: 'Memory B', active: true },
        { x: 300, y: 60, label: 'Response C', active: false },
        { x: 150, y: 150, label: 'Emotion D', active: true },
        { x: 250, y: 180, label: 'Behavior E', active: false },
        { x: 350, y: 200, label: 'Recovery F', active: true }
    ];
    
    // Draw connections
    const connections = [
        [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [0, 3]
    ];
    
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 2;
    connections.forEach(([start, end]) => {
        const startNode = nodes[start];
        const endNode = nodes[end];
        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);
        ctx.lineTo(endNode.x, endNode.y);
        ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach(node => {
        ctx.fillStyle = node.active ? '#f44336' : '#4caf50';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.font = '10px Segoe UI';
        ctx.fillText(node.label, node.x - 20, node.y + 30);
    });
}

function populateRiskAssessment() {
    const riskGrid = document.getElementById('risk-assessment');
    const risks = [
        { factor: 'Memory Intensity', level: 'High', score: 89 },
        { factor: 'Neural Connectivity', level: 'Critical', score: 94 },
        { factor: 'Emotional Response', level: 'High', score: 78 },
        { factor: 'Intervention Risk', level: 'Moderate', score: 45 },
        { factor: 'Recovery Probability', level: 'Good', score: 72 }
    ];
    
    riskGrid.innerHTML = '';
    risks.forEach(risk => {
        const riskItem = document.createElement('div');
        riskItem.className = 'risk-item';
        riskItem.innerHTML = `
            <div class="risk-factor">${risk.factor}</div>
            <div class="risk-level ${risk.level.toLowerCase()}">${risk.level}</div>
            <div class="risk-score">${risk.score}%</div>
        `;
        riskGrid.appendChild(riskItem);
    });
}

// Procedure planning
function initializeProcedurePlanning() {
    populateMemorySelection();
    populatePredictedOutcomes();
    setupProcedureControls();
}

function populateMemorySelection() {
    const memoryTargets = document.getElementById('memory-selection');
    const currentPatient = patients[0];
    
    memoryTargets.innerHTML = '';
    currentPatient.memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-target';
        memoryItem.innerHTML = `
            <label>
                <input type="checkbox" ${memory.targeted ? 'checked' : ''}>
                <div class="memory-info">
                    <strong>${memory.event}</strong>
                    <div>Intensity: ${memory.intensity}%</div>
                    <div>Date: ${memory.date}</div>
                </div>
            </label>
        `;
        memoryTargets.appendChild(memoryItem);
    });
}

function populatePredictedOutcomes() {
    const outcomes = document.getElementById('predicted-outcomes');
    outcomes.innerHTML = `
        <div class="outcome-metric">
            <div class="metric-label">Success Probability</div>
            <div class="metric-value success">87%</div>
        </div>
        <div class="outcome-metric">
            <div class="metric-label">Risk Level</div>
            <div class="metric-value warning">Moderate</div>
        </div>
        <div class="outcome-metric">
            <div class="metric-label">Recovery Time</div>
            <div class="metric-value info">3-6 weeks</div>
        </div>
        <div class="outcome-metric">
            <div class="metric-label">Side Effects</div>
            <div class="metric-value success">Minimal</div>
        </div>
    `;
}

function setupProcedureControls() {
    const intensitySlider = document.getElementById('intensity');
    const frequencySlider = document.getElementById('frequency');
    const durationSlider = document.getElementById('duration');
    
    if (intensitySlider) {
        intensitySlider.addEventListener('input', (e) => {
            document.querySelector('.intensity-value').textContent = `${e.target.value} Tesla`;
        });
    }
    
    if (frequencySlider) {
        frequencySlider.addEventListener('input', (e) => {
            document.querySelector('.frequency-value').textContent = `${e.target.value} Hz`;
        });
    }
    
    if (durationSlider) {
        durationSlider.addEventListener('input', (e) => {
            document.querySelector('.duration-value').textContent = `${e.target.value} minutes`;
        });
    }
}

// Documentation
function populateLegalDocumentation() {
    const legalDocs = document.getElementById('legal-disclaimers');
    legalDocs.innerHTML = `
        <div class="legal-document">
            <h4><i class="fas fa-file-alt"></i> Neural Intervention Consent Form</h4>
            <p>Patient acknowledges understanding of NeuroHeal memory intervention procedures, potential risks, and expected outcomes.</p>
        </div>
        <div class="legal-document">
            <h4><i class="fas fa-shield-alt"></i> Privacy & Data Protection Agreement</h4>
            <p>All neural data and personal information will be protected under federal healthcare privacy regulations.</p>
        </div>
        <div class="legal-document">
            <h4><i class="fas fa-exclamation-triangle"></i> Risk Disclosure Statement</h4>
            <p>Potential side effects include temporary disorientation, mild headaches, and rare instances of memory fragmentation.</p>
        </div>
    `;
}

// Progress tracking
function initializeProgressTracking() {
    populateTherapyNotes();
    populateSideEffects();
    populateSuccessMetrics();
    initializeRecoveryTimeline();
    populateKeyIndicators();
    populateRecoveryMilestones();
    drawComparisonChart();
}

function populateTherapyNotes() {
    const notesList = document.getElementById('therapy-notes');
    notesList.innerHTML = '';
    
    therapyNotes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'therapy-note';
        noteItem.innerHTML = `
            <div class="note-header">
                <strong>${note.patient}</strong>
                <span class="note-date">${note.date}</span>
            </div>
            <div class="note-content">${note.note}</div>
        `;
        notesList.appendChild(noteItem);
    });
}

function populateSideEffects() {
    const effectsGrid = document.getElementById('side-effects');
    effectsGrid.innerHTML = '';
    
    sideEffects.forEach(effect => {
        const effectItem = document.createElement('div');
        effectItem.className = 'side-effect-item';
        effectItem.innerHTML = `
            <div class="effect-patient">${effect.patient}</div>
            <div class="effect-type">${effect.effect}</div>
            <div class="effect-severity ${effect.severity.toLowerCase()}">${effect.severity}</div>
            <div class="effect-duration">${effect.duration}</div>
        `;
        effectsGrid.appendChild(effectItem);
    });
}

function populateSuccessMetrics() {
    const metrics = document.getElementById('success-metrics');
    metrics.innerHTML = `
        <div class="metric-card">
            <div class="metric-number">94%</div>
            <div class="metric-label">Overall Success Rate</div>
        </div>
        <div class="metric-card">
            <div class="metric-number">12</div>
            <div class="metric-label">Days Avg Recovery</div>
        </div>
        <div class="metric-card">
            <div class="metric-number">2.1%</div>
            <div class="metric-label">Complication Rate</div>
        </div>
        <div class="metric-card">
            <div class="metric-number">99.7%</div>
            <div class="metric-label">Patient Satisfaction</div>
        </div>
    `;
}

// Enhanced recovery timeline data
const recoveryData = {
    patients: {
        0: { // Marcus Rivera
            trauma: [89, 85, 78, 70, 62, 55, 48, 42, 38, 34, 30, 28],
            anxiety: [92, 88, 82, 75, 68, 61, 54, 47, 42, 38, 35, 32],
            sleep: [15, 25, 35, 45, 55, 65, 72, 78, 82, 85, 88, 90],
            social: [20, 28, 38, 48, 58, 65, 72, 78, 82, 85, 87, 89]
        },
        1: { // Elena Vasquez
            trauma: [72, 68, 62, 56, 50, 44, 38, 33, 29, 25, 22, 20],
            anxiety: [78, 74, 68, 61, 54, 47, 41, 36, 32, 28, 25, 23],
            sleep: [30, 40, 50, 60, 68, 75, 81, 85, 88, 90, 92, 93],
            social: [35, 45, 55, 63, 70, 76, 81, 85, 88, 90, 91, 92]
        },
        2: { // David Kim
            trauma: [58, 54, 49, 44, 39, 35, 31, 28, 25, 23, 21, 19],
            anxiety: [65, 61, 56, 51, 46, 41, 37, 33, 30, 27, 25, 23],
            sleep: [45, 52, 59, 66, 72, 77, 82, 86, 89, 91, 93, 94],
            social: [40, 48, 56, 63, 69, 74, 79, 83, 86, 89, 91, 92]
        },
        4: { // James Thompson (post-procedure)
            trauma: [28, 25, 23, 21, 19, 18, 17, 16, 15, 15, 14, 14],
            anxiety: [32, 29, 27, 25, 23, 21, 20, 19, 18, 17, 16, 16],
            sleep: [88, 89, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96],
            social: [85, 87, 88, 89, 90, 91, 92, 93, 94, 94, 95, 95]
        }
    },
    labels: ['Day 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12', 'Week 16', 'Week 20', 'Week 24']
};

function initializeRecoveryTimeline() {
    drawRecoveryChart('trauma', 'all');
    setupRecoveryControls();
}

function setupRecoveryControls() {
    // Patient selector
    const patientSelect = document.getElementById('recovery-patient-select');
    if (patientSelect) {
        patientSelect.addEventListener('change', (e) => {
            const currentView = document.querySelector('.timeline-btn.active').dataset.view;
            drawRecoveryChart(currentView, e.target.value);
        });
    }

    // Timeline view buttons
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    timelineBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timelineBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedPatient = document.getElementById('recovery-patient-select').value;
            drawRecoveryChart(btn.dataset.view, selectedPatient);
        });
    });
}

function drawRecoveryChart(metric, patientFilter) {
    const canvas = document.getElementById('recovery-timeline');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 60;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(100, 181, 246, 0.2)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
        const y = padding + (i * chartHeight / 10);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 11; i++) {
        const x = padding + (i * chartWidth / 11);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();
    
    // Draw target range (optimal values)
    const targetMin = metric === 'trauma' || metric === 'anxiety' ? 15 : 85;
    const targetMax = metric === 'trauma' || metric === 'anxiety' ? 25 : 95;
    
    ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    const targetMinY = padding + chartHeight - ((targetMin / 100) * chartHeight);
    const targetMaxY = padding + chartHeight - ((targetMax / 100) * chartHeight);
    ctx.fillRect(padding, targetMaxY, chartWidth, targetMinY - targetMaxY);
    
    // Draw data lines
    const colors = ['#f44336', '#4caf50', '#ff9800', '#9c27b0'];
    const patientIds = patientFilter === 'all' ? ['0', '1', '2', '4'] : [patientFilter];
    
    patientIds.forEach((patientId, index) => {
        if (!recoveryData.patients[patientId]) return;
        
        const data = recoveryData.patients[patientId][metric];
        const color = colors[index % colors.length];
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, dataIndex) => {
            const x = padding + (dataIndex * chartWidth / 11);
            const y = padding + chartHeight - ((value / 100) * chartHeight);
            
            if (dataIndex === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            // Draw data points
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        ctx.stroke();
    });
    
    // Add labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Segoe UI';
    
    // Y-axis labels
    for (let i = 0; i <= 10; i++) {
        const value = 100 - (i * 10);
        const y = padding + (i * chartHeight / 10);
        ctx.fillText(value.toString(), 20, y + 4);
    }
    
    // X-axis labels
    recoveryData.labels.forEach((label, index) => {
        const x = padding + (index * chartWidth / 11);
        ctx.save();
        ctx.translate(x, padding + chartHeight + 20);
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(label, 0, 0);
        ctx.restore();
    });
    
    // Chart title
    const metricTitles = {
        trauma: 'Trauma Score Over Time',
        anxiety: 'Anxiety Level Over Time',
        sleep: 'Sleep Quality Over Time',
        social: 'Social Function Over Time'
    };
    
    ctx.fillStyle = '#64b5f6';
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(metricTitles[metric], padding, 30);
    
    // Y-axis title
    ctx.save();
    ctx.translate(15, padding + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#bbb';
    ctx.font = '12px Segoe UI';
    ctx.fillText(metric === 'trauma' || metric === 'anxiety' ? 'Severity (%)' : 'Quality (%)', 0, 0);
    ctx.restore();
}

function populateKeyIndicators() {
    const indicatorsList = document.getElementById('key-indicators');
    if (!indicatorsList) return;
    
    const indicators = [
        { label: 'Average Recovery Rate', value: '94%', status: 'success' },
        { label: 'Treatment Effectiveness', value: '87%', status: 'success' },
        { label: 'Relapse Rate', value: '6%', status: 'warning' },
        { label: 'Patient Compliance', value: '96%', status: 'success' },
        { label: 'Side Effects', value: '8%', status: 'success' }
    ];
    
    indicatorsList.innerHTML = '';
    indicators.forEach(indicator => {
        const item = document.createElement('div');
        item.className = 'indicator-item';
        item.innerHTML = `
            <span class="indicator-label">${indicator.label}</span>
            <span class="indicator-value ${indicator.status}">${indicator.value}</span>
        `;
        indicatorsList.appendChild(item);
    });
}

function populateRecoveryMilestones() {
    const milestonesList = document.getElementById('recovery-milestones');
    if (!milestonesList) return;
    
    const milestones = [
        { text: 'Initial Assessment', status: 'completed', date: '2047-01-15', icon: '✓' },
        { text: 'Procedure Completed', status: 'completed', date: '2047-01-18', icon: '✓' },
        { text: '2-Week Follow-up', status: 'completed', date: '2047-02-01', icon: '✓' },
        { text: '6-Week Evaluation', status: 'current', date: '2047-03-01', icon: '→' },
        { text: '3-Month Review', status: 'pending', date: '2047-04-18', icon: '○' },
        { text: 'Final Assessment', status: 'pending', date: '2047-07-18', icon: '○' }
    ];
    
    milestonesList.innerHTML = '';
    milestones.forEach(milestone => {
        const item = document.createElement('div');
        item.className = 'milestone-item';
        item.innerHTML = `
            <div class="milestone-icon ${milestone.status}">${milestone.icon}</div>
            <span class="milestone-text">${milestone.text}</span>
            <span class="milestone-date">${milestone.date}</span>
        `;
        milestonesList.appendChild(item);
    });
}

function drawComparisonChart() {
    const canvas = document.getElementById('comparison-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const patientNames = ['Marcus', 'Elena', 'David', 'James'];
    const improvementRates = [68, 72, 67, 50]; // Percentage improvement
    const colors = ['#f44336', '#4caf50', '#ff9800', '#9c27b0'];
    
    const barWidth = 40;
    const barSpacing = 20;
    const chartHeight = 150;
    const startX = 30;
    const startY = 20;
    
    // Draw bars
    improvementRates.forEach((rate, index) => {
        const barHeight = (rate / 100) * chartHeight;
        const x = startX + (index * (barWidth + barSpacing));
        const y = startY + chartHeight - barHeight;
        
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Add percentage labels
        ctx.fillStyle = '#fff';
        ctx.font = '12px Segoe UI';
        ctx.fillText(`${rate}%`, x + 5, y - 5);
        
        // Add patient names
        ctx.save();
        ctx.translate(x + barWidth/2, startY + chartHeight + 15);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(patientNames[index], 0, 0);
        ctx.restore();
    });
    
    // Add title
    ctx.fillStyle = '#64b5f6';
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillText('Improvement Rates', 10, 10);
}

// Signature functionality
function clearSignature() {
    const canvas = document.getElementById('signature-pad');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function saveSignature() {
    const canvas = document.getElementById('signature-pad');
    if (canvas) {
        const dataURL = canvas.toDataURL();
        alert('Signature saved successfully!');
    }
}

// Digital signature capture
function initializeSignaturePad() {
    const signaturePad = document.getElementById('signature-pad');
    if (!signaturePad) return;
    
    let drawing = false;
    let lastX = 0, lastY = 0;
    const ctx = signaturePad.getContext('2d');
    ctx.strokeStyle = '#2d3e50';
    ctx.lineWidth = 2;
    
    signaturePad.addEventListener('mousedown', (e) => {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    signaturePad.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    signaturePad.addEventListener('mouseup', () => drawing = false);
    signaturePad.addEventListener('mouseleave', () => drawing = false);
}

// System initialization
function initializeSystem() {
    populateDashboard();
    initializeNavigation();
    initializeSignaturePad();
    populateLegalDocumentation();
}

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    // Auto-login for demo (remove in production)
    setTimeout(() => {
        if (document.getElementById('login-overlay').style.display !== 'none') {
            document.getElementById('doctor-id').value = 'DR001';
            document.getElementById('security-code').value = 'NEURAL2047';
        }
    }, 1000);
}); 

// --- Utility Functions & Data Model ---
function handleTeacherLogout() {
    customAlert('Teacher logging out... Thank you for using EcoLearn!');
    setTimeout(() => {
        window.location.href = 'student-dashboard.html'; 
    }, 1500);
}

let lessonsData = [
    { id: 1, title: 'Water Cycle & Hydrology', grade: 'Grade 8', activities: 3, status: 'published', views: 150, classes: 3, lastEdit: null },
    { id: 2, title: 'Global Climate Change Basics', grade: 'Grade 9', activities: 1, status: 'draft', views: 5, classes: 1, lastEdit: '2 days ago' },
    { id: 3, title: 'Biodiversity & Ecosystems (v1)', grade: 'Grade 7', activities: 2, status: 'archived', views: 200, classes: 5, lastEdit: null }
];

let userProfileData = {
    name: "New Teacher",
    role: "Teacher (Unregistered)",
    email: "email@example.com",
    phone: "N/A",
    address: "N/A",
    joined: "Today",
    profilePicUrl: "" // Field for optional profile picture URL
};

let activitiesData = [
    { id: 101, title: 'Water Cycle Simulation Lab', type: 'Simulation', status: 'open', submissions: 28, graded: 25, dueDate: '2025-10-15', relatedLesson: 'Water Cycle & Hydrology' },
    { id: 102, title: 'Local Pollution Photo Essay', type: 'Project', status: 'draft', submissions: 0, graded: 0, dueDate: '2025-11-01', relatedLesson: 'Pollution Sources' },
    { id: 103, title: 'Climate Change Impact Quiz', type: 'Quiz', status: 'closed', submissions: 30, graded: 30, dueDate: '2025-10-01', relatedLesson: 'Global Climate Change Basics' }
];

const analyticsData = {
    overallTrend: [75, 78, 80, 85, 82, 88], 
    overallTrendLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    activityAvgScore: 88.2,
    engagement: { totalUsers: 250, lessonEngagers: 250, activityParticipants: 155, signedIn: 200, anonymous: 50 },
    dailyEngagement: [15, 20, 18, 25, 30, 10, 5], 
    dailyEngagementLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weeklyAvgScore: [75, 78, 80, 85, 82, 88], 
    weeklyAvgScoreLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
    monthlyAvgScore: [72, 80, 85, 88, 90], 
    monthlyAvgScoreLabels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    studentRecords: [
        { id: 'S1001', name: 'A. Johnson', type: 'Signed-In', totalScore: 92, lastActivity: 'Water Cycle Quiz', activityCount: 7, scores: [{name: 'Quiz 1', score: 95}, {name: 'Essay', score: 88}] },
        { id: 'S1002', name: 'M. Chen', type: 'Signed-In', totalScore: 88, lastActivity: 'Pollution Essay', activityCount: 5, scores: [{name: 'Quiz 1', score: 85}, {name: 'Essay', score: 90}] },
        { id: 'A2045', name: 'Anonymous User A', type: 'Anonymous', totalScore: 95, lastActivity: 'Climate Change Quiz', activityCount: 1, scores: [{name: 'CC Quiz', score: 95}] },
        { id: 'S1003', name: 'L. Patel', type: 'Signed-In', totalScore: 79, lastActivity: 'Biodiversity Lab', activityCount: 8, scores: [{name: 'Quiz 1', score: 75}, {name: 'Lab Report', score: 83}] },
        { id: 'A9182', name: 'Anonymous User B', type: 'Anonymous', totalScore: 81, lastActivity: 'Water Cycle Quiz', activityCount: 1, scores: [{name: 'WC Quiz', score: 81}] },
    ]
};

function customAlert(message) {
    console.log("Action triggered: " + message);
    const alertBox = document.createElement('div');
    alertBox.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #fff; border: 2px solid var(--primary-color); border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 5000;';
    alertBox.innerHTML = `<strong>Action Alert</strong><p style="margin-top: 10px;">${message}</p><button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 5px 10px; background: var(--secondary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>`;
    document.body.appendChild(alertBox);
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
    }
}

// --- UPDATED PROFILE MODAL FUNCTIONS ---
window.openEditModal = function() {
    // Populate modal inputs with current data before opening
    document.getElementById('editName').value = userProfileData.name;
    document.getElementById('editRole').value = userProfileData.role;
    document.getElementById('editEmail').value = userProfileData.email;
    document.getElementById('editPhone').value = userProfileData.phone;
    document.getElementById('editAddress').value = userProfileData.address;
    
    // NEW: Include the Profile Picture URL field
    const editProfilePicUrlEl = document.getElementById('editProfilePicUrl');
    if(editProfilePicUrlEl) editProfilePicUrlEl.value = userProfileData.profilePicUrl;

    const editModalEl = document.getElementById('editModal');
    if (editModalEl) editModalEl.classList.add('active');
}

window.closeEditModal = function() {
    const editModalEl = document.getElementById('editModal');
    if (editModalEl) editModalEl.classList.remove('active');
}

window.saveProfile = function() {
  // 1. Capture new values, using fallback defaults
  const name = document.getElementById('editName').value.trim() || "New Teacher";
  const role = document.getElementById('editRole').value.trim() || "Teacher";
  const email = document.getElementById('editEmail').value.trim() || "N/A";
  const phone = document.getElementById('editPhone').value.trim() || "N/A";
  const address = document.getElementById('editAddress').value.trim() || "N/A";
  const profilePicUrl = document.getElementById('editProfilePicUrl').value.trim();

  // 2. Update the dynamic data model
  userProfileData.name = name;
  userProfileData.role = role;
  userProfileData.email = email;
  userProfileData.phone = phone;
  userProfileData.address = address;
  userProfileData.profilePicUrl = profilePicUrl; // Save the URL

  // 3. Re-render the UI content
  loadContent('profile');
  
  customAlert(`Profile updated for ${name}.`);
  closeEditModal();
}


// --- NEW SETTINGS FUNCTIONS (from settings.html) ---
window.saveSettings = function() {
    const settings = {
        dashboardView: document.getElementById("dashboardView")?.value || "Grid",
        notificationsToggle: document.getElementById("notificationsToggle")?.classList.contains("active"),
        darkModeToggle: document.getElementById("darkModeToggle")?.classList.contains("active"),
        autoSaveToggle: document.getElementById("autoSaveToggle")?.classList.contains("active"),
        feedbackToggle: document.getElementById("feedbackToggle")?.classList.contains("active")
    };

    localStorage.setItem("userSettings", JSON.stringify(settings));
    customAlert("Settings saved successfully!");
}

// --- LESSON FUNCTIONS ---
function renderLessons(filterStatus = 'all') {
    const lessonGrid = document.getElementById('lessonGrid');
    if (!lessonGrid) return; 

    const filteredLessons = lessonsData.filter(lesson => {
        if (filterStatus === 'all') return true;
        return lesson.status === filterStatus;
    });

    let lessonHtml = '';

    if (filteredLessons.length === 0) {
        lessonHtml = '<p style="text-align: center; padding: 50px; color: #7f8c8d;">No lessons found matching the current filter criteria.</p>';
    } else {
        filteredLessons.forEach(lesson => {
            let actions = '';
            let statusBadgeClass = '';
            let statusText = '';
            
            if (lesson.status === 'published') {
                statusBadgeClass = 'published';
                statusText = 'Published';
                actions = `
                    <button class="action-small-btn edit-btn" onclick="editLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-small-btn view-btn" onclick="viewLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-book-open"></i> Preview</button>
                    <button class="action-small-btn qr-btn" onclick="generateQRCode(${lesson.id}, 'lesson', '${lesson.title}')"><i class="fas fa-qrcode"></i> Get QR</button>
                    <button class="action-small-btn delete-btn" onclick="deleteLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-trash-alt"></i> Delete</button>
                `;
            } else if (lesson.status === 'draft') {
                statusBadgeClass = 'draft';
                statusText = 'Draft';
                actions = `
                    <button class="action-small-btn edit-btn" onclick="editLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-edit"></i> Continue Editing</button>
                    <button class="action-small-btn publish-btn" onclick="customAlert('Attempting to publish ${lesson.title}.')"><i class="fas fa-upload"></i> Publish</button>
                    <button class="action-small-btn delete-btn" onclick="deleteLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-trash-alt"></i> Delete</button>
                `;
            } else if (lesson.status === 'archived') {
                statusBadgeClass = 'archived';
                statusText = 'Archived';
                actions = `
                    <button class="action-small-btn archive-btn" onclick="restoreLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-sync-alt"></i> Restore</button>
                    <button class="action-small-btn delete-btn" onclick="deleteLesson(${lesson.id}, '${lesson.title}')"><i class="fas fa-trash-alt"></i> Delete</button>
                `;
            }

            lessonHtml += `
                <div class="lesson-card status-${lesson.status}">
                    <div class="lesson-header-status">
                        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
                        <i class="fas fa-ellipsis-v action-icon" onclick="customAlert('Options for ${lesson.title} lesson.')"></i>
                    </div>
                    <h4>${lesson.title}</h4>
                    <p class="topic-detail">Grade Level: ${lesson.grade} | Activity Count: ${lesson.activities}</p>
                    <div class="lesson-metrics">
                        <span><i class="fas fa-eye"></i> ${lesson.views} Views</span>
                        <span><i class="fas fa-users"></i> ${lesson.classes} Classes</span>
                    </div>
                    ${actions}
                </div>
            `;
        });
    }

    lessonHtml += `
        <div class="lesson-card status-new">
            <div class="lesson-placeholder" onclick="initLessonCreation()">
                <i class="fas fa-layer-group"></i>
                <h4>Start from Template</h4>
                <p>Use a structured template to speed up creation.</p>
            </div>
        </div>
    `;

    lessonGrid.innerHTML = lessonHtml;
}

function filterLessons() {
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        renderLessons(statusFilter.value);
        customAlert(`Filtering lessons by status: ${statusFilter.value}`);
    }
}

function initLessonCreation() {
    showModal('createLessonModal');
    
    const form = document.getElementById('newLessonForm');
    form.onsubmit = function(event) {
        event.preventDefault();

        let nextId = lessonsData.length > 0 ? Math.max(...lessonsData.map(l => l.id)) + 1 : 1;
        const title = document.getElementById('lessonTitle').value;
        const bgType = document.querySelector('input[name="bgType"]:checked').value;
        
        const newLesson = {
            id: nextId,
            title: title,
            grade: 'N/A', 
            activities: 0,
            status: 'draft', 
            views: 0,
            classes: 0,
            lastEdit: 'just now',
            bgType: bgType
        };

        lessonsData.push(newLesson);

        hideModal('createLessonModal');
        editLesson(nextId, title);
        
        renderLessons(document.getElementById('statusFilter')?.value || 'all');
        form.reset();
    };
}

function editLesson(lessonId, title) {
    document.getElementById('editorTitle').textContent = `Editor: ${title} (ID: ${lessonId})`;
    customAlert(`Opening editor for Lesson ID ${lessonId}: "${title}"`);
    showModal('lessonEditorModal');
}

function viewLesson(lessonId, title) {
    document.getElementById('slideshowTitle').textContent = `Viewing Lesson: ${title}`;
    customAlert(`Launching slideshow viewer for lesson ID: ${lessonId}.`);
    showModal('lessonViewerModal');
}

// --- ACTIVITY FUNCTIONS ---
function renderActivities(filterType = 'all', filterStatus = 'all') {
    const activityGrid = document.getElementById('activityGrid');
    if (!activityGrid) return;

    const filteredActivities = activitiesData.filter(activity => {
        const statusMatch = (filterStatus === 'all' || activity.status === filterStatus);
        const typeMatch = (filterType === 'all' || activity.type === filterType);
        return statusMatch && typeMatch;
    });

    let activityHtml = '';
    let pendingCount = 0;

    if (filteredActivities.length === 0) {
        activityHtml = '<p style="text-align: center; padding: 50px; color: #7f8c8d;">No activities found matching the current filter criteria.</p>';
    } else {
        filteredActivities.forEach(activity => {
            const pendingGrades = activity.submissions - activity.graded;
            if (activity.status === 'closed' && pendingGrades > 0) {
                pendingCount += pendingGrades;
            }
            
            let statusBadgeClass = activity.status;
            let statusText = activity.status.charAt(0).toUpperCase() + activity.status.slice(1);
            
            let actions = '';

            if (activity.status === 'open') {
                actions = `
                    <button class="action-small-btn view-btn" onclick="gradeActivity(${activity.id}, '${activity.title}')"><i class="fas fa-eye"></i> View Submissions</button>
                    <button class="action-small-btn qr-btn" onclick="generateQRCode(${activity.id}, 'activity', '${activity.title}')"><i class="fas fa-qrcode"></i> Get QR</button>
                    <button class="action-small-btn edit-btn" onclick="editActivity(${activity.id}, '${activity.title}')"><i class="fas fa-edit"></i> Edit Settings</button>
                    <button class="action-small-btn delete-btn" onclick="deleteActivity(${activity.id}, '${activity.title}')"><i class="fas fa-trash-alt"></i> Delete</button>
                `;
            } else if (activity.status === 'draft') {
                 actions = `
                    <button class="action-small-btn edit-btn" onclick="editActivity(${activity.id}, '${activity.title}')"><i class="fas fa-edit"></i> Configure</button>
                    <button class="action-small-btn publish-btn" onclick="customAlert('Publishing Activity ${activity.id}.')"><i class="fas fa-upload"></i> Publish</button>
                    <button class="action-small-btn delete-btn" onclick="deleteActivity(${activity.id}, '${activity.title}')"><i class="fas fa-trash-alt"></i> Delete</button>
                 `;
            } else if (activity.status === 'closed') {
                actions = `
                    <button class="action-small-btn archive-btn" onclick="gradeActivity(${activity.id}, '${activity.title}')"><i class="fas fa-clipboard-check"></i> Grade (${pendingGrades})</button>
                    <button class="action-small-btn qr-btn" onclick="generateQRCode(${activity.id}, 'activity', '${activity.title}')"><i class="fas fa-qrcode"></i> Get QR</button>
                    <button class="action-small-btn delete-btn" onclick="deleteActivity(${activity.id}, '${activity.title}')"><i class="fas fa-trash-alt"></i> Delete/Archive</button>
                `;
            }

            activityHtml += `
                <div class="lesson-card status-${activity.status}">
                    <div class="lesson-header-status">
                        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
                        <i class="fas fa-ellipsis-v action-icon" onclick="customAlert('Options for ${activity.title} activity.')"></i>
                    </div>
                    <h4>${activity.title}</h4>
                    <p class="topic-detail">Type: <strong>${activity.type}</strong> | Lesson: ${activity.relatedLesson}</p>
                    <div class="lesson-metrics">
                        <span><i class="fas fa-calendar-alt"></i> Due: ${activity.dueDate}</span>
                        <span><i class="fas fa-inbox"></i> Submissions: ${activity.submissions} / Graded: ${activity.graded}</span>
                    </div>
                    ${actions}
                </div>
            `;
        });
    }
    
    // Add template card
    activityHtml += `
        <div class="lesson-card status-new">
            <div class="lesson-placeholder" onclick="initActivityCreation()">
                <i class="fas fa-seedling"></i>
                <h4>Create New Activity</h4>
                <p>Build a quiz, project, or simulation exercise.</p>
            </div>
        </div>
    `;

    activityGrid.innerHTML = activityHtml;

    const pendingGradesEl = document.getElementById('pendingGradesCount');
    if (pendingGradesEl) {
         const totalPending = activitiesData.reduce((sum, activity) => {
             return activity.status === 'closed' ? sum + (activity.submissions - activity.graded) : sum;
         }, 0);
        pendingGradesEl.textContent = totalPending;
    }
}

function initActivityCreation() {
    showModal('createActivityModal');
    
    const form = document.getElementById('newActivityForm');
    form.onsubmit = function(event) {
        event.preventDefault();
        
        let nextId = activitiesData.length > 0 ? Math.max(...activitiesData.map(a => a.id)) + 1 : 101;
        
        const title = document.getElementById('activityTitle').value;
        const type = document.getElementById('activityType').value;
        const isNoDueDate = document.getElementById('noDueDate').checked;
        const dueDate = isNoDueDate ? 'N/A' : document.getElementById('activityDueDate').value;

        const newActivity = {
            id: nextId,
            title: title,
            type: type,
            status: 'draft',
            submissions: 0,
            graded: 0,
            dueDate: dueDate,
            relatedLesson: 'Unlinked'
        };

        activitiesData.push(newActivity);

        hideModal('createActivityModal');
        editActivity(nextId, title);
        
        renderActivities(document.getElementById('activityTypeFilter')?.value || 'all', document.getElementById('activityStatusFilter')?.value || 'all');
        form.reset();
        document.getElementById('activityDueDate').disabled = false; 
        document.getElementById('noDueDate').checked = false;
    };
}

function editActivity(activityId, title) {
    document.getElementById('configuratorTitle').textContent = `Configurator: ${title} (ID: ${activityId})`;
    customAlert(`Opening configurator for Activity ID ${activityId}: "${title}"`);
    showModal('activityConfiguratorModal');
}

function filterActivities() {
    const typeFilter = document.getElementById('activityTypeFilter').value;
    const statusFilter = document.getElementById('activityStatusFilter').value;
    renderActivities(typeFilter, statusFilter);
    customAlert(`Filtering activities by Type: ${typeFilter} and Status: ${statusFilter}`);
}

// --- QR CODE FUNCTIONS ---
let qrCodeInstance = null;
function generateQRCode(resourceId, type, title) {
    const qrCanvasDiv = document.getElementById('qrCodeCanvas');
    document.getElementById('qrTitle').textContent = `QR Code for: ${title}`;
    const qrDataUrl = `https://ecolearn.com/public/view?type=${type}&id=${resourceId}`;
    qrCanvasDiv.innerHTML = ''; 
    qrCodeInstance = new QRCode(qrCanvasDiv, {
        text: qrDataUrl,
        width: 256,
        height: 256,
        colorDark : "#34495e",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    customAlert(`Generated QR code for ${title} pointing to: ${qrDataUrl}`);
    showModal('qrGeneratorModal');
}

// --- ANALYTICS FUNCTIONS ---
let analyticsChartInstances = {};
let trendChartInstance = null; 

function drawLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;

    const sortedStudents = [...analyticsData.studentRecords].sort((a, b) => b.totalScore - a.totalScore);

    let listHtml = '';
    sortedStudents.forEach((student, index) => {
        const avatarChar = student.name.charAt(0).toUpperCase();
        const rank = index + 1;
        
        listHtml += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight: 700; color: var(--secondary-color); width: 20px;">#${rank}</span>
                    <div class="student-avatar ${student.type === 'Anonymous' ? 'anonymous' : ''}" style="width: 35px; height: 35px; font-size: 1rem;">
                        ${avatarChar}
                    </div>
                    <div style="font-weight: 600;">
                        ${student.name}
                        <span style="display: block; font-size: 0.75rem; color: #7f8c8d;">${student.type} | ID: ${student.id}</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 700; color: var(--text-color);">${student.totalScore}%</span>
                    <button onclick="viewStudentRecords('${student.id}')" style="background: var(--secondary-color); color: white; border: none; border-radius: 4px; padding: 5px 10px; font-size: 0.7rem; cursor: pointer;">
                        <i class="fas fa-file-alt"></i> View Record
                    </button>
                </div>
            </div>
        `;
    });

    leaderboardList.innerHTML = listHtml;
}

function viewStudentRecords(studentId) {
    const student = analyticsData.studentRecords.find(s => s.id === studentId);
    if (!student) {
        customAlert(`Error: Student ID ${studentId} not found.`);
        return;
    }

    document.getElementById('studentRecordName').textContent = student.name;
    document.getElementById('studentRecordId').textContent = `ID: ${student.id}`;
    document.getElementById('studentRecordType').textContent = `Type: ${student.type}`;
    document.getElementById('studentRecordScore').textContent = `Total Avg Score: ${student.totalScore}%`;

    const avatarEl = document.getElementById('studentAvatar');
    avatarEl.textContent = student.name.charAt(0).toUpperCase();
    
    avatarEl.classList.remove('anonymous');
    if (student.type === 'Anonymous') {
        avatarEl.classList.add('anonymous');
    }

    const scoreHistoryEl = document.getElementById('scoreHistory');
    let historyHtml = '';
    
    if (student.scores && student.scores.length > 0) {
        student.scores.forEach(score => {
            const scoreColor = score.score >= 80 ? 'var(--primary-color)' : (score.score >= 70 ? '#e67e22' : '#e74c3c');
            historyHtml += `
                <div class="score-detail">
                    <span><i class="fas fa-list-alt" style="margin-right: 5px; color: #7f8c8d;"></i> ${score.name}</span>
                    <span style="font-weight: 700; color: ${scoreColor};">${score.score}%</span>
                </div>
            `;
        });
    } else {
        historyHtml = '<p style="color: #7f8c8d; text-align: center; padding: 15px;">No detailed history available for this dummy user.</p>';
    }
    scoreHistoryEl.innerHTML = historyHtml;

    showModal('studentRecordsModal');
}

function updateTrendChart(timeframe) {
    const ctx = document.getElementById('combinedTrendChart');
    if (!ctx) return;

    if (trendChartInstance) {
        trendChartInstance.destroy();
    }

    let data, labels, chartType, title, color, yAxisMax;

    if (timeframe === 'daily') {
        data = analyticsData.dailyEngagement;
        labels = analyticsData.dailyEngagementLabels;
        chartType = 'bar';
        title = 'Total Platform Accesses';
        color = 'rgba(52, 152, 219, 0.7)';
        yAxisMax = 35;
    } else if (timeframe === 'weekly') {
        data = analyticsData.weeklyAvgScore;
        labels = analyticsData.weeklyAvgScoreLabels;
        chartType = 'line';
        title = 'Weekly Average Score (%)';
        color = 'var(--primary-color)';
        yAxisMax = 100;
    } else { // monthly
        data = analyticsData.monthlyAvgScore;
        labels = analyticsData.monthlyAvgScoreLabels;
        chartType = 'bar';
        title = 'Monthly Average Score (%)';
        color = 'rgba(155, 89, 182, 0.7)';
        yAxisMax = 100;
    }

    trendChartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: chartType === 'line' ? color : 'transparent',
                backgroundColor: chartType === 'line' ? 'rgba(46, 204, 113, 0.2)' : color,
                fill: chartType === 'line',
                tension: chartType === 'line' ? 0.4 : 0,
                pointBackgroundColor: chartType === 'line' ? color : 'transparent',
                borderWidth: chartType === 'bar' ? 1 : 2,
                borderRadius: chartType === 'bar' ? 4 : 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yAxisMax,
                    title: { display: true, text: (timeframe === 'daily') ? 'Accesses' : 'Score (%)' }
                }
            }
        }
    });
    analyticsChartInstances.combinedTrend = trendChartInstance;
}

function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (analyticsChartInstances.dashboardChart) {
        analyticsChartInstances.dashboardChart.destroy();
    }

    if (ctx) {
        analyticsChartInstances.dashboardChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Water Cycle', 'Bio Diversity', 'Climate Change', 'Sustainability', 'Pollution'],
                datasets: [{
                    label: 'Class Average Score (%)',
                    data: [85, 72, 90, 78, 88], 
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.7)', 
                        'rgba(52, 152, 219, 0.7)', 
                        'rgba(241, 196, 15, 0.7)', 
                        'rgba(230, 126, 34, 0.7)', 
                        'rgba(155, 89, 182, 0.7)'  
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(230, 126, 34, 1)',
                        'rgba(155, 89, 182, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Score (%)'
                        },
                        grid: { color: '#ecf0f1' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }
}

function setActiveNavItem(section) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.nav-item.${section}`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function drawAnalyticsDashboard() {
    drawLeaderboard();
    updateTrendChart('daily');
    
    const ctx = document.getElementById('userTypeDonutChart');
    if (analyticsChartInstances.donutChart) {
        analyticsChartInstances.donutChart.destroy();
    }
    if (ctx) {
        analyticsChartInstances.donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Signed-In Students', 'Anonymous QR Users'],
                datasets: [{
                    data: [analyticsData.engagement.signedIn, analyticsData.engagement.anonymous], 
                    backgroundColor: ['var(--secondary-color)', '#7f8c8d'], 
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { position: 'bottom' },
                    title: { display: false }
                }
            }
        });
    }

    document.getElementById('analytic-activity-score').textContent = `${analyticsData.activityAvgScore}%`;
    document.getElementById('analytic-lesson-engagement').textContent = analyticsData.engagement.lessonEngagers;
    document.getElementById('analytic-activity-engagement').textContent = analyticsData.engagement.activityParticipants;
}

// --- MAIN CONTENT LOADER ---
function loadContent(section) {
  const content = document.getElementById('content');
  let html = '';
  
  setActiveNavItem(section);

  switch(section) {
    case 'dashboard':
        html = `
            <h2>Welcome Back, Educator!</h2>
            <p class="subtitle">A quick summary of your class and platform activity. All data tiles and charts will be dynamically updated by your backend.</p>
            
            <!-- 1. Quick Stats Grid -->
            <div class="dashboard-grid">
                <div class="stat-card">
                    <i class="fas fa-users" style="color: var(--secondary-color);"></i>
                    <div class="value" id="stat-students">--</div>
                    <div class="label">Total Enrolled Students</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book-reader" style="color: var(--primary-color);"></i>
                    <div class="value" id="stat-lessons">-- / --</div>
                    <div class="label">Lessons Completed (Class Avg)</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-percent" style="color: #e67e22;"></i>
                    <div class="value" id="stat-avg-score">--%</div>
                    <div class="label">Average Quiz Score</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-hourglass-half" style="color: #9b59b6;"></i>
                    <div class="value" id="stat-pending-grading">--</div>
                    <div class="label">Pending Assignments to Grade</div>
                </div>
            </div>
            
            <!-- 2. Main Content Area: Charts and Actions/Activity -->
            <div class="dashboard-main-area">
                
                <!-- Left Panel: Performance Chart -->
                <div class="chart-card">
                    <h3>Class Performance Overview</h3>
                    <p style="font-size: 0.85rem; color: #7f8c8d; margin-bottom: 15px;">Visual summary of student engagement and topic mastery.</p>
                    <div class="chart-container">
                        <canvas id="performanceChart"></canvas>
                    </div>
                </div>
                
                <!-- Right Panel: Quick Actions and Activity -->
                <div>
                    <!-- Quick Actions -->
                    <div class="action-card" style="margin-bottom: 20px;">
                        <h3>Quick Actions</h3>
                        <ul class="action-list">
                            <li>
                                <button class="action-button" onclick="initLessonCreation()">
                                    <i class="fas fa-plus-circle"></i> Create New Lesson
                                </button>
                            </li>
                            <li>
                                <button class="action-button" onclick="customAlert('Navigating to the pending assignments list.')">
                                    <i class="fas fa-check-double"></i> Review Pending Grades
                                </button>
                            </li>
                            <li>
                                <button class="action-button" onclick="customAlert('Interface for sending a new class announcement is loading.')">
                                    <i class="fas fa-bullhorn"></i> Send Class Announcement
                                </button>
                            </li>
                        </ul>
                    </div>

                    <!-- Recent Activity -->
                    <div class="action-card">
                        <h3>Recent Class Activity</h3>
                        <div class="activity-log">
                            <div class="recent-activity-item">
                                <div class="activity-icon grade"><i class="fas fa-award"></i></div>
                                <div class="activity-details">
                                    <strong>Quiz 3 Graded</strong>
                                    <span>Last graded: 2025-10-06</span>
                                </div>
                            </div>
                            <div class="recent-activity-item">
                                <div class="activity-icon lesson"><i class="fas fa-scroll"></i></div>
                                <div class="activity-details">
                                    <strong>Lesson: Climate Change</strong>
                                    <span>Updated by you 3 days ago.</span>
                                </div>
                            </div>
                            <div class="recent-activity-item">
                                <div class="activity-icon activity"><i class="fas fa-seedling"></i></div>
                                <div class="activity-details">
                                    <strong>Activity: Water Cycle Simulation</strong>
                                    <span>5 new submissions received.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Chart initialization must happen after the canvas element is in the DOM
        setTimeout(() => initPerformanceChart(), 10);
        break;

    case 'lessons':
      html = `
        <div class="lessons-container">
            <div class="lessons-header">
                <h2>Curriculum Management: Lessons</h2>
                <button class="create-button" onclick="initLessonCreation()">
                    <i class="fas fa-plus"></i> Create New Lesson
                </button>
            </div>
            <p class="subtitle">Quickly access, edit, and publish your environmental science teaching materials.</p>
            
            <div class="lessons-main-area">
                
                <!-- Left Panel: Lesson List (Main Management Area) -->
                <div class="lesson-list-panel">
                    <h3>Lesson Status Overview</h3>
                    <div id="lessonGrid" class="lesson-grid">
                        <!-- Lesson cards will be dynamically rendered here by renderLessons() -->
                    </div>
                </div>

                <!-- Right Panel: Filters and Actions -->
                <div class="lessons-side-panel">
                    <div class="action-card filter-card">
                        <h3>Filter Lessons</h3>
                        <div class="filter-group">
                            <strong>Status:</strong>
                            <select id="statusFilter" onchange="filterLessons()">
                                <option value="all">All Statuses</option>
                                <option value="published">Published</option>
                                <option value="draft">Drafts</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <button class="apply-filter-btn" onclick="filterLessons()"><i class="fas fa-filter"></i> Apply Filters</button>
                    </div>
                    
                    <div class="action-card template-card" style="margin-top: 20px;">
                        <h3>Quick Resources</h3>
                        <ul class="action-list">
                            <li>
                                <button class="action-button alt-button" onclick="customAlert('Searching global EcoLearn library for content.')">
                                    <i class="fas fa-search"></i> Find Community Content
                                </button>
                            </li>
                            <li>
                                <button class="action-button alt-button" onclick="customAlert('Loading curriculum report.')">
                                    <i class="fas fa-file-pdf"></i> Generate Curriculum Report
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
        // After loading the structure, render the dynamic lesson cards
        setTimeout(() => renderLessons(), 10);
      break;

// ... other cases ...

case 'profile':
        // Logic to determine profile picture display (Synchronized with student profile)
        let profilePicHtml = '';
        const nameParts = userProfileData.name.split(' ');
        const firstWord = nameParts[0].toUpperCase();

        if (userProfileData.profilePicUrl) {
            // Use image URL if provided
            // Note: The teacher profile uses different primary/secondary colors than the student profile, 
            // so we don't need to specify background-color here.
            profilePicHtml = `<div class="student-avatar" id="profilePicAvatar" style="width: 100px; height: 100px; font-size: 2.5rem; background-image: url('${userProfileData.profilePicUrl}'); background-size: cover; background-position: center; border-radius: 50%; border: 3px solid var(--primary-color);"></div>`;
        } else {
            // Display first word of name as text placeholder
            profilePicHtml = `<div class="student-avatar" id="profilePicAvatar" style="width: 100px; height: 100px; font-size: 1.5rem; line-height: 100px; padding: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background-color: var(--primary-color);">${firstWord}</div>`;
        }

        html = `
            <div class="profile-container chart-card">
                <div class="profile-header">
                    ${profilePicHtml}
                    <div>
                        <h2 id="userName">${userProfileData.name}</h2>
                        <p class="role" id="userRole" style="color: var(--secondary-color);">${userProfileData.role}</p>
                        <button class="edit-btn action-small-btn edit-btn" onclick="openEditModal()">
                            <i class="fas fa-user-edit"></i> Edit Profile
                        </button>
                    </div>
                </div>

                <div class="info-section">
                    <h3 style="color: var(--primary-color);">Contact Information</h3>
                    <div class="info-grid" id="infoGrid">
                        <div class="stat-card" style="padding: 15px;">Email: <strong>${userProfileData.email}</strong></div>
                        <div class="stat-card" style="padding: 15px;">Phone: <strong>${userProfileData.phone}</strong></div>
                        <div class="stat-card" style="padding: 15px;">Address: <strong>${userProfileData.address}</strong></div>
                        <div class="stat-card" style="padding: 15px;">Joined: <strong>${userProfileData.joined}</strong></div>
                    </div>
                </div>

                <h3 style="color: var(--primary-color);">Account Summary</h3>
                <div class="features dashboard-grid" style="margin-top: 15px;">
                    <div class="feature-card chart-card">
                        <h4>Subjects Taught</h4>
                        <p>Environmental Science, Geography, Biology</p>
                    </div>
                    <div class="feature-card chart-card">
                        <h4>Activity Summary</h4>
                        <p>Lessons Created: ${lessonsData.length} | Activities: ${activitiesData.length}</p>
                    </div>
                    <div class="feature-card chart-card">
                        <h4>Total Anonymous Users</h4>
                        <p>Accessed Content: ${analyticsData.engagement.anonymous}</p>
                    </div>
                </div>

                <button class="logout-btn action-button delete-btn" style="width: 200px; margin-top: 25px;" onclick="handleTeacherLogout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            
            <div class="modal-overlay" id="editModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header-content">
                            <h3 style="color: var(--primary-color);">Edit Profile</h3>
                            <button class="modal-close-btn" onclick="closeEditModal()">&times;</button>
                        </div>
                        <h4 style="margin-bottom: 5px; color: var(--text-color);">Personal Details:</h4>
                        <input type="text" id="editName" placeholder="Full Name">
                        <input type="text" id="editRole" placeholder="Role (Teacher)">
                        
                        <h4 style="margin-top: 20px; margin-bottom: 5px; color: var(--text-color);">Profile Image (URL):</h4>
                        <input type="url" id="editProfilePicUrl" placeholder="Paste image URL here (e.g., https://via.placeholder.com/100)">

                        <h4 style="margin-top: 20px; margin-bottom: 5px; color: var(--text-color);">Contact Details:</h4>
                        <input type="email" id="editEmail" placeholder="Email Address">
                        <input type="text" id="editPhone" placeholder="Phone Number">
                        <input type="text" id="editAddress" placeholder="Address">
                        
                        <div class="modal-buttons" style="text-align: right; margin-top: 20px;">
                            <button class="cancel-btn action-small-btn archive-btn" onclick="closeEditModal()">Cancel</button>
                            <button class="save-btn action-small-btn view-btn" onclick="saveProfile()">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        break;

    case 'settings':
        // Minimal Settings: Only Account Security & Contact
        html = `
            <div class="settings-content-wrapper">
                <h1>Settings</h1>
                <p class="subtitle">Manage your core account security and contact information.</p>

                <div class="settings-section chart-card">
                  <h3>Account Security & Contact</h3>
                  <div class="settings-option">
                    <label>Change Password</label>
                    <button class="action-small-btn edit-btn" onclick="customAlert('Opening password update form...')">
                        <i class="fas fa-key"></i> Update
                    </button>
                  </div>
                  <div class="settings-option">
                    <label>Update Email</label>
                    <button class="action-small-btn edit-btn" onclick="customAlert('Opening email update form...')">
                        <i class="fas fa-envelope"></i> Change
                    </button>
                  </div>
                  <div class="settings-option">
                    <label>Update Phone</label>
                    <button class="action-small-btn edit-btn" onclick="customAlert('Opening phone number update form...')">
                        <i class="fas fa-phone"></i> Change
                    </button>
                  </div>
                  <div class="settings-option">
                    <label>Update Address</label>
                    <button class="action-small-btn edit-btn" onclick="customAlert('Opening address update form...')">
                        <i class="fas fa-map-marker-alt"></i> Change
                    </button>
                  </div>
                </div>
                
                <p style="color: #7f8c8d; text-align: center; margin-top: 50px;">
                    All other settings are managed by your administrator. Use the main sidebar for Logout.
                </p>
            </div>
        `;
        break;
    
    // ... default case and function closing bracket ...

    case 'activities':
        html = `
            <div class="activities-container">
                <div class="activities-header lessons-header"> 
                    <h2>Activity & Grading Center</h2>
                    <button class="create-button" onclick="initActivityCreation()">
                        <i class="fas fa-plus"></i> Create New Activity
                    </button>
                </div>
                <p class="subtitle">Manage quizzes, projects, and lab simulations, and track submissions easily.</p>
                
                <div class="lessons-main-area"> 
                    
                    <!-- Left Panel: Activity List (Main Management Area) -->
                    <div class="lesson-list-panel">
                        <h3>Current Activity Status</h3>
                        <div id="activityGrid" class="lesson-grid"> 
                            <!-- Activity cards will be dynamically rendered here by renderActivities() -->
                        </div>
                    </div>

                    <!-- Right Panel: Filters and Actions -->
                    <div class="lessons-side-panel">
                        <div class="action-card filter-card">
                            <h3>Filter Activities</h3>
                            <div class="filter-group">
                                <strong>Status:</strong>
                                <select id="activityStatusFilter" onchange="filterActivities()">
                                    <option value="all">All Statuses</option>
                                    <option value="open">Open (Accepting Submissions)</option>
                                    <option value="draft">Drafts</option>
                                    <option value="closed">Closed (Grading)</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <strong>Type:</strong>
                                <select id="activityTypeFilter" onchange="filterActivities()">
                                    <option value="all">All Types</option>
                                    <option value="Quiz">Quiz / Assessment</option>
                                    <option value="Project">Project / Essay</option>
                                    <option value="Simulation">Simulation / Lab</option>
                                </select>
                            </div>
                            <button class="apply-filter-btn" onclick="filterActivities()"><i class="fas fa-filter"></i> Apply Filters</button>
                        </div>
                        
                        <div class="action-card template-card" style="margin-top: 20px;">
                            <h3>Grading Overview</h3>
                            <p style="font-size: 0.9rem; color: var(--text-color);">Total Pending Grades: <strong id="pendingGradesCount">--</strong></p>
                            <ul class="action-list">
                                <li>
                                    <button class="action-button" onclick="customAlert('Loading Gradebook to review all submissions.')">
                                        <i class="fas fa-table"></i> Open Gradebook
                                    </button>
                                </li>
                                <li>
                                    <button class="action-button alt-button" onclick="customAlert('Running automated grading report.')">
                                        <i class="fas fa-magic"></i> Run Auto-Grade Check
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // After loading the structure, render the dynamic activity cards
        setTimeout(() => renderActivities(), 10);
      break;
    case 'analytics':
        html = `
            <div class="analytics-container">
                <h2>Performance Analytics Center</h2>
                <p class="subtitle">Visualize student progress, identify learning gaps, and track content effectiveness. All metrics include anonymous QR code users.</p>
                
                <!-- 1. Top Row: Key Metrics & User Breakdown (Uses .analytic-stat-card class) -->
                <div class="dashboard-grid analytics-metric-grid">
                    
                    <!-- Metric: Average Activity Score -->
                    <div class="stat-card analytic-stat-card">
                        <i class="fas fa-trophy" style="color: #f1c40f;"></i>
                        <div class="value" id="analytic-activity-score">--%</div>
                        <div class="label">Platform Avg Score</div>
                        <p style="font-size: 0.75rem; color: #7f8c8d; margin-top: 5px;">All Graded Activities</p>
                    </div>
                    
                    <!-- Metric: Lesson Engagement -->
                    <div class="stat-card analytic-stat-card">
                        <i class="fas fa-eye" style="color: var(--primary-color);"></i>
                        <div class="value" id="analytic-lesson-engagement">--</div>
                        <div class="label">Lesson Engagers</div>
                        <p style="font-size: 0.75rem; color: #7f8c8d; margin-top: 5px;">Total users accessing lessons.</p>
                    </div>
                    
                    <!-- Metric: Activity Engagement -->
                    <div class="stat-card analytic-stat-card">
                        <i class="fas fa-puzzle-piece" style="color: var(--secondary-color);"></i>
                        <div class="value" id="analytic-activity-engagement">--</div>
                        <div class="label">Activity Participants</div>
                        <p style="font-size: 0.75rem; color: #7f8c8d; margin-top: 5px;">Users submitting any activity.</p>
                    </div>
                    
                    <!-- Chart: User Type Breakdown -->
                    <div class="chart-card" style="padding: 15px; min-height: 200px;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px;">User Type Breakdown</h3>
                        <div class="chart-container" style="height: 150px;">
                            <canvas id="userTypeDonutChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- 2. Main Analytics Area: Leaderboard and Score Trends -->
                <div class="dashboard-main-area"> 
        
                    <!-- Left Panel: Leaderboard (NEW) -->
                    <div class="chart-card" style="flex: 1; min-width: 300px;">
                        <h3>Top 5 Student Scorers</h3>
                        <p style="font-size: 0.85rem; color: #7f8c8d; margin-bottom: 15px;">Combined scores from all completed lessons/activities.</p>
                        <div id="leaderboardList" class="leaderboard-list">
                            <!-- Leaderboard content drawn here by drawLeaderboard() -->
                        </div>
                        <button class="action-button alt-button" style="width: 100%; margin-top: 20px;" onclick="customAlert('Loading full student records table.')">
                            <i class="fas fa-search"></i> View Full Records Table
                        </button>
                    </div>
                    
                    <!-- Right Panel: Combined Time-Series Chart (NEW) -->
                    <div class="chart-card" style="flex: 2;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
                            <h3 style="margin: 0;">Performance Trend Over Time</h3>
                            <select id="timeframeSelector" onchange="updateTrendChart(this.value)" style="padding: 6px; border-radius: 4px; border: 1px solid #ccc; background-color: white; font-size: 0.9rem;">
                                <option value="daily">Daily Engagement (Last 7 Days)</option>
                                <option value="weekly">Weekly Avg Score (Last 6 Weeks)</option>
                                <option value="monthly">Monthly Avg Score (Last 5 Months)</option>
                            </select>
                        </div>
                        <div class="chart-container" style="height: 250px;"><canvas id="combinedTrendChart"></canvas></div>
                    </div>
                </div>
            </div>
        `;
        // Chart initialization must happen after the canvas element is in the DOM
        setTimeout(() => drawAnalyticsDashboard(), 10);
      break;
    default:
      html = `<p class="welcome-text">Welcome to EcoLearn! Select a section from the navigation menu.</p>`;
  }
  
  
  content.innerHTML = html;
}

// Load the dashboard content immediately on page load
window.onload = function() {
    loadContent('dashboard');
}
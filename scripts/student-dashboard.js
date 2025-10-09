// --- Utility Functions ---
function customAlert(message) {
    console.log("Action triggered: " + message);
    const alertBox = document.createElement('div');
    alertBox.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #fff; border: 2px solid var(--primary-color); border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 5000;';
    alertBox.innerHTML = `<strong>Action Alert</strong><p style="margin-top: 10px;">${message}</p><button onclick="this.parentNode.remove()" class="action-small-btn view-btn" style="margin-top: 15px;">Close</button>`;
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

function setActiveNavItem(section) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.nav-item.${section}`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

let studentChartInstance = null;
function drawStudentPerformanceChart() {
    if(studentChartInstance) studentChartInstance.destroy();
    const ctx = document.getElementById('studentPerformanceChart');
    if (ctx) {
         studentChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Quiz 1', 'Proj 1', 'Quiz 2', 'Lab 1', 'Quiz 3'],
                datasets: [{
                    label: 'My Score (%)',
                    data: [75, 88, 79, 92, 95], 
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: { display: true, text: 'Score (%)' }
                    }
                }
            }
        });
    }
}

/**
 * Handles horizontal scrolling for a given container.
 * @param {string} containerId - The ID of the scrolling div (e.g., 'trendingSlider').
 * @param {string} direction - 'left' or 'right'.
 */
function scrollCatalogue(containerId, direction) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Determine how far to scroll (300px card width + 20px gap = 320)
    const scrollDistance = 320; 

    if (direction === 'left') {
        container.scrollLeft -= scrollDistance;
    } else if (direction === 'right') {
        container.scrollLeft += scrollDistance;
    }
}

/**
 * Handles the user logging out.
 * Updated to redirect to index.php (the teacher's dashboard).
 */
function handleLogout() {
    customAlert('Logging out... Thank you for using EcoLearn!');
    setTimeout(() => {
        window.location.href = 'index.php'; // Renamed teacher dashboard to PHP
    }, 1500);
}

// ------------------------------------------------------------------
// NEW QR CODE ACCESS LOGIC
// ------------------------------------------------------------------

/**
 * Initiates the QR code access flow by showing the identity selection modal.
 * This function would be called by the QR scanning page/logic, passing the resource link data.
 * @param {number} resourceId - The ID of the lesson or activity.
 * @param {string} resourceType - 'lesson' or 'activity'.
 */
function handleQRAccess(resourceId, resourceType) {
    // 1. Set the resource details in the hidden form inputs
    document.getElementById('anonResourceId').value = resourceId;
    document.getElementById('anonResourceType').value = resourceType;

    // 2. Simulate fetching resource title and update modal
    const title = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);
    
    // In a real application, you would fetch the title from the backend.
    document.getElementById('qrResourceTitle').textContent = `Resource: ${title} ID ${resourceId}`;

    // 3. Display the modal
    showModal('qrLandingModal');
    // Hide the previous modal if it was open
    hideModal('qrScannerModal'); 
}

/**
 * Processes the anonymous student's name entry and simulates content access.
 */
function processAnonymousAccess() {
    const name = document.getElementById('anonName').value;
    const resourceId = document.getElementById('anonResourceId').value;
    const resourceType = document.getElementById('anonResourceType').value;

    if (!name.trim()) {
        customAlert("Please enter your name/initials to proceed anonymously.");
        return;
    }

    // SIMULATED LOGIC:
    // This is where a PHP endpoint would be called to:
    // 1. Create a temporary 'Anonymous' user record with the provided 'name'.
    // 2. Return an Anonymous Session ID.
    
    customAlert(`Success! Session started for Anonymous User: ${name}. Loading ${resourceType} ${resourceId}.`);
    
    // Example: Redirect to the content viewer page with temporary credentials
    // window.location.href = `/view/resource.php?type=${resourceType}&id=${resourceId}&anon_name=${encodeURIComponent(name)}`;

    // For now, hide modal and simulate content start
    hideModal('qrLandingModal');
    document.getElementById('anonName').value = ''; // Clear input
}

// --- Student-Specific Content Rendering ---
function loadStudentContent(section) {
  const content = document.getElementById('content');
  let html = '';
  
  setActiveNavItem(section);

  switch(section) {
    case 'dashboard':
        html = `
            <h2>Welcome Back, [Student Name]! 窓</h2>
            <p class="subtitle">Quickly access lessons, check deadlines, or scan a code to start a new activity.</p>
            
            <div class="action-card qr-focus-card">
                <h3>QR Code Quick Access</h3>
                <button class="action-button primary" onclick="showModal('qrScannerModal')">
                    <i class="fas fa-qrcode"></i> **Scan QR Code with Camera**
                </button>
                <button class="action-button alt-button alt-button-top" onclick="customAlert('Opening code entry field...')">
                    <i class="fas fa-keyboard"></i> Enter Resource Code Manually
                </button>
            </div>
            
            <div class="dashboard-grid">
                <div class="stat-card">
                    <i class="fas fa-percent" style="color: #e67e22;"></i>
                    <div class="value">85%</div>
                    <div class="label">Overall Avg Score</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-hourglass-start" style="color: var(--status-draft);"></i>
                    <div class="value">3</div>
                    <div class="label">Pending Assignments</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book-open" style="color: var(--primary-color);"></i>
                    <div class="value">5/10</div>
                    <div class="label">Lessons In-Progress</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar-times" style="color: var(--status-archived);"></i>
                    <div class="value">1</div>
                    <div class="label">Overdue Activities</div>
                </div>
            </div>
            
            <div class="action-card dashboard-top-margin">
                <h3>Upcoming Deadlines</h3>
                <div class="activity-log">
                    <div class="recent-activity-item">
                        <div class="activity-icon activity"><i class="fas fa-flask"></i></div>
                        <div class="activity-details">
                            <strong>Water Cycle Simulation Lab</strong>
                            <span>Due: Tomorrow, 11:59 PM</span>
                        </div>
                    </div>
                    <div class="recent-activity-item">
                        <div class="activity-icon lesson"><i class="fas fa-scroll"></i></div>
                        <div class="activity-details">
                            <strong>Lesson: Global Climate Change Basics</strong>
                            <span>Complete by: Fri, Oct 10th</span>
                        </div>
                    </div>
                    <div class="recent-activity-item">
                        <div class="activity-icon grade"><i class="fas fa-clipboard-question"></i></div>
                        <div class="activity-details">
                            <strong>Quiz 2: Biodiversity & Ecosystems</strong>
                            <span>Due: Mon, Oct 13th</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        break;

    case 'catalogue':
        // UPDATED COURSE CATALOGUE VIEW
        html = `
            <div class="lessons-container">
                <div class="catalogue-header">
                    <div>
                        <h2>Course Catalogue & Library 答</h2>
                        <p class="subtitle">Explore all available environmental science lessons and recommended activities.</p>
                    </div>
                    <div class="catalogue-search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search lessons, activities..." onchange="customAlert('Searching for: ' + this.value)">
                    </div>
                </div>
                
                <div class="catalogue-row-section">
                    <h3>櫨 Trending Lessons</h3>
                    <div class="catalogue-slider">
                        <div class="scroll-arrow left" onclick="scrollCatalogue('trendingSlider', 'left')"><i class="fas fa-chevron-left"></i></div>
                        <div class="slider-container" id="trendingSlider">
                            
                            <div class="lesson-card status-trending">
                                <div class="lesson-header-status">
                                    <span class="status-badge trending">Popular</span>
                                </div>
                                <h4>Introduction to Renewable Energy</h4>
                                <p class="topic-detail">Grade Level: 9-12 | Topics: 7</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-star"></i> Rating: 4.8/5.0</span>
                                    <span><i class="fas fa-user-graduate"></i> 550 Students</span>
                                </div>
                                <button class="action-small-btn view-btn" onclick="customAlert('Enrolling in course...')"><i class="fas fa-arrow-right"></i> Enroll Now</button>
                            </div>
                            
                            <div class="lesson-card status-recommended">
                                <div class="lesson-header-status">
                                    <span class="status-badge recommended">Recommended</span>
                                </div>
                                <h4>Forest Ecosystems and Deforestation</h4>
                                <p class="topic-detail">Grade Level: 7-9 | Topics: 5</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-tags"></i> Related: Biodiversity</span>
                                    <span><i class="fas fa-book-open"></i> Preview Lesson</span>
                                </div>
                                <button class="action-small-btn edit-btn" onclick="customAlert('Enrolling in course...')"><i class="fas fa-arrow-right"></i> Enroll Now</button>
                            </div>
                            
                            <div class="lesson-card status-published">
                                <div class="lesson-header-status">
                                    <span class="status-badge published">Hot Topic</span>
                                </div>
                                <h4>The Science of Ocean Acidification</h4>
                                <p class="topic-detail">Grade Level: 10-12 | Topics: 6</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Added: 3 Weeks Ago</span>
                                    <span><i class="fas fa-eye"></i> 480 Views</span>
                                </div>
                                <button class="action-small-btn view-btn" onclick="customAlert('Enrolling in course...')"><i class="fas fa-arrow-right"></i> Enroll Now</button>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 1')">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                    <h4>Explore More Topics (1)</h4>
                                    <p>Click to see unlisted environmental lessons.</p>
                                </div>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 2')">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                    <h4>Explore More Topics (2)</h4>
                                    <p>Click to see unlisted environmental lessons.</p>
                                </div>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 3')">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                    <h4>Explore More Topics (3)</h4>
                                    <p>Click to see unlisted environmental lessons.</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="scroll-arrow right" onclick="scrollCatalogue('trendingSlider', 'right')"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
                
                <div class="catalogue-row-section">
                    <h3>･Most Popular Activities</h3>
                    <p class="subtitle catalogue-subtitle">Practice exercises frequently taken by your peers.</p>
                    <div class="catalogue-slider">
                        <div class="scroll-arrow left" onclick="scrollCatalogue('activitySlider', 'left')"><i class="fas fa-chevron-left"></i></div>
                        <div class="slider-container" id="activitySlider">
                            
                            <div class="lesson-card status-published">
                                <div class="lesson-header-status">
                                    <span class="status-badge published">Quiz</span>
                                </div>
                                <h4>Basic Ecology & Food Webs Quiz</h4>
                                <p class="topic-detail">Type: <strong>Assessment</strong> | Avg Time: 15 mins</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-users"></i> Attempts: 2,100</span>
                                    <span><i class="fas fa-inbox"></i> Class Avg: 82%</span>
                                </div>
                                <button class="action-small-btn view-btn" onclick="customAlert('Starting Quick Quiz...')"><i class="fas fa-play"></i> Start Quiz</button>
                            </div>
                            
                            <div class="lesson-card status-recommended">
                                <div class="lesson-header-status">
                                    <span class="status-badge recommended">Simulation</span>
                                </div>
                                <h4>Build a Sustainable City (Sim)</h4>
                                <p class="topic-detail">Type: <strong>Lab</strong> | Estimated Time: 2 hours</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-star"></i> High Rated</span>
                                    <span><i class="fas fa-flask"></i> Launch Simulation</span>
                                </div>
                                <button class="action-small-btn edit-btn" onclick="customAlert('Launching simulation...')"><i class="fas fa-arrow-right"></i> Launch</button>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Activity Placeholder 1')">
                                    <i class="fas fa-seedling"></i>
                                    <h4>More Practice (1)</h4>
                                    <p>Find more exercises and assessments.</p>
                                </div>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Activity Placeholder 2')">
                                    <i class="fas fa-seedling"></i>
                                    <h4>More Practice (2)</h4>
                                    <p>Find more exercises and assessments.</p>
                                </div>
                            </div>
                            
                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Activity Placeholder 3')">
                                    <i class="fas fa-seedling"></i>
                                    <h4>More Practice (3)</h4>
                                    <p>Find more exercises and assessments.</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="scroll-arrow right" onclick="scrollCatalogue('activitySlider', 'right')"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
                
                <div class="catalogue-row-section">
                    <h3>笨ｨ Newly Added</h3>
                    <div class="catalogue-slider">
                        <div class="scroll-arrow left" onclick="scrollCatalogue('newSlider', 'left')"><i class="fas fa-chevron-left"></i></div>
                        <div class="slider-container" id="newSlider">

                            <div class="lesson-card status-published">
                                <div class="lesson-header-status">
                                    <span class="status-badge new-post">New Today</span>
                                </div>
                                <h4>Microplastics and the Food Chain</h4>
                                <p class="topic-detail">Grade Level: 8-11 | Topics: 4</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Added: Oct 7th</span>
                                    <span><i class="fas fa-users"></i> 12 Students Enrolled</span>
                                </div>
                                <button class="action-small-btn view-btn" onclick="customAlert('Enrolling in course...')"><i class="fas fa-arrow-right"></i> Enroll Now</button>
                            </div>
                            
                            <div class="lesson-card status-advanced">
                                <div class="lesson-header-status">
                                    <span class="status-badge advanced">Just Posted</span>
                                </div>
                                <h4>The Ethics of Geoengineering</h4>
                                <p class="topic-detail">Grade Level: 11-12 | Topics: 3</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Added: Yesterday</span>
                                    <span><i class="fas fa-user-graduate"></i> Advanced Content</span>
                                </div>
                                <button class="action-small-btn edit-btn" onclick="customAlert('Enrolling in course...')"><i class="fas fa-arrow-right"></i> Enroll Now</button>
                            </div>

                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 1')">
                                    <i class="fas fa-plus"></i>
                                    <h4>Next Lesson Loading... (1)</h4>
                                    <p>Check back soon for more content.</p>
                                </div>
                            </div>

                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 2')">
                                    <i class="fas fa-plus"></i>
                                    <h4>Next Lesson Loading... (2)</h4>
                                    <p>Check back soon for more content.</p>
                                </div>
                            </div>

                            <div class="lesson-card status-draft">
                                <div class="lesson-placeholder" onclick="customAlert('Lesson Placeholder 3')">
                                    <i class="fas fa-plus"></i>
                                    <h4>Next Lesson Loading... (3)</h4>
                                    <p>Check back soon for more content.</p>
                                </div>
                            </div>
                        </div>
                        <div class="scroll-arrow right" onclick="scrollCatalogue('newSlider', 'right')"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>

            </div>
        `;
        break;

    case 'lessons':
        // My Lessons View
        html = `
            <div class="lessons-container">
                <h2>My Lessons</h2>
                <p class="subtitle">Your assigned and in-progress environmental science learning modules.</p>
                
                <div class="lesson-grid">
                    <div class="lesson-card status-published">
                        <div class="lesson-header-status">
                            <span class="status-badge published">In Progress</span>
                        </div>
                        <h4>Water Cycle & Hydrology</h4>
                        <p class="topic-detail">Topics Covered: 4/6</p>
                        <div class="lesson-metrics">
                            <span><i class="fas fa-chart-pie"></i> Progress: 67%</span>
                            <span><i class="fas fa-clock"></i> Last Viewed: 1 day ago</span>
                        </div>
                        <button class="action-small-btn view-btn" onclick="customAlert('Continuing Lesson...')"><i class="fas fa-play"></i> Continue</button>
                    </div>
                    
                    <div class="lesson-card status-draft">
                        <div class="lesson-header-status">
                            <span class="status-badge draft">New Assignment</span>
                        </div>
                        <h4>Pollution Sources & Mitigation</h4>
                        <p class="topic-detail">Topics Covered: 0/5</p>
                        <div class="lesson-metrics">
                            <span><i class="fas fa-chart-pie"></i> Progress: 0%</span>
                            <span><i class="fas fa-users"></i> Class Avg: 78%</span>
                        </div>
                        <button class="action-small-btn edit-btn" onclick="customAlert('Starting new Lesson...')"><i class="fas fa-book-open"></i> Start Lesson</button>
                    </div>
                    
                    <div class="lesson-card status-completed">
                        <div class="lesson-header-status">
                            <span class="status-badge completed">Completed</span>
                        </div>
                        <h4>Biodiversity & Ecosystems</h4>
                        <p class="topic-detail">Completed on: 2025-09-28</p>
                        <div class="lesson-metrics">
                            <span><i class="fas fa-check-double"></i> Grade: A-</span>
                            <span><i class="fas fa-redo"></i> Review Count: 3</span>
                        </div>
                        <button class="action-small-btn archive-btn" onclick="customAlert('Reviewing Lesson content...')"><i class="fas fa-redo"></i> Review</button>
                    </div>
                </div>
            </div>
        `;
        break;

    case 'activities':
        // My Activities View
        html = `
            <div class="activities-container">
                <h2>My Activities & Assignments</h2>
                <p class="subtitle">Quizzes, projects, and labs with due dates and submission status.</p>
                
                <div class="lessons-main-area">
                    <div class="lesson-list-panel">
                        <h3 style="margin-bottom: 15px;">Pending & Graded</h3>
                        <div id="activityGrid" class="lesson-grid"> 
                            <div class="lesson-card status-overdue">
                                <div class="lesson-header-status">
                                    <span class="status-badge overdue">OVERDUE</span>
                                </div>
                                <h4>Local Pollution Photo Essay</h4>
                                <p class="topic-detail">Type: <strong>Project</strong> | Linked Lesson: Pollution Sources</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Original Due: 2025-10-01</span>
                                    <span><i class="fas fa-upload"></i> Status: Not Submitted</span>
                                </div>
                                <button class="action-small-btn delete-btn" onclick="customAlert('Submitting late assignment...')"><i class="fas fa-paper-plane"></i> Submit Late</button>
                            </div>

                            <div class="lesson-card status-submitted">
                                <div class="lesson-header-status">
                                    <span class="status-badge submitted">Submitted</span>
                                </div>
                                <h4>Water Cycle Simulation Lab</h4>
                                <p class="topic-detail">Type: <strong>Simulation</strong> | Linked Lesson: Water Cycle & Hydrology</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Due: 2025-10-15</span>
                                    <span><i class="fas fa-check-circle"></i> Submission Status: Pending Grade</span>
                                </div>
                                <button class="action-small-btn publish-btn" onclick="customAlert('Viewing submitted file...')"><i class="fas fa-file-alt"></i> View Submission</button>
                            </div>
                            
                            <div class="lesson-card status-published">
                                <div class="lesson-header-status">
                                    <span class="status-badge published">Graded: 90%</span>
                                </div>
                                <h4>Climate Change Impact Quiz</h4>
                                <p class="topic-detail">Type: <strong>Quiz</strong> | Linked Lesson: Global Climate Change Basics</p>
                                <div class="lesson-metrics">
                                    <span><i class="fas fa-calendar-alt"></i> Graded On: 2025-10-02</span>
                                    <span><i class="fas fa-inbox"></i> Class Avg: 88%</span>
                                </div>
                                <button class="action-small-btn view-btn" onclick="customAlert('Reviewing Quiz results...')"><i class="fas fa-list-check"></i> Review Results</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        break;
    case 'progress':
        // My Progress View (Reuses Analytics structure)
        html = `
            <div class="analytics-container">
                <h2>My Progress & Scores</h2>
                <p class="subtitle">A summary of your performance across all completed activities and lessons.</p>
                
                <div class="dashboard-main-area"> 
        
                    <div class="chart-card progress-score-list">
                        <h3 class="progress-score-header">Latest Activity Scores</h3>
                        <div class="leaderboard-list">
                            <div class="score-detail">
                                <span><i class="fas fa-list-alt" style="margin-right: 5px; color: #7f8c8d;"></i> Biodiversity Quiz 2</span>
                                <span class="score-detail-high">95%</span>
                            </div>
                            <div class="score-detail">
                                <span><i class="fas fa-list-alt" style="margin-right: 5px; color: #7f8c8d;"></i> Climate Change Quiz</span>
                                <span class="score-detail-mid">79%</span>
                            </div>
                            <div class="score-detail">
                                <span><i class="fas fa-list-alt" style="margin-right: 5px; color: #7f8c8d;"></i> Pollution Mini-Essay</span>
                                <span class="score-detail-low">88%</span>
                            </div>
                            <p class="subtitle score-footer-text">Scores dynamically fetched here.</p>
                        </div>
                        <button class="action-button alt-button dashboard-top-margin" style="width: 100%;" onclick="customAlert('Loading full score history.')">
                            <i class="fas fa-file-alt"></i> View Full Score History
                        </button>
                    </div>
                    
                    <div class="chart-card chart-card-flex-2">
                        <h3 class="progress-score-header">Performance Trend (Last 5 Quizzes)</h3>
                        <div class="chart-container" style="height: 250px;"><canvas id="studentPerformanceChart"></canvas></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => drawStudentPerformanceChart(), 10);
      break;
    default:
      html = `<p class="welcome-text">Select a section from the navigation menu to begin your learning journey.</p>`;
  }
  
  content.innerHTML = html;
}

// Load the dashboard content immediately on page load
window.onload = function() {
    // Check for QR parameters in the URL (simulated QR scan)
    const urlParams = new URLSearchParams(window.location.search);
    const qrType = urlParams.get('type');
    const qrId = urlParams.get('id');

    if (qrType && qrId) {
        // If parameters exist, launch the identity selection modal
        handleQRAccess(qrId, qrType);
    } else {
        // Otherwise, load the regular dashboard
        loadStudentContent('dashboard');
    }
}
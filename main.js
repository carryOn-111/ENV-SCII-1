/* Main JavaScript File - Imports all modular components */

// Load utility functions and data
// Note: In a real implementation, you would use ES6 modules or a bundler
// For now, these will be loaded via separate script tags in HTML

// Main Content Loader for Teacher Dashboard
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
        setTimeout(() => renderLessons(), 10);
      break;

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
        setTimeout(() => drawAnalyticsDashboard(), 10);
      break;

    case 'profile':
        let profilePicHtml = '';
        const nameParts = userProfileData.name.split(' ');
        const firstWord = nameParts[0].toUpperCase();

        if (userProfileData.profilePicUrl) {
            profilePicHtml = `<div class="student-avatar" id="profilePicAvatar" style="width: 100px; height: 100px; font-size: 2.5rem; background-image: url('${userProfileData.profilePicUrl}'); background-size: cover; background-position: center; border-radius: 50%; border: 3px solid var(--primary-color);"></div>`;
        } else {
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
        `;
        break;

    case 'settings':
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
    
    default:
      html = `<p class="welcome-text">Welcome to EcoLearn! Select a section from the navigation menu.</p>`;
  }
  
  content.innerHTML = html;
}

// Load the dashboard content immediately on page load
window.onload = function() {
    loadContent('dashboard');
}
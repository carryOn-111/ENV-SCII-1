<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EcoLearn Platform - Student Dashboard</title>
  
  <!-- Font Awesome for Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  
  <!-- Chart.js for Data Visualization -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

  <!-- QRCode Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode.js/1.0.0/qrcode.min.js"></script>

  <!-- External Stylesheet -->
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  
  <!-- Sidebar Navigation -->
  <nav class="sidebar">
    <div class="logo">
      <i class="fas fa-leaf fa-2x"></i>
      <h2>EcoLearn</h2>
    </div>
    
    <div class="nav-section">
      <!-- MAIN NAVIGATION ITEMS -->
      <div class="nav-item dashboard" onclick="loadStudentContent('dashboard')">
        <i class="fas fa-home"></i>
        <span>Dashboard</span>
      </div>
      
      <div class="nav-item catalogue" onclick="loadStudentContent('catalogue')">
        <i class="fas fa-layer-group"></i>
        <span>Course Catalogue</span>
      </div>
      
      <div class="nav-item student-lessons" onclick="loadStudentContent('lessons')">
        <i class="fas fa-book-reader"></i>
        <span>My Lessons</span>
      </div>
      
      <div class="nav-item student-activities" onclick="loadStudentContent('activities')">
        <i class="fas fa-tasks"></i>
        <span>My Activities</span>
      </div>
      
      <div class="nav-item student-progress" onclick="loadStudentContent('progress')">
        <i class="fas fa-chart-bar"></i>
        <span>My Progress</span>
      </div>
      
    </div>
    
    <!-- FOOTER NAVIGATION SECTION -->
    <div class="footer-nav-section">
      <!-- Settings Link -->
      <div class="nav-item settings" onclick="customAlert('Loading account settings and profile editor.')">
        <i class="fas fa-cog"></i>
        <span>Settings</span>
      </div>
      
      <!-- Logout Button -->
      <div class="nav-item logout" onclick="handleLogout()">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </div>
  </nav>

  <!-- Main Content Area -->
  <div class="main-content">
    <header class="header">
      <i class="fas fa-graduation-cap"></i>
      <h1>Student Learning Space</h1>
    </header>
    
    <div id="content">
      <!-- Dynamic content will load here -->
      <p class="welcome-text">Loading Student Dashboard...</p>
    </div>
  </div>
<div id="qrLandingModal" class="modal-overlay">
    <div class="modal-dialog">
        <div class="modal-header-content" style="border-bottom: none;">
            <h3 style="color: var(--primary-color);">Access Lesson/Activity</h3>
            <button onclick="hideModal('qrLandingModal')" class="modal-close-btn">&times;</button>
        </div>
        
        <h4 id="qrResourceTitle" class="modal-text-center" style="margin-bottom: 25px; color: var(--text-color);">Resource: Loading...</h4>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <p class="subtitle">Do you have an EcoLearn account?</p>
            <button 
                class="action-button alt-button" 
                style="width: 80%; margin-bottom: 15px; border-color: var(--secondary-color); color: var(--secondary-color);"
                onclick="customAlert('Redirecting to login/signup page for authenticated access.')"
            >
                <i class="fas fa-user-check"></i> Yes, Log In / Sign Up
            </button>
            
            <p style="color: #7f8c8d;">— OR —</p>
        </div>

        <form id="anonymousAccessForm" onsubmit="event.preventDefault(); processAnonymousAccess();">
            <h4 style="color: var(--status-draft); margin-bottom: 15px;">Continue Anonymously</h4>
            <div class="filter-group">
                <label for="anonName" style="display: block; font-weight: 600; margin-bottom: 5px;">Your Name (for records):</label>
                <input 
                    type="text" 
                    id="anonName" 
                    required 
                    placeholder="Enter your name or initials" 
                    class="resource-input" 
                    style="text-align: left;"
                >
            </div>
            <button type="submit" class="apply-filter-btn primary" style="background-color: var(--primary-color); width: 100%;">
                <i class="fas fa-mask"></i> Access as Anonymous User
            </button>
            <input type="hidden" id="anonResourceId">
            <input type="hidden" id="anonResourceType">
        </form>
    </div>
  </div>
  <!-- MODAL: QR Scanner/Input Modal -->
  <div id="qrScannerModal" class="modal-overlay">
    <div class="modal-dialog">
        <div class="modal-header-content">
            <h3 class="score-detail-low">Scan or Enter Resource Code</h3>
            <button onclick="hideModal('qrScannerModal')" class="modal-close-btn">&times;</button>
        </div>
        
        <p class="subtitle modal-text-center">Use your camera or enter the code provided by your teacher to access content.</p>

        <!-- Placeholder for Camera Feed -->
        <div class="camera-placeholder">
            <i class="fas fa-camera fa-3x placeholder-icon"></i>
            <p class="subtitle">Placeholder for live camera QR scanning integration</p>
        </div>

        <form onsubmit="event.preventDefault(); customAlert('Accessing resource with code: ' + document.getElementById('resourceCode').value);">
            <div class="filter-group">
                <label for="resourceCode">Or Enter 6-Digit Code:</label>
                <input type="text" id="resourceCode" maxlength="6" required class="resource-input">
            </div>
            <button type="submit" class="apply-filter-btn primary">
                <i class="fas fa-play-circle"></i> Start Lesson/Activity
            </button>
        </form>
    </div>
  </div>

  <!-- Load JavaScript -->
  <script src="scripts/student-dashboard.js"></script>
</body>
</html>
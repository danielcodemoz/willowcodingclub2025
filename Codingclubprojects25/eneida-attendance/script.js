// Global Variables
let currentUser = null;
let students = [];
let subjects = [];
let clubs = [];
let attendance = [];
let users = []; // Store registered users
let currentTheme = 'light';
let currentLanguage = 'en';

// Language translations
const translations = {
    en: {
        dashboard: 'Dashboard',
        students: 'Students',
        subjects: 'Subjects',
        clubs: 'Clubs',
        attendance: 'Attendance',
        reports: 'Reports',
        total_students: 'Total Students',
        total_subjects: 'Total Subjects',
        total_clubs: 'Total Clubs',
        attendance_rate: 'Attendance Rate',
        add_student: 'Add Student',
        add_subject: 'Add Subject',
        add_club: 'Add Club',
        student_name: 'Student Name',
        student_id: 'Student ID',
        email: 'Email',
        phone: 'Phone',
        present: 'Present',
        absent: 'Absent',
        late: 'Late',
        select_subject: 'Select Subject',
        mark_attendance: 'Mark Attendance',
        attendance_report: 'Attendance Report',
        student_report: 'Student Report',
        subject_report: 'Subject Report',
        export_pdf: 'Export PDF',
        subject_name: 'Subject Name',
        subject_code: 'Subject Code',
        description: 'Description',
        club_name: 'Club Name',
        meeting_time: 'Meeting Time',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        login_success: 'Login successful!',
        login_error: 'Invalid credentials!',
        student_added: 'Student added successfully!',
        subject_added: 'Subject added successfully!',
        club_added: 'Club added successfully!',
        attendance_marked: 'Attendance marked successfully!',
        report_generated: 'Report generated successfully!',
        confirm_delete: 'Are you sure you want to delete this item?',
        required_field: 'This field is required',
        invalid_email: 'Please enter a valid email address'
    },
    es: {
        dashboard: 'Panel de Control',
        students: 'Estudiantes',
        subjects: 'Materias',
        clubs: 'Clubes',
        attendance: 'Asistencia',
        reports: 'Reportes',
        total_students: 'Total Estudiantes',
        total_subjects: 'Total Materias',
        total_clubs: 'Total Clubes',
        attendance_rate: 'Tasa de Asistencia',
        add_student: 'Agregar Estudiante',
        add_subject: 'Agregar Materia',
        add_club: 'Agregar Club',
        student_name: 'Nombre del Estudiante',
        student_id: 'ID del Estudiante',
        email: 'Correo Electrónico',
        phone: 'Teléfono',
        present: 'Presente',
        absent: 'Ausente',
        late: 'Tardío',
        select_subject: 'Seleccionar Materia',
        mark_attendance: 'Marcar Asistencia',
        attendance_report: 'Reporte de Asistencia',
        student_report: 'Reporte de Estudiante',
        subject_report: 'Reporte de Materia',
        export_pdf: 'Exportar PDF',
        subject_name: 'Nombre de la Materia',
        subject_code: 'Código de la Materia',
        description: 'Descripción',
        club_name: 'Nombre del Club',
        meeting_time: 'Hora de Reunión',
        cancel: 'Cancelar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        login_success: '¡Inicio de sesión exitoso!',
        login_error: '¡Credenciales inválidas!',
        student_added: '¡Estudiante agregado exitosamente!',
        subject_added: '¡Materia agregada exitosamente!',
        club_added: '¡Club agregado exitosamente!',
        attendance_marked: '¡Asistencia marcada exitosamente!',
        report_generated: '¡Reporte generado exitosamente!',
        confirm_delete: '¿Estás seguro de que quieres eliminar este elemento?',
        required_field: 'Este campo es requerido',
        invalid_email: 'Por favor ingresa un correo electrónico válido'
    },
    fr: {
        dashboard: 'Tableau de Bord',
        students: 'Étudiants',
        subjects: 'Matières',
        clubs: 'Clubs',
        attendance: 'Présence',
        reports: 'Rapports',
        total_students: 'Total Étudiants',
        total_subjects: 'Total Matières',
        total_clubs: 'Total Clubs',
        attendance_rate: 'Taux de Présence',
        add_student: 'Ajouter Étudiant',
        add_subject: 'Ajouter Matière',
        add_club: 'Ajouter Club',
        student_name: 'Nom de l\'Étudiant',
        student_id: 'ID de l\'Étudiant',
        email: 'Email',
        phone: 'Téléphone',
        present: 'Présent',
        absent: 'Absent',
        late: 'En Retard',
        select_subject: 'Sélectionner Matière',
        mark_attendance: 'Marquer Présence',
        attendance_report: 'Rapport de Présence',
        student_report: 'Rapport Étudiant',
        subject_report: 'Rapport Matière',
        export_pdf: 'Exporter PDF',
        subject_name: 'Nom de la Matière',
        subject_code: 'Code de la Matière',
        description: 'Description',
        club_name: 'Nom du Club',
        meeting_time: 'Heure de Réunion',
        cancel: 'Annuler',
        save: 'Sauvegarder',
        edit: 'Modifier',
        delete: 'Supprimer',
        login_success: 'Connexion réussie !',
        login_error: 'Identifiants invalides !',
        student_added: 'Étudiant ajouté avec succès !',
        subject_added: 'Matière ajoutée avec succès !',
        club_added: 'Club ajouté avec succès !',
        attendance_marked: 'Présence marquée avec succès !',
        report_generated: 'Rapport généré avec succès !',
        confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        required_field: 'Ce champ est requis',
        invalid_email: 'Veuillez entrer une adresse email valide'
    },
    de: {
        dashboard: 'Dashboard',
        students: 'Schüler',
        subjects: 'Fächer',
        clubs: 'Vereine',
        attendance: 'Anwesenheit',
        reports: 'Berichte',
        total_students: 'Gesamte Schüler',
        total_subjects: 'Gesamte Fächer',
        total_clubs: 'Gesamte Vereine',
        attendance_rate: 'Anwesenheitsrate',
        add_student: 'Schüler Hinzufügen',
        add_subject: 'Fach Hinzufügen',
        add_club: 'Verein Hinzufügen',
        student_name: 'Schülername',
        student_id: 'Schüler-ID',
        email: 'E-Mail',
        phone: 'Telefon',
        present: 'Anwesend',
        absent: 'Abwesend',
        late: 'Verspätet',
        select_subject: 'Fach Auswählen',
        mark_attendance: 'Anwesenheit Markieren',
        attendance_report: 'Anwesenheitsbericht',
        student_report: 'Schülerbericht',
        subject_report: 'Fachbericht',
        export_pdf: 'PDF Exportieren',
        subject_name: 'Fachname',
        subject_code: 'Fachcode',
        description: 'Beschreibung',
        club_name: 'Vereinsname',
        meeting_time: 'Treffzeit',
        cancel: 'Abbrechen',
        save: 'Speichern',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        login_success: 'Anmeldung erfolgreich!',
        login_error: 'Ungültige Anmeldedaten!',
        student_added: 'Schüler erfolgreich hinzugefügt!',
        subject_added: 'Fach erfolgreich hinzugefügt!',
        club_added: 'Verein erfolgreich hinzugefügt!',
        attendance_marked: 'Anwesenheit erfolgreich markiert!',
        report_generated: 'Bericht erfolgreich generiert!',
        confirm_delete: 'Sind Sie sicher, dass Sie dieses Element löschen möchten?',
        required_field: 'Dieses Feld ist erforderlich',
        invalid_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    },
    tr: {
        dashboard: 'Kontrol Paneli',
        students: 'Öğrenciler',
        subjects: 'Dersler',
        clubs: 'Kulüpler',
        attendance: 'Devam',
        reports: 'Raporlar',
        total_students: 'Toplam Öğrenci',
        total_subjects: 'Toplam Ders',
        total_clubs: 'Toplam Kulüp',
        attendance_rate: 'Devam Oranı',
        add_student: 'Öğrenci Ekle',
        add_subject: 'Ders Ekle',
        add_club: 'Kulüp Ekle',
        student_name: 'Öğrenci Adı',
        student_id: 'Öğrenci No',
        email: 'E-posta',
        phone: 'Telefon',
        present: 'Mevcut',
        absent: 'Yok',
        late: 'Geç',
        select_subject: 'Ders Seç',
        mark_attendance: 'Devam İşaretle',
        attendance_report: 'Devam Raporu',
        student_report: 'Öğrenci Raporu',
        subject_report: 'Ders Raporu',
        export_pdf: 'PDF Dışa Aktar',
        subject_name: 'Ders Adı',
        subject_code: 'Ders Kodu',
        description: 'Açıklama',
        club_name: 'Kulüp Adı',
        meeting_time: 'Toplantı Saati',
        cancel: 'İptal',
        save: 'Kaydet',
        edit: 'Düzenle',
        delete: 'Sil',
        login_success: 'Giriş başarılı!',
        login_error: 'Geçersiz kimlik bilgileri!',
        student_added: 'Öğrenci başarıyla eklendi!',
        subject_added: 'Ders başarıyla eklendi!',
        club_added: 'Kulüp başarıyla eklendi!',
        attendance_marked: 'Devam başarıyla işaretlendi!',
        report_generated: 'Rapor başarıyla oluşturuldu!',
        confirm_delete: 'Bu öğeyi silmek istediğinizden emin misiniz?',
        required_field: 'Bu alan gereklidir',
        invalid_email: 'Lütfen geçerli bir e-posta adresi girin'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadData();
    setupEventListeners();
    updateDashboard();
});

// Initialize application
function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    } else {
        showLoginScreen();
    }
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }
    
    // Set initial language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('languageSelect').value = currentLanguage;
        translatePage();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

// Show main application
function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'grid';
}

// Setup event listeners
function setupEventListeners() {
    // Authentication tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', handleAuthTab);
    });
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Registration form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Language selector
    document.getElementById('languageSelect').addEventListener('change', handleLanguageChange);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Add buttons
    document.getElementById('addStudentBtn').addEventListener('click', () => openModal('addStudentModal'));
    document.getElementById('addSubjectBtn').addEventListener('click', () => toggleQuickAdd('quickAddSubject'));
    document.getElementById('addClubBtn').addEventListener('click', () => toggleQuickAdd('quickAddClub'));
    
    // Quick add forms
    document.getElementById('quickAddSubjectForm').addEventListener('submit', handleQuickAddSubject);
    document.getElementById('quickAddClubForm').addEventListener('submit', handleQuickAddClub);
    
    // Form submissions
    document.getElementById('addStudentForm').addEventListener('submit', handleAddStudent);
    document.getElementById('addSubjectForm').addEventListener('submit', handleAddSubject);
    document.getElementById('addClubForm').addEventListener('submit', handleAddClub);
    document.getElementById('editClubScheduleForm').addEventListener('submit', handleEditClubSchedule);
    
    // Attendance
    document.getElementById('markAttendanceBtn').addEventListener('click', handleMarkAttendance);
    
    // Reports
    document.getElementById('generateReportBtn').addEventListener('click', generateReport);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Cancel buttons in modals
    document.querySelectorAll('.modal .btn-secondary').forEach(cancelBtn => {
        cancelBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
}

// Handle authentication tabs
function handleAuthTab(e) {
    const tab = e.target.getAttribute('data-tab');
    
    // Update tab appearance
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    // Show/hide forms
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById(tab + 'Form').classList.add('active');
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check against registered users
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = { 
            id: user.id,
            username: user.username, 
            email: user.email,
            role: user.role || 'teacher' 
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
        showAlert('login_success', 'success');
    } else {
        showAlert('login_error', 'error');
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showAlert('Username already exists', 'error');
        return;
    }
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showAlert('Email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        username: username,
        email: email,
        password: password,
        role: 'teacher',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    // Auto-login after registration
    currentUser = { 
        id: newUser.id,
        username: newUser.username, 
        email: newUser.email,
        role: newUser.role 
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showMainApp();
    showAlert('Account created successfully!', 'success');
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginScreen();
    showAlert('Logged out successfully', 'success');
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Handle language change
function handleLanguageChange(e) {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    translatePage();
}

// Translate page
function translatePage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    const section = e.currentTarget.getAttribute('data-section');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    // Update content based on section
    switch(section) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'students':
            renderStudents();
            break;
        case 'subjects':
            renderSubjects();
            break;
        case 'clubs':
            renderClubs();
            break;
        case 'attendance':
            renderAttendance();
            break;
        case 'reports':
            renderReports();
            break;
    }
}

// Load data from localStorage
function loadData() {
    students = JSON.parse(localStorage.getItem('students')) || [];
    subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    clubs = JSON.parse(localStorage.getItem('clubs')) || [];
    attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add default demo user if no users exist
    if (users.length === 0) {
        users.push({
            id: 'demo',
            username: 'teacher',
            email: 'teacher@school.com',
            password: 'password123',
            role: 'teacher',
            createdAt: new Date().toISOString()
        });
        saveData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('clubs', JSON.stringify(clubs));
    localStorage.setItem('attendance', JSON.stringify(attendance));
    localStorage.setItem('users', JSON.stringify(users));
}

// Update dashboard
function updateDashboard() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalSubjects').textContent = subjects.length;
    document.getElementById('totalClubs').textContent = clubs.length;
    
    // Calculate attendance rate
    const totalAttendanceRecords = attendance.length;
    const presentRecords = attendance.filter(record => record.status === 'present').length;
    const attendanceRate = totalAttendanceRecords > 0 ? Math.round((presentRecords / totalAttendanceRecords) * 100) : 0;
    document.getElementById('attendanceRate').textContent = attendanceRate + '%';
}

// Render students
function renderStudents() {
    const container = document.getElementById('studentsGrid');
    container.innerHTML = '';
    
    students.forEach(student => {
        const studentCard = createStudentCard(student);
        container.appendChild(studentCard);
    });
}

// Create student card
function createStudentCard(student) {
    const studentSubjects = student.subjects ? student.subjects.map(subjectId => {
        const subject = subjects.find(s => s.id === subjectId);
        return subject ? subject.name : 'Unknown';
    }).join(', ') : 'None';
    
    const studentClubs = student.clubs ? student.clubs.map(clubId => {
        const club = clubs.find(c => c.id === clubId);
        return club ? club.name : 'Unknown';
    }).join(', ') : 'None';
    
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${student.name}</h3>
            <div class="card-actions">
                <button class="btn btn-sm btn-secondary" onclick="editStudent('${student.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="card-content">
            <p><strong>Student ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${student.phone || 'N/A'}</p>
            <p><strong>Subjects:</strong> ${studentSubjects}</p>
            <p><strong>Clubs:</strong> ${studentClubs}</p>
        </div>
    `;
    return card;
}

// Render subjects
function renderSubjects() {
    const container = document.getElementById('subjectsGrid');
    container.innerHTML = '';
    
    subjects.forEach(subject => {
        const subjectCard = createSubjectCard(subject);
        container.appendChild(subjectCard);
    });
}

// Create subject card
function createSubjectCard(subject) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${subject.name}</h3>
            <div class="card-actions">
                <button class="btn btn-sm btn-secondary" onclick="editSubject('${subject.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSubject('${subject.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="card-content">
            <p><strong>Code:</strong> ${subject.code}</p>
            <p><strong>Description:</strong> ${subject.description || 'N/A'}</p>
        </div>
    `;
    return card;
}

// Render clubs
function renderClubs() {
    const container = document.getElementById('clubsGrid');
    container.innerHTML = '';
    
    clubs.forEach(club => {
        const clubCard = createClubCard(club);
        container.appendChild(clubCard);
    });
}

// Create club card
function createClubCard(club) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${club.name}</h3>
            <div class="card-actions">
                <button class="btn btn-sm btn-secondary" onclick="editClubSchedule('${club.id}')" title="Edit Schedule">
                    <i class="fas fa-clock"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="editClub('${club.id}')" title="Edit Club">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteClub('${club.id}')" title="Delete Club">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="card-content">
            <p><strong>Description:</strong> ${club.description || 'N/A'}</p>
            <p><strong>Meeting Time:</strong> ${club.meetingTime || 'N/A'}</p>
            <p><strong>Schedule:</strong> ${club.schedule || 'Not set'}</p>
        </div>
    `;
    return card;
}

// Render attendance
function renderAttendance() {
    // Update subject dropdown
    const subjectSelect = document.getElementById('attendanceSubject');
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });
    
    // Set today's date
    document.getElementById('attendanceDate').value = new Date().toISOString().split('T')[0];
    
    // Render attendance table
    renderAttendanceTable();
}

// Render attendance table
function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td><input type="radio" name="attendance_${student.id}" value="present" class="attendance-checkbox"></td>
            <td><input type="radio" name="attendance_${student.id}" value="absent" class="attendance-checkbox"></td>
            <td><input type="radio" name="attendance_${student.id}" value="late" class="attendance-checkbox"></td>
        `;
        tbody.appendChild(row);
    });
}

// Handle add student
function handleAddStudent(e) {
    e.preventDefault();
    
    const student = {
        id: generateId(),
        name: document.getElementById('studentName').value,
        studentId: document.getElementById('studentId').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        subjects: getSelectedCheckboxes('studentSubjects'),
        clubs: getSelectedCheckboxes('studentClubs')
    };
    
    students.push(student);
    saveData();
    closeModal();
    showAlert('student_added', 'success');
    renderStudents();
    updateDashboard();
    
    // Clear form
    document.getElementById('addStudentForm').reset();
}

// Handle add subject
function handleAddSubject(e) {
    e.preventDefault();
    
    const subject = {
        id: generateId(),
        name: document.getElementById('subjectName').value,
        code: document.getElementById('subjectCode').value,
        description: document.getElementById('subjectDescription').value
    };
    
    subjects.push(subject);
    saveData();
    closeModal();
    showAlert('subject_added', 'success');
    renderSubjects();
    updateDashboard();
    
    // Clear form
    document.getElementById('addSubjectForm').reset();
}

// Handle add club
function handleAddClub(e) {
    e.preventDefault();
    
    const club = {
        id: generateId(),
        name: document.getElementById('clubName').value,
        description: document.getElementById('clubDescription').value,
        meetingTime: document.getElementById('clubMeetingTime').value
    };
    
    clubs.push(club);
    saveData();
    closeModal();
    showAlert('club_added', 'success');
    renderClubs();
    updateDashboard();
    
    // Clear form
    document.getElementById('addClubForm').reset();
}

// Handle mark attendance
function handleMarkAttendance() {
    const subjectId = document.getElementById('attendanceSubject').value;
    const date = document.getElementById('attendanceDate').value;
    
    if (!subjectId || !date) {
        showAlert('Please select subject and date', 'error');
        return;
    }
    
    const attendanceRecords = [];
    
    students.forEach(student => {
        const attendanceInput = document.querySelector(`input[name="attendance_${student.id}"]:checked`);
        if (attendanceInput) {
            attendanceRecords.push({
                id: generateId(),
                studentId: student.id,
                subjectId: subjectId,
                date: date,
                status: attendanceInput.value
            });
        }
    });
    
    attendance.push(...attendanceRecords);
    saveData();
    showAlert('attendance_marked', 'success');
    updateDashboard();
}

// Generate report
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    if (!startDate || !endDate) {
        showAlert('Please select start and end dates', 'error');
        return;
    }
    
    let reportContent = '';
    
    switch(reportType) {
        case 'attendance':
            reportContent = generateAttendanceReport(startDate, endDate);
            break;
        case 'student':
            reportContent = generateStudentReport(startDate, endDate);
            break;
        case 'subject':
            reportContent = generateSubjectReport(startDate, endDate);
            break;
    }
    
    document.getElementById('reportContent').innerHTML = reportContent;
    
    // Generate PDF
    generatePDF(reportContent, `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Generate attendance report
function generateAttendanceReport(startDate, endDate) {
    const filteredAttendance = attendance.filter(record => 
        record.date >= startDate && record.date <= endDate
    );
    
    // Group attendance by date and subject
    const attendanceByDate = {};
    filteredAttendance.forEach(record => {
        if (!attendanceByDate[record.date]) {
            attendanceByDate[record.date] = {};
        }
        const subject = subjects.find(s => s.id === record.subjectId);
        const subjectName = subject ? subject.name : 'Unknown';
        if (!attendanceByDate[record.date][subjectName]) {
            attendanceByDate[record.date][subjectName] = [];
        }
        attendanceByDate[record.date][subjectName].push(record);
    });
    
    let html = `
        <h2>Comprehensive Attendance Report</h2>
        <p><strong>Period:</strong> ${startDate} to ${endDate}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Total Records:</strong> ${filteredAttendance.length}</p>
        <hr>
    `;
    
    // Summary statistics
    const presentCount = filteredAttendance.filter(record => record.status === 'present').length;
    const absentCount = filteredAttendance.filter(record => record.status === 'absent').length;
    const lateCount = filteredAttendance.filter(record => record.status === 'late').length;
    const totalCount = filteredAttendance.length;
    const overallRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    html += `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px;">Overall Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center;">
                <div style="background-color: #e8f5e8; padding: 10px; border-radius: 5px;">
                    <strong>Present</strong><br><span style="font-size: 1.5em;">${presentCount}</span>
                </div>
                <div style="background-color: #ffe8e8; padding: 10px; border-radius: 5px;">
                    <strong>Absent</strong><br><span style="font-size: 1.5em;">${absentCount}</span>
                </div>
                <div style="background-color: #fff3e8; padding: 10px; border-radius: 5px;">
                    <strong>Late</strong><br><span style="font-size: 1.5em;">${lateCount}</span>
                </div>
                <div style="background-color: #e8f0ff; padding: 10px; border-radius: 5px;">
                    <strong>Rate</strong><br><span style="font-size: 1.5em;">${overallRate}%</span>
                </div>
            </div>
        </div>
    `;
    
    // Detailed attendance by date and subject
    Object.keys(attendanceByDate).sort().forEach(date => {
        const dateAttendance = attendanceByDate[date];
        html += `
            <div style="margin-bottom: 25px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #333; color: white; padding: 10px;">
                    <h3 style="margin: 0;">${new Date(date).toLocaleDateString()}</h3>
                </div>
        `;
        
        Object.keys(dateAttendance).forEach(subjectName => {
            const subjectRecords = dateAttendance[subjectName];
            const subjectPresent = subjectRecords.filter(r => r.status === 'present').length;
            const subjectAbsent = subjectRecords.filter(r => r.status === 'absent').length;
            const subjectLate = subjectRecords.filter(r => r.status === 'late').length;
            const subjectTotal = subjectRecords.length;
            const subjectRate = subjectTotal > 0 ? Math.round((subjectPresent / subjectTotal) * 100) : 0;
            
            html += `
                <div style="padding: 15px; border-bottom: 1px solid #eee;">
                    <h4 style="margin-bottom: 10px; color: #555;">${subjectName}</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 15px;">
                        <div style="text-align: center; padding: 8px; background-color: #e8f5e8; border-radius: 4px;">
                            <strong>Present</strong><br>${subjectPresent}
                        </div>
                        <div style="text-align: center; padding: 8px; background-color: #ffe8e8; border-radius: 4px;">
                            <strong>Absent</strong><br>${subjectAbsent}
                        </div>
                        <div style="text-align: center; padding: 8px; background-color: #fff3e8; border-radius: 4px;">
                            <strong>Late</strong><br>${subjectLate}
                        </div>
                        <div style="text-align: center; padding: 8px; background-color: #e8f0ff; border-radius: 4px;">
                            <strong>Rate</strong><br>${subjectRate}%
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr style="background-color: #f0f0f0;">
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Student</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Status</th>
                        </tr>
                        ${subjectRecords.map(record => {
                            const student = students.find(s => s.id === record.studentId);
                            const statusColor = record.status === 'present' ? '#e8f5e8' : 
                                             record.status === 'absent' ? '#ffe8e8' : '#fff3e8';
                            return `
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${student ? student.name : 'Unknown'}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center; background-color: ${statusColor};">${record.status}</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
            `;
        });
        
        html += '</div>';
    });
    
    return html;
}

// Generate student report
function generateStudentReport(startDate, endDate) {
    let html = `
        <h2>Comprehensive Student Report</h2>
        <p><strong>Period:</strong> ${startDate} to ${endDate}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <hr>
    `;
    
    students.forEach(student => {
        const studentAttendance = attendance.filter(record => 
            record.studentId === student.id && 
            record.date >= startDate && 
            record.date <= endDate
        );
        
        const presentCount = studentAttendance.filter(record => record.status === 'present').length;
        const absentCount = studentAttendance.filter(record => record.status === 'absent').length;
        const lateCount = studentAttendance.filter(record => record.status === 'late').length;
        const totalCount = studentAttendance.length;
        const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
        
        // Get student's subjects and clubs
        const studentSubjects = student.subjects ? student.subjects.map(subjectId => {
            const subject = subjects.find(s => s.id === subjectId);
            return subject ? subject.name : 'Unknown';
        }).join(', ') : 'None';
        
        const studentClubs = student.clubs ? student.clubs.map(clubId => {
            const club = clubs.find(c => c.id === clubId);
            return club ? club.name : 'Unknown';
        }).join(', ') : 'None';
        
        // Get attendance by subject
        const attendanceBySubject = {};
        studentAttendance.forEach(record => {
            const subject = subjects.find(s => s.id === record.subjectId);
            if (subject) {
                if (!attendanceBySubject[subject.name]) {
                    attendanceBySubject[subject.name] = { present: 0, absent: 0, late: 0, total: 0 };
                }
                attendanceBySubject[subject.name][record.status]++;
                attendanceBySubject[subject.name].total++;
            }
        });
        
        html += `
            <div style="margin-bottom: 30px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h3 style="color: #333; margin-bottom: 10px;">${student.name}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p><strong>Student ID:</strong> ${student.studentId}</p>
                        <p><strong>Email:</strong> ${student.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${student.phone || 'N/A'}</p>
                    </div>
                    <div>
                        <p><strong>Subjects:</strong> ${studentSubjects}</p>
                        <p><strong>Clubs:</strong> ${studentClubs}</p>
                    </div>
                </div>
                
                <div style="background-color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 10px; color: #555;">Overall Attendance Summary</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                        <div style="background-color: #e8f5e8; padding: 8px; border-radius: 4px;">
                            <strong>Present</strong><br>${presentCount}
                        </div>
                        <div style="background-color: #ffe8e8; padding: 8px; border-radius: 4px;">
                            <strong>Absent</strong><br>${absentCount}
                        </div>
                        <div style="background-color: #fff3e8; padding: 8px; border-radius: 4px;">
                            <strong>Late</strong><br>${lateCount}
                        </div>
                        <div style="background-color: #e8f0ff; padding: 8px; border-radius: 4px;">
                            <strong>Rate</strong><br>${attendanceRate}%
                        </div>
                    </div>
                </div>
                
                ${Object.keys(attendanceBySubject).length > 0 ? `
                <div style="background-color: white; padding: 10px; border-radius: 5px;">
                    <h4 style="margin-bottom: 10px; color: #555;">Attendance by Subject</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr style="background-color: #f0f0f0;">
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Subject</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Present</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Absent</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Late</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Rate</th>
                        </tr>
                        ${Object.entries(attendanceBySubject).map(([subjectName, stats]) => {
                            const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
                            return `
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${subjectName}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.present}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.absent}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.late}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${rate}%</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
                ` : '<p style="color: #666; font-style: italic;">No attendance records for this period.</p>'}
            </div>
        `;
    });
    
    return html;
}

// Generate subject report
function generateSubjectReport(startDate, endDate) {
    let html = `
        <h2>Comprehensive Subject Report</h2>
        <p><strong>Period:</strong> ${startDate} to ${endDate}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <hr>
    `;
    
    subjects.forEach(subject => {
        const subjectAttendance = attendance.filter(record => 
            record.subjectId === subject.id && 
            record.date >= startDate && 
            record.date <= endDate
        );
        
        const presentCount = subjectAttendance.filter(record => record.status === 'present').length;
        const absentCount = subjectAttendance.filter(record => record.status === 'absent').length;
        const lateCount = subjectAttendance.filter(record => record.status === 'late').length;
        const totalCount = subjectAttendance.length;
        const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
        
        // Get students enrolled in this subject
        const enrolledStudents = students.filter(student => 
            student.subjects && student.subjects.includes(subject.id)
        );
        
        // Get attendance by student
        const attendanceByStudent = {};
        subjectAttendance.forEach(record => {
            const student = students.find(s => s.id === record.studentId);
            if (student) {
                if (!attendanceByStudent[student.name]) {
                    attendanceByStudent[student.name] = { present: 0, absent: 0, late: 0, total: 0 };
                }
                attendanceByStudent[student.name][record.status]++;
                attendanceByStudent[student.name].total++;
            }
        });
        
        html += `
            <div style="margin-bottom: 30px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h3 style="color: #333; margin-bottom: 10px;">${subject.name}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p><strong>Subject Code:</strong> ${subject.code}</p>
                        <p><strong>Description:</strong> ${subject.description || 'N/A'}</p>
                        <p><strong>Enrolled Students:</strong> ${enrolledStudents.length}</p>
                    </div>
                    <div>
                        <p><strong>Total Attendance Records:</strong> ${totalCount}</p>
                        <p><strong>Overall Attendance Rate:</strong> ${attendanceRate}%</p>
                    </div>
                </div>
                
                <div style="background-color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 10px; color: #555;">Subject Attendance Summary</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                        <div style="background-color: #e8f5e8; padding: 8px; border-radius: 4px;">
                            <strong>Present</strong><br>${presentCount}
                        </div>
                        <div style="background-color: #ffe8e8; padding: 8px; border-radius: 4px;">
                            <strong>Absent</strong><br>${absentCount}
                        </div>
                        <div style="background-color: #fff3e8; padding: 8px; border-radius: 4px;">
                            <strong>Late</strong><br>${lateCount}
                        </div>
                        <div style="background-color: #e8f0ff; padding: 8px; border-radius: 4px;">
                            <strong>Rate</strong><br>${attendanceRate}%
                        </div>
                    </div>
                </div>
                
                ${enrolledStudents.length > 0 ? `
                <div style="background-color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 10px; color: #555;">Enrolled Students</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
                        ${enrolledStudents.map(student => `
                            <div style="padding: 8px; background-color: #f0f8ff; border-radius: 4px; border: 1px solid #ddd;">
                                <strong>${student.name}</strong><br>
                                <small>ID: ${student.studentId}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${Object.keys(attendanceByStudent).length > 0 ? `
                <div style="background-color: white; padding: 10px; border-radius: 5px;">
                    <h4 style="margin-bottom: 10px; color: #555;">Student Attendance Breakdown</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr style="background-color: #f0f0f0;">
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Student</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Present</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Absent</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Late</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Rate</th>
                        </tr>
                        ${Object.entries(attendanceByStudent).map(([studentName, stats]) => {
                            const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
                            return `
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${studentName}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.present}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.absent}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.late}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${rate}%</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
                ` : '<p style="color: #666; font-style: italic;">No attendance records for this period.</p>'}
            </div>
        `;
    });
    
    return html;
}

// Generate PDF
function generatePDF(content, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.html(content, {
        callback: function(doc) {
            doc.save(filename);
        },
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650
    });
    
    showAlert('report_generated', 'success');
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getSelectedCheckboxes(containerId) {
    const container = document.getElementById(containerId);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    
    // Populate checkboxes for student form
    if (modalId === 'addStudentModal') {
        populateSubjectCheckboxes();
        populateClubCheckboxes();
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function populateSubjectCheckboxes() {
    const container = document.getElementById('studentSubjects');
    container.innerHTML = '';
    
    subjects.forEach(subject => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="subject_${subject.id}" value="${subject.id}">
            <label for="subject_${subject.id}">${subject.name}</label>
        `;
        container.appendChild(checkboxItem);
    });
}

function populateClubCheckboxes() {
    const container = document.getElementById('studentClubs');
    container.innerHTML = '';
    
    clubs.forEach(club => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="club_${club.id}" value="${club.id}">
            <label for="club_${club.id}">${club.name}</label>
        `;
        container.appendChild(checkboxItem);
    });
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Delete functions
function deleteStudent(id) {
    if (confirm(translations[currentLanguage].confirm_delete)) {
        students = students.filter(student => student.id !== id);
        saveData();
        renderStudents();
        updateDashboard();
    }
}

function deleteSubject(id) {
    if (confirm(translations[currentLanguage].confirm_delete)) {
        subjects = subjects.filter(subject => subject.id !== id);
        saveData();
        renderSubjects();
        updateDashboard();
    }
}

function deleteClub(id) {
    if (confirm(translations[currentLanguage].confirm_delete)) {
        clubs = clubs.filter(club => club.id !== id);
        saveData();
        renderClubs();
        updateDashboard();
    }
}

// Edit functions (placeholder - would need modal forms)
function editStudent(id) {
    // Implementation for editing student
    console.log('Edit student:', id);
}

function editSubject(id) {
    // Implementation for editing subject
    console.log('Edit subject:', id);
}

function editClub(id) {
    // Implementation for editing club
    console.log('Edit club:', id);
}

// Edit club schedule
function editClubSchedule(id) {
    const club = clubs.find(c => c.id === id);
    if (!club) return;
    
    // Populate the modal with current club data
    document.getElementById('editClubName').value = club.name;
    document.getElementById('editCurrentSchedule').value = club.schedule || 'Not set';
    document.getElementById('editNewSchedule').value = club.schedule || '';
    document.getElementById('editMeetingTime').value = club.meetingTime || '';
    document.getElementById('editDuration').value = club.duration || 60;
    
    // Clear previous selections
    document.querySelectorAll('#editClubScheduleForm input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Open the modal
    document.getElementById('editClubScheduleModal').style.display = 'block';
    
    // Store the club ID for the form submission
    document.getElementById('editClubScheduleForm').setAttribute('data-club-id', id);
}

// Handle club schedule update
function handleEditClubSchedule(e) {
    e.preventDefault();
    
    const clubId = document.getElementById('editClubScheduleForm').getAttribute('data-club-id');
    const club = clubs.find(c => c.id === clubId);
    
    if (!club) return;
    
    // Get form data
    const newSchedule = document.getElementById('editNewSchedule').value;
    const meetingTime = document.getElementById('editMeetingTime').value;
    const duration = document.getElementById('editDuration').value;
    
    // Get selected days
    const selectedDays = Array.from(document.querySelectorAll('#editClubScheduleForm input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    // Update club data
    club.schedule = newSchedule;
    club.meetingTime = meetingTime;
    club.duration = parseInt(duration);
    club.meetingDays = selectedDays;
    
    // Generate a formatted schedule string
    let scheduleText = '';
    if (selectedDays.length > 0) {
        scheduleText = `Meets on: ${selectedDays.join(', ')}`;
        if (meetingTime) {
            scheduleText += ` at ${meetingTime}`;
        }
        if (duration) {
            scheduleText += ` (${duration} minutes)`;
        }
    }
    if (newSchedule) {
        scheduleText += scheduleText ? `\nDetails: ${newSchedule}` : newSchedule;
    }
    
    club.schedule = scheduleText;
    
    // Save and update
    saveData();
    closeModal();
    showAlert('Club schedule updated successfully!', 'success');
    renderClubs();
}

// Render reports section
function renderReports() {
    // Set default dates
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    document.getElementById('reportStartDate').value = lastMonth.toISOString().split('T')[0];
    document.getElementById('reportEndDate').value = today.toISOString().split('T')[0];
}

// Toggle quick add forms
function toggleQuickAdd(formId) {
    const form = document.getElementById(formId);
    const isVisible = form.style.display !== 'none';
    
    // Hide all quick add forms first
    document.querySelectorAll('.quick-add-card').forEach(card => {
        card.style.display = 'none';
    });
    
    // Show the requested form if it wasn't visible
    if (!isVisible) {
        form.style.display = 'block';
    }
}

// Close quick add form
function closeQuickAdd(formId) {
    document.getElementById(formId).style.display = 'none';
}

// Handle quick add subject
function handleQuickAddSubject(e) {
    e.preventDefault();
    
    const subject = {
        id: generateId(),
        name: document.getElementById('quickSubjectName').value,
        code: document.getElementById('quickSubjectCode').value,
        description: ''
    };
    
    subjects.push(subject);
    saveData();
    closeQuickAdd('quickAddSubject');
    showAlert('subject_added', 'success');
    renderSubjects();
    updateDashboard();
    
    // Clear form
    document.getElementById('quickAddSubjectForm').reset();
}

// Handle quick add club
function handleQuickAddClub(e) {
    e.preventDefault();
    
    const club = {
        id: generateId(),
        name: document.getElementById('quickClubName').value,
        description: document.getElementById('quickClubDescription').value,
        meetingTime: document.getElementById('quickClubMeetingTime').value
    };
    
    clubs.push(club);
    saveData();
    closeQuickAdd('quickAddClub');
    showAlert('club_added', 'success');
    renderClubs();
    updateDashboard();
    
    // Clear form
    document.getElementById('quickAddClubForm').reset();
}

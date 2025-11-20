// Data Management
class DataManager {
    constructor() {
        this.students = this.loadData('students') || [];
        this.sections = this.loadData('sections') || [];
        this.attendance = this.loadData('attendance') || [];
        this.initializeDefaultData();
    }

    loadData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    initializeDefaultData() {
        if (this.sections.length === 0) {
            this.sections = [
                { id: 1, name: 'Art', code: 'ART101', description: 'Visual Arts and Creative Design' },
                { id: 2, name: 'Sports', code: 'SPT101', description: 'Physical Education and Athletics' },
                { id: 3, name: 'Science', code: 'SCI101', description: 'General Science and Research' },
                { id: 4, name: 'Mathematics', code: 'MTH101', description: 'Advanced Mathematics' }
            ];
            this.saveData('sections', this.sections);
        }

        if (this.students.length === 0) {
            this.students = [
                { id: 1001, name: 'John Doe', section: 'ART101', grade: '10', contact: 'john@email.com' },
                { id: 1002, name: 'Jane Smith', section: 'SPT101', grade: '11', contact: 'jane@email.com' },
                { id: 1003, name: 'Mike Johnson', section: 'SCI101', grade: '10', contact: 'mike@email.com' },
                { id: 1004, name: 'Emily Brown', section: 'MTH101', grade: '12', contact: 'emily@email.com' }
            ];
            this.saveData('students', this.students);
        }
    }

    // Student Methods
    addStudent(student) {
        const newId = this.students.length > 0 
            ? Math.max(...this.students.map(s => s.id)) + 1 
            : 1001;
        student.id = newId;
        this.students.push(student);
        this.saveData('students', this.students);
        return student;
    }

    updateStudent(id, updatedStudent) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...updatedStudent };
            this.saveData('students', this.students);
            return true;
        }
        return false;
    }

    deleteStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        this.saveData('students', this.students);
    }

    getStudentsBySection(sectionCode) {
        return this.students.filter(s => s.section === sectionCode);
    }

    // Section Methods
    addSection(section) {
        const newId = this.sections.length > 0 
            ? Math.max(...this.sections.map(s => s.id)) + 1 
            : 1;
        section.id = newId;
        this.sections.push(section);
        this.saveData('sections', this.sections);
        return section;
    }

    updateSection(id, updatedSection) {
        const index = this.sections.findIndex(s => s.id === id);
        if (index !== -1) {
            this.sections[index] = { ...this.sections[index], ...updatedSection };
            this.saveData('sections', this.sections);
            return true;
        }
        return false;
    }

    deleteSection(id) {
        this.sections = this.sections.filter(s => s.id !== id);
        this.saveData('sections', this.sections);
    }

    getSectionByCode(code) {
        return this.sections.find(s => s.code === code);
    }

    // Attendance Methods
    markAttendance(studentId, date, status) {
        const existingIndex = this.attendance.findIndex(
            a => a.studentId === studentId && a.date === date
        );

        if (existingIndex !== -1) {
            this.attendance[existingIndex].status = status;
        } else {
            this.attendance.push({ studentId, date, status });
        }
        this.saveData('attendance', this.attendance);
    }

    getAttendance(studentId, date) {
        return this.attendance.find(
            a => a.studentId === studentId && a.date === date
        );
    }

    getAttendanceByDate(date) {
        return this.attendance.filter(a => a.date === date);
    }

    getAttendanceByDateRange(startDate, endDate) {
        return this.attendance.filter(a => a.date >= startDate && a.date <= endDate);
    }

    calculateAttendancePercentage(studentId, startDate = null, endDate = null) {
        let records;
        if (startDate && endDate) {
            records = this.attendance.filter(
                a => a.studentId === studentId && a.date >= startDate && a.date <= endDate
            );
        } else {
            records = this.attendance.filter(a => a.studentId === studentId);
        }

        if (records.length === 0) return 0;

        const presentCount = records.filter(
            r => r.status === 'present' || r.status === 'late'
        ).length;

        return Math.round((presentCount / records.length) * 100);
    }

    calculateSectionAttendance(sectionCode, date) {
        const students = this.getStudentsBySection(sectionCode);
        if (students.length === 0) return 0;

        const presentCount = students.filter(student => {
            const record = this.getAttendance(student.id, date);
            return record && (record.status === 'present' || record.status === 'late');
        }).length;

        return Math.round((presentCount / students.length) * 100);
    }
}

// Application Controller
class App {
    constructor() {
        this.dataManager = new DataManager();
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkLogin();
    }

    setupEventListeners() {
        // Login
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.navigateTo(e.target.closest('.nav-btn').dataset.page));
        });

        // Student Management
        document.getElementById('addStudentBtn').addEventListener('click', () => this.openStudentModal());
        document.getElementById('studentForm').addEventListener('submit', (e) => this.handleStudentSubmit(e));
        document.getElementById('studentSearch').addEventListener('input', (e) => this.searchStudents(e.target.value));
        document.getElementById('importStudentsBtn').addEventListener('click', () => this.openImportModal());
        document.getElementById('exportStudentsBtn').addEventListener('click', () => this.exportStudents());

        // Section Management
        document.getElementById('addSectionBtn').addEventListener('click', () => this.openSectionModal());
        document.getElementById('sectionForm').addEventListener('submit', (e) => this.handleSectionSubmit(e));
        document.getElementById('sectionSearch').addEventListener('input', (e) => this.searchSections(e.target.value));

        // Attendance
        document.getElementById('attendanceSection').addEventListener('change', (e) => this.loadAttendanceForSection(e.target.value));
        document.getElementById('attendanceDate').valueAsDate = new Date();
        document.getElementById('markAttendanceBtn').addEventListener('click', () => this.loadAttendanceForSection(document.getElementById('attendanceSection').value));

        // Reports
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());
        document.getElementById('exportReportBtn').addEventListener('click', () => this.exportReport());

        // Import CSV
        document.getElementById('uploadCsvBtn').addEventListener('click', () => this.importCSV());

        // Modal Close Buttons
        document.querySelectorAll('.close, .btn-secondary[data-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = btn.dataset.modal || btn.parentElement.parentElement.parentElement.id;
                this.closeModal(modalId);
            });
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
    }

    // Authentication
    checkLogin() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            this.showMainApp();
        } else {
            this.showLogin();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in production, use proper backend authentication)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isLoggedIn', 'true');
            this.showMainApp();
        } else {
            alert('Invalid credentials! Use admin / admin123');
        }
    }

    handleLogout() {
        localStorage.setItem('isLoggedIn', 'false');
        this.showLogin();
    }

    showLogin() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        this.navigateTo('dashboard');
    }

    // Navigation
    navigateTo(page) {
        this.currentPage = page;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        // Update pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.toggle('active', p.id === page + 'Page');
        });

        // Load page content
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'students':
                this.loadStudents();
                break;
            case 'sections':
                this.loadSections();
                break;
            case 'attendance':
                this.loadAttendancePage();
                break;
            case 'reports':
                this.loadReportsPage();
                break;
        }
    }

    // Dashboard
    loadDashboard() {
        // Update stats
        document.getElementById('totalStudents').textContent = this.dataManager.students.length;
        document.getElementById('totalSections').textContent = this.dataManager.sections.length;
        
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('todayDate').textContent = new Date().toLocaleDateString();

        // Calculate average attendance
        let totalPercentage = 0;
        let count = 0;
        this.dataManager.students.forEach(student => {
            const percentage = this.dataManager.calculateAttendancePercentage(student.id);
            if (percentage > 0) {
                totalPercentage += percentage;
                count++;
            }
        });
        const avgAttendance = count > 0 ? Math.round(totalPercentage / count) : 0;
        document.getElementById('avgAttendance').textContent = avgAttendance + '%';

        // Recent Attendance
        this.loadRecentAttendance();

        // Sections Overview
        this.loadSectionsOverview();
    }

    loadRecentAttendance() {
        const container = document.getElementById('recentAttendance');
        const today = new Date().toISOString().split('T')[0];
        const recentRecords = this.dataManager.getAttendanceByDate(today);

        if (recentRecords.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No attendance records for today</p></div>';
            return;
        }

        let html = '';
        recentRecords.slice(0, 5).forEach(record => {
            const student = this.dataManager.students.find(s => s.id === record.studentId);
            if (student) {
                html += `
                    <div class="list-item">
                        <div class="list-item-info">
                            <h4>${student.name}</h4>
                            <p>${student.section}</p>
                        </div>
                        <span class="badge ${record.status}">${record.status.toUpperCase()}</span>
                    </div>
                `;
            }
        });
        container.innerHTML = html;
    }

    loadSectionsOverview() {
        const container = document.getElementById('sectionsOverview');
        let html = '';

        this.dataManager.sections.forEach(section => {
            const studentCount = this.dataManager.getStudentsBySection(section.code).length;
            html += `
                <div class="list-item">
                    <div class="list-item-info">
                        <h4>${section.name}</h4>
                        <p>${section.code} - ${studentCount} students</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<div class="empty-state"><p>No sections available</p></div>';
    }

    // Students Management
    loadStudents() {
        this.renderStudentsTable(this.dataManager.students);
        this.populateSectionSelects();
    }

    renderStudentsTable(students) {
        const tbody = document.getElementById('studentsTableBody');
        
        if (students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No students found</td></tr>';
            return;
        }

        let html = '';
        students.forEach(student => {
            const section = this.dataManager.getSectionByCode(student.section);
            const sectionName = section ? section.name : student.section;
            const attendance = this.dataManager.calculateAttendancePercentage(student.id);
            
            html += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${sectionName} (${student.section})</td>
                    <td>${student.grade}</td>
                    <td>${student.contact || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="app.editStudent(${student.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="app.deleteStudentConfirm(${student.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    }

    searchStudents(query) {
        const filtered = this.dataManager.students.filter(student =>
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.id.toString().includes(query) ||
            student.section.toLowerCase().includes(query.toLowerCase())
        );
        this.renderStudentsTable(filtered);
    }

    openStudentModal(student = null) {
        const modal = document.getElementById('studentModal');
        const title = document.getElementById('studentModalTitle');
        const form = document.getElementById('studentForm');
        
        form.reset();
        
        if (student) {
            title.textContent = 'Edit Student';
            document.getElementById('studentId').value = student.id;
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentSection').value = student.section;
            document.getElementById('studentGrade').value = student.grade;
            document.getElementById('studentContact').value = student.contact || '';
        } else {
            title.textContent = 'Add Student';
            document.getElementById('studentId').value = '';
        }
        
        modal.classList.add('active');
    }

    handleStudentSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('studentId').value;
        const student = {
            name: document.getElementById('studentName').value,
            section: document.getElementById('studentSection').value,
            grade: document.getElementById('studentGrade').value,
            contact: document.getElementById('studentContact').value
        };

        if (id) {
            this.dataManager.updateStudent(parseInt(id), student);
        } else {
            this.dataManager.addStudent(student);
        }

        this.closeModal('studentModal');
        this.loadStudents();
        this.showNotification('Student saved successfully!');
    }

    editStudent(id) {
        const student = this.dataManager.students.find(s => s.id === id);
        if (student) {
            this.openStudentModal(student);
        }
    }

    deleteStudentConfirm(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            this.dataManager.deleteStudent(id);
            this.loadStudents();
            this.showNotification('Student deleted successfully!');
        }
    }

    // Sections Management
    loadSections() {
        this.renderSectionsGrid(this.dataManager.sections);
    }

    renderSectionsGrid(sections) {
        const grid = document.getElementById('sectionsGrid');
        
        if (sections.length === 0) {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-layer-group"></i><p>No sections found</p></div>';
            return;
        }

        let html = '';
        sections.forEach(section => {
            const studentCount = this.dataManager.getStudentsBySection(section.code).length;
            
            html += `
                <div class="section-card">
                    <h3>${section.name}</h3>
                    <span class="section-code">${section.code}</span>
                    <p class="section-description">${section.description || 'No description'}</p>
                    <div class="section-stats">
                        <span><i class="fas fa-users"></i> ${studentCount} Students</span>
                    </div>
                    <div class="section-actions">
                        <button class="btn btn-sm btn-primary" onclick="app.editSection(${section.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="app.deleteSectionConfirm(${section.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    searchSections(query) {
        const filtered = this.dataManager.sections.filter(section =>
            section.name.toLowerCase().includes(query.toLowerCase()) ||
            section.code.toLowerCase().includes(query.toLowerCase())
        );
        this.renderSectionsGrid(filtered);
    }

    openSectionModal(section = null) {
        const modal = document.getElementById('sectionModal');
        const title = document.getElementById('sectionModalTitle');
        const form = document.getElementById('sectionForm');
        
        form.reset();
        
        if (section) {
            title.textContent = 'Edit Section';
            document.getElementById('sectionId').value = section.id;
            document.getElementById('sectionName').value = section.name;
            document.getElementById('sectionCode').value = section.code;
            document.getElementById('sectionDescription').value = section.description || '';
        } else {
            title.textContent = 'Add Section';
            document.getElementById('sectionId').value = '';
        }
        
        modal.classList.add('active');
    }

    handleSectionSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('sectionId').value;
        const section = {
            name: document.getElementById('sectionName').value,
            code: document.getElementById('sectionCode').value.toUpperCase(),
            description: document.getElementById('sectionDescription').value
        };

        // Check for duplicate code
        const existing = this.dataManager.sections.find(
            s => s.code === section.code && s.id !== parseInt(id)
        );
        
        if (existing) {
            alert('Section code already exists!');
            return;
        }

        if (id) {
            this.dataManager.updateSection(parseInt(id), section);
        } else {
            this.dataManager.addSection(section);
        }

        this.closeModal('sectionModal');
        this.loadSections();
        this.populateSectionSelects();
        this.showNotification('Section saved successfully!');
    }

    editSection(id) {
        const section = this.dataManager.sections.find(s => s.id === id);
        if (section) {
            this.openSectionModal(section);
        }
    }

    deleteSectionConfirm(id) {
        const section = this.dataManager.sections.find(s => s.id === id);
        const studentsInSection = this.dataManager.getStudentsBySection(section.code);
        
        if (studentsInSection.length > 0) {
            alert(`Cannot delete section. ${studentsInSection.length} students are assigned to this section.`);
            return;
        }

        if (confirm('Are you sure you want to delete this section?')) {
            this.dataManager.deleteSection(id);
            this.loadSections();
            this.populateSectionSelects();
            this.showNotification('Section deleted successfully!');
        }
    }

    populateSectionSelects() {
        const selects = [
            document.getElementById('studentSection'),
            document.getElementById('attendanceSection'),
            document.getElementById('reportSection')
        ];

        selects.forEach((select, index) => {
            const currentValue = select.value;
            let html = index === 0 ? '<option value="">Select Section</option>' : '<option value="">All Sections</option>';
            
            this.dataManager.sections.forEach(section => {
                html += `<option value="${section.code}">${section.name} (${section.code})</option>`;
            });
            
            select.innerHTML = html;
            if (currentValue) select.value = currentValue;
        });
    }

    // Attendance Management
    loadAttendancePage() {
        this.populateSectionSelects();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('attendanceDate').value = today;
    }

    loadAttendanceForSection(sectionCode) {
        const container = document.getElementById('attendanceContent');
        const date = document.getElementById('attendanceDate').value;

        if (!sectionCode) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-clipboard-check"></i><p>Please select a section</p></div>';
            return;
        }

        const students = this.dataManager.getStudentsBySection(sectionCode);
        
        if (students.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No students in this section</p></div>';
            return;
        }

        let html = '<div class="attendance-table">';
        
        students.forEach(student => {
            const record = this.dataManager.getAttendance(student.id, date);
            const status = record ? record.status : '';
            
            html += `
                <div class="attendance-row">
                    <div class="student-info">
                        <h4>${student.name}</h4>
                        <p>ID: ${student.id} | Grade: ${student.grade}</p>
                    </div>
                    <div class="attendance-buttons">
                        <button class="attendance-btn present ${status === 'present' ? 'active' : ''}" 
                                onclick="app.markStudentAttendance(${student.id}, '${date}', 'present')">
                            <i class="fas fa-check"></i> Present
                        </button>
                        <button class="attendance-btn absent ${status === 'absent' ? 'active' : ''}" 
                                onclick="app.markStudentAttendance(${student.id}, '${date}', 'absent')">
                            <i class="fas fa-times"></i> Absent
                        </button>
                        <button class="attendance-btn late ${status === 'late' ? 'active' : ''}" 
                                onclick="app.markStudentAttendance(${student.id}, '${date}', 'late')">
                            <i class="fas fa-clock"></i> Late
                        </button>
                        <button class="attendance-btn excused ${status === 'excused' ? 'active' : ''}" 
                                onclick="app.markStudentAttendance(${student.id}, '${date}', 'excused')">
                            <i class="fas fa-file-medical"></i> Excused
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    markStudentAttendance(studentId, date, status) {
        this.dataManager.markAttendance(studentId, date, status);
        this.loadAttendanceForSection(document.getElementById('attendanceSection').value);
        this.showNotification('Attendance marked successfully!');
    }

    // Reports
    loadReportsPage() {
        this.populateSectionSelects();
        
        // Set default date range (last 30 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        document.getElementById('reportStartDate').valueAsDate = startDate;
        document.getElementById('reportEndDate').valueAsDate = endDate;
    }

    generateReport() {
        const sectionCode = document.getElementById('reportSection').value;
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const container = document.getElementById('reportContent');

        if (!startDate || !endDate) {
            alert('Please select both start and end dates');
            return;
        }

        let students = sectionCode 
            ? this.dataManager.getStudentsBySection(sectionCode)
            : this.dataManager.students;

        const attendanceRecords = this.dataManager.getAttendanceByDateRange(startDate, endDate);

        // Calculate statistics
        let totalPresent = 0, totalAbsent = 0, totalLate = 0, totalExcused = 0;
        
        const studentStats = students.map(student => {
            const records = attendanceRecords.filter(r => r.studentId === student.id);
            const present = records.filter(r => r.status === 'present').length;
            const absent = records.filter(r => r.status === 'absent').length;
            const late = records.filter(r => r.status === 'late').length;
            const excused = records.filter(r => r.status === 'excused').length;
            const total = records.length;
            const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

            totalPresent += present;
            totalAbsent += absent;
            totalLate += late;
            totalExcused += excused;

            return { student, present, absent, late, excused, total, percentage };
        });

        // Render report
        let html = `
            <div class="report-summary">
                <div class="report-stat">
                    <h4>${totalPresent}</h4>
                    <p>Total Present</p>
                </div>
                <div class="report-stat">
                    <h4>${totalAbsent}</h4>
                    <p>Total Absent</p>
                </div>
                <div class="report-stat">
                    <h4>${totalLate}</h4>
                    <p>Total Late</p>
                </div>
                <div class="report-stat">
                    <h4>${totalExcused}</h4>
                    <p>Total Excused</p>
                </div>
            </div>
            
            <h3>Student Details</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Section</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Late</th>
                        <th>Excused</th>
                        <th>Attendance %</th>
                    </tr>
                </thead>
                <tbody>
        `;

        studentStats.forEach(stat => {
            const section = this.dataManager.getSectionByCode(stat.student.section);
            html += `
                <tr>
                    <td>${stat.student.name}</td>
                    <td>${section ? section.name : stat.student.section}</td>
                    <td>${stat.present}</td>
                    <td>${stat.absent}</td>
                    <td>${stat.late}</td>
                    <td>${stat.excused}</td>
                    <td><strong>${stat.percentage}%</strong></td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }

    exportReport() {
        const sectionCode = document.getElementById('reportSection').value;
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;

        if (!startDate || !endDate) {
            alert('Please generate a report first');
            return;
        }

        let students = sectionCode 
            ? this.dataManager.getStudentsBySection(sectionCode)
            : this.dataManager.students;

        const attendanceRecords = this.dataManager.getAttendanceByDateRange(startDate, endDate);

        // Generate CSV
        let csv = 'Student Name,Student ID,Section,Present,Absent,Late,Excused,Attendance %\n';

        students.forEach(student => {
            const records = attendanceRecords.filter(r => r.studentId === student.id);
            const present = records.filter(r => r.status === 'present').length;
            const absent = records.filter(r => r.status === 'absent').length;
            const late = records.filter(r => r.status === 'late').length;
            const excused = records.filter(r => r.status === 'excused').length;
            const total = records.length;
            const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

            const section = this.dataManager.getSectionByCode(student.section);
            csv += `${student.name},${student.id},${section ? section.name : student.section},${present},${absent},${late},${excused},${percentage}%\n`;
        });

        this.downloadCSV(csv, `attendance_report_${startDate}_to_${endDate}.csv`);
    }

    // Import/Export Students
    openImportModal() {
        document.getElementById('importModal').classList.add('active');
    }

    importCSV() {
        const fileInput = document.getElementById('csvFileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const lines = csv.split('\n');
            let imported = 0;

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const [name, sectionCode, grade, contact] = line.split(',');
                
                if (name && sectionCode && grade) {
                    this.dataManager.addStudent({
                        name: name.trim(),
                        section: sectionCode.trim(),
                        grade: grade.trim(),
                        contact: contact ? contact.trim() : ''
                    });
                    imported++;
                }
            }

            this.closeModal('importModal');
            this.loadStudents();
            this.showNotification(`${imported} students imported successfully!`);
        };

        reader.readAsText(file);
    }

    exportStudents() {
        let csv = 'Student ID,Full Name,Section Code,Section Name,Grade Level,Contact Info\n';

        this.dataManager.students.forEach(student => {
            const section = this.dataManager.getSectionByCode(student.section);
            csv += `${student.id},${student.name},${student.section},${section ? section.name : ''},${student.grade},${student.contact || ''}\n`;
        });

        this.downloadCSV(csv, 'students_export.csv');
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Utility Methods
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    showNotification(message) {
        // Simple alert notification (can be enhanced with custom notification UI)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize App
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

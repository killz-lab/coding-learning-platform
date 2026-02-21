// Main Application State
let currentUser = null;
let userProgress = {
    xp: 0,
    level: 1,
    chaptersCompleted: [],
    challengesSolved: [],
    currentStreak: 0,
    lastActive: null
};

// Learning Content Data
const chaptersData = {
    javascript: [
        {
            id: 'js-1',
            title: 'Variables and Data Types',
            description: 'Learn about variables, let, const, and different data types in JavaScript',
            content: 'Variables are containers for storing data values. In JavaScript, we have three ways to declare variables: var, let, and const.',
            exercises: [
                { question: 'Declare a variable named "name" with your name', answer: 'let name = "Your Name";', xp: 10 },
                { question: 'Create a constant variable named "PI" with value 3.14159', answer: 'const PI = 3.14159;', xp: 10 }
            ]
        },
        {
            id: 'js-2',
            title: 'Functions',
            description: 'Understanding how to create and use functions in JavaScript',
            content: 'Functions are reusable blocks of code that perform a specific task.',
            exercises: [
                { question: 'Create a function called "greet" that returns "Hello World"', answer: 'function greet() { return "Hello World"; }', xp: 15 },
                { question: 'Create an arrow function that adds two numbers', answer: 'const add = (a, b) => a + b;', xp: 15 }
            ]
        },
        {
            id: 'js-3',
            title: 'Arrays and Objects',
            description: 'Working with arrays and objects to store complex data',
            content: 'Arrays and objects are fundamental data structures in JavaScript.',
            exercises: [
                { question: 'Create an array with three fruits', answer: 'const fruits = ["apple", "banana", "orange"];', xp: 10 },
                { question: 'Create an object with name and age properties', answer: 'const person = { name: "John", age: 25 };', xp: 10 }
            ]
        },
        {
            id: 'js-4',
            title: 'Conditional Statements',
            description: 'Learn if/else statements and logical operators',
            content: 'Conditional statements allow your code to make decisions.',
            exercises: [
                { question: 'Write an if statement that checks if age is 18 or older', answer: 'if (age >= 18) { console.log("Adult"); }', xp: 15 }
            ]
        }
    ],
    html: [
        {
            id: 'html-1',
            title: 'Basic HTML Structure',
            description: 'Learn the fundamental structure of HTML documents',
            content: 'HTML documents have a standard structure with DOCTYPE, html, head, and body tags.',
            exercises: [
                { question: 'Create a basic HTML5 document structure', answer: '<!DOCTYPE html><html><head></head><body></body></html>', xp: 10 }
            ]
        },
        {
            id: 'html-2',
            title: 'Headings and Paragraphs',
            description: 'Using heading tags and paragraph elements',
            content: 'Headings (h1-h6) define sections, paragraphs contain text content.',
            exercises: [
                { question: 'Create an h1 heading and a paragraph', answer: '<h1>Welcome</h1><p>This is a paragraph.</p>', xp: 10 }
            ]
        }
    ],
    css: [
        {
            id: 'css-1',
            title: 'CSS Basics and Selectors',
            description: 'Introduction to CSS and how to select elements',
            content: 'CSS is used to style HTML elements. Selectors target specific elements.',
            exercises: [
                { question: 'Select all paragraphs and set color to blue', answer: 'p { color: blue; }', xp: 10 }
            ]
        },
        {
            id: 'css-2',
            title: 'Box Model and Layout',
            description: 'Understanding margin, padding, and basic layout',
            content: 'The box model consists of content, padding, border, and margin.',
            exercises: [
                { question: 'Add 10px padding and 5px margin to a div', answer: 'div { padding: 10px; margin: 5px; }', xp: 10 }
            ]
        }
    ],
    csharp: [
        {
            id: 'cs-1',
            title: 'C# Basics and Variables',
            description: 'Introduction to C# syntax and variable declaration',
            content: 'C# is a strongly-typed language. Variables must be declared with a type.',
            exercises: [
                { question: 'Declare a string variable named "message"', answer: 'string message = "Hello";', xp: 10 },
                { question: 'Declare an integer variable named "age"', answer: 'int age = 25;', xp: 10 }
            ]
        }
    ],
    cpp: [
        {
            id: 'cpp-1',
            title: 'C++ Fundamentals',
            description: 'Basic C++ syntax and variable types',
            content: 'C++ is a powerful programming language with strong typing.',
            exercises: [
                { question: 'Include the iostream library', answer: '#include <iostream>', xp: 10 },
                { question: 'Declare an integer variable in C++', answer: 'int number = 42;', xp: 10 }
            ]
        }
    ]
};

const challengesData = [
    {
        id: 'challenge-1',
        title: 'Sum of Two Numbers',
        description: 'Write a function that takes two numbers and returns their sum',
        language: 'javascript',
        difficulty: 'easy',
        xp: 20,
        solution: 'function sum(a, b) { return a + b; }',
        testCases: [
            { input: [2, 3], expected: 5 },
            { input: [10, -5], expected: 5 }
        ]
    },
    {
        id: 'challenge-2',
        title: 'Reverse a String',
        description: 'Write a function that reverses a given string',
        language: 'javascript',
        difficulty: 'medium',
        xp: 30,
        solution: 'function reverseString(str) { return str.split("").reverse().join(""); }',
        testCases: [
            { input: ["hello"], expected: "olleh" },
            { input: ["world"], expected: "dlrow" }
        ]
    },
    {
        id: 'challenge-3',
        title: 'Find Maximum Number',
        description: 'Find the largest number in an array',
        language: 'javascript',
        difficulty: 'easy',
        xp: 25,
        solution: 'function findMax(arr) { return Math.max(...arr); }',
        testCases: [
            { input: [[1, 5, 3, 9, 2]], expected: 9 },
            { input: [[-1, -5, -3]], expected: -1 }
        ]
    }
];

const debugProblems = [
    {
        id: 'debug-1',
        title: 'Fix the Function',
        problem: 'This function is supposed to return the square of a number, but it has errors',
        brokenCode: 'function square(num) {\n    return num * num\n}\n\nconsole.log(square(5))',
        fixedCode: 'function square(num) {\n    return num * num;\n}\n\nconsole.log(square(5));',
        error: 'Missing semicolon and proper formatting',
        language: 'javascript'
    },
    {
        id: 'debug-2',
        title: 'Array Loop Error',
        problem: 'This loop should print all elements of an array, but it\'s not working correctly',
        brokenCode: 'const numbers = [1, 2, 3, 4, 5];\nfor (let i = 0; i <= numbers.length; i++) {\n    console.log(numbers[i]);\n}',
        fixedCode: 'const numbers = [1, 2, 3, 4, 5];\nfor (let i = 0; i < numbers.length; i++) {\n    console.log(numbers[i]);\n}',
        error: 'Loop condition should be < not <=',
        language: 'javascript'
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadTheme();
    if (currentUser) {
        loadUserProgress();
    }
    updateUI();
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // User type toggle
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
        });
    });
    
    // Language tabs
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadChapters(this.dataset.lang);
        });
    });
    
    // Action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
    
    // Challenge filters
    document.getElementById('difficultyFilter').addEventListener('change', filterChallenges);
    document.getElementById('languageFilter').addEventListener('change', filterChallenges);
    // Run code button
    document.getElementById('runCode').addEventListener('click', runUserCode);
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const userType = document.querySelector('.user-type-btn.active').dataset.type;
    
    console.log('Login attempt:', { username, userType, password });
    
    // Simple authentication (in real app, this would be server-side)
    if (userType === 'admin' && username === 'admin' && password === 'admin277') {
        currentUser = { username, type: 'admin' };
        console.log('Admin authenticated successfully');
    } else if (userType === 'student') {
        // Check if student exists in saved accounts
        const savedStudents = JSON.parse(localStorage.getItem('studentAccounts') || '{}');
        
        if (savedStudents[username]) {
            // Existing student - verify password
            if (savedStudents[username].password === password) {
                currentUser = { username, type: 'student' };
                console.log('Student authenticated successfully');
            } else {
                showNotification('Invalid password for this username', 'error');
                return;
            }
        } else {
            // New student - create account with username as password
            if (password === username) {
                // Save new student account
                savedStudents[username] = {
                    password: password,
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem('studentAccounts', JSON.stringify(savedStudents));
                
                currentUser = { username, type: 'student' };
                console.log('New student account created and authenticated');
                showNotification(`New account created for ${username}!`, 'success');
            } else {
                showNotification('For new students, password must match username', 'error');
                return;
            }
        }
    } else {
        console.log('Authentication failed - invalid credentials');
        showNotification('Invalid credentials', 'error');
        return;
    }
    
    console.log('User authenticated:', currentUser);
    
    // Load or create user progress
    loadUserProgress();
    
    // Hide login modal and show main app
    const loginModal = document.getElementById('loginModal');
    const app = document.getElementById('app');
    
    console.log('Before - Modal classes:', loginModal.className);
    console.log('Before - App classes:', app.className);
    
    loginModal.classList.remove('active');
    loginModal.classList.add('hidden');
    app.classList.remove('hidden');
    
    console.log('After - Modal classes:', loginModal.className);
    console.log('After - App classes:', app.className);
    
    // Show/hide admin features
    if (currentUser.type === 'admin') {
        document.getElementById('adminNavItem').classList.remove('hidden');
    }
    
    updateUI();
    showNotification(`Welcome, ${username}!`, 'success');
}

function handleLogout() {
    currentUser = null;
    userProgress = {
        xp: 0,
        level: 1,
        chaptersCompleted: [],
        challengesSolved: [],
        currentStreak: 0,
        lastActive: null
    };
    
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('app').classList.add('hidden');
    
    // Reset form
    document.getElementById('loginForm').reset();
}

function loadUserProgress() {
    const saved = localStorage.getItem(`progress_${currentUser.username}`);
    if (saved) {
        userProgress = JSON.parse(saved);
    }
}

function saveUserProgress() {
    localStorage.setItem(`progress_${currentUser.username}`, JSON.stringify(userProgress));
}

function updateUI() {
    if (!currentUser) return;
    
    // Update user info
    document.getElementById('usernameDisplay').textContent = currentUser.username;
    document.getElementById('userLevel').textContent = userProgress.level;
    document.getElementById('currentXP').textContent = userProgress.xp;
    document.getElementById('maxXP').textContent = userProgress.level * 100;
    document.getElementById('xpProgress').style.width = `${(userProgress.xp % 100)}%`;
    
    // Update dashboard stats
    document.getElementById('totalXP').textContent = userProgress.xp;
    document.getElementById('chaptersCompleted').textContent = `${userProgress.chaptersCompleted.length}/20`;
    document.getElementById('challengesSolved').textContent = userProgress.challengesSolved.length;
    document.getElementById('currentStreak').textContent = `${userProgress.currentStreak} days`;
    
    // Load content for current section
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        const sectionId = activeSection.id;
        if (sectionId === 'chapters') {
            loadChapters('javascript');
        } else if (sectionId === 'challenges') {
            loadChallenges();
        } else if (sectionId === 'admin' && currentUser.type === 'admin') {
            loadAdminData();
        }
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Load section-specific content
    if (sectionId === 'chapters') {
        loadChapters('javascript');
    } else if (sectionId === 'challenges') {
        loadChallenges();
    } else if (sectionId === 'debug') {
        loadDebugProblem();
    } else if (sectionId === 'admin' && currentUser.type === 'admin') {
        loadAdminData();
    }
}

function loadChapters(language) {
    const chaptersGrid = document.getElementById('chaptersGrid');
    const chapters = chaptersData[language] || [];
    
    chaptersGrid.innerHTML = chapters.map(chapter => {
        const isCompleted = userProgress.chaptersCompleted.includes(chapter.id);
        const progress = isCompleted ? 100 : 0;
        
        return `
            <div class="chapter-card" onclick="startChapter('${chapter.id}')">
                <div class="chapter-header">
                    <div class="chapter-number">Chapter ${chapter.id.split('-')[1]}</div>
                    <div class="chapter-title">${chapter.title}</div>
                </div>
                <div class="chapter-content">
                    <div class="chapter-description">${chapter.description}</div>
                    <div class="chapter-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">${progress}%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function startChapter(chapterId) {
    // Find chapter data
    let chapter = null;
    for (let lang in chaptersData) {
        chapter = chaptersData[lang].find(ch => ch.id === chapterId);
        if (chapter) break;
    }
    
    if (!chapter) return;
    
    // Create chapter modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <h2>${chapter.title}</h2>
            <div class="chapter-content">
                <p>${chapter.content}</p>
                <div class="exercises">
                    <h3>Exercises</h3>
                    ${chapter.exercises.map((exercise, index) => `
                        <div class="exercise">
                            <p><strong>Exercise ${index + 1}:</strong> ${exercise.question}</p>
                            <textarea id="exercise-${index}" placeholder="Write your answer here..." rows="3"></textarea>
                            <button onclick="checkExercise('${chapter.id}', ${index})">Check Answer</button>
                            <div id="feedback-${index}" class="feedback"></div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="closeChapterModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function checkExercise(chapterId, exerciseIndex) {
    // Find chapter and exercise
    let chapter = null;
    for (let lang in chaptersData) {
        chapter = chaptersData[lang].find(ch => ch.id === chapterId);
        if (chapter) break;
    }
    
    if (!chapter) return;
    
    const exercise = chapter.exercises[exerciseIndex];
    const userAnswer = document.getElementById(`exercise-${exerciseIndex}`).value.trim();
    const feedbackDiv = document.getElementById(`feedback-${exerciseIndex}`);
    
    // Simple answer checking (in real app, would be more sophisticated)
    if (userAnswer.toLowerCase().replace(/\s/g, '') === exercise.answer.toLowerCase().replace(/\s/g, '')) {
        feedbackDiv.innerHTML = `<span style="color: green;">✓ Correct! +${exercise.xp} XP</span>`;
        addXP(exercise.xp);
        
        // Mark exercise as completed
        setTimeout(() => {
            if (!userProgress.chaptersCompleted.includes(chapterId)) {
                userProgress.chaptersCompleted.push(chapterId);
                saveUserProgress();
                updateUI();
            }
        }, 1000);
    } else {
        feedbackDiv.innerHTML = `<span style="color: red;">✗ Incorrect. Hint: ${exercise.answer}</span>`;
    }
}

function closeChapterModal() {
    const modal = document.querySelector('.modal:not(#loginModal)');
    if (modal) {
        modal.remove();
    }
}

function loadChallenges() {
    const challengesGrid = document.getElementById('challengesGrid');
    const difficulty = document.getElementById('difficultyFilter').value;
    const language = document.getElementById('languageFilter').value;
    
    let filteredChallenges = challengesData;
    
    if (difficulty !== 'all') {
        filteredChallenges = filteredChallenges.filter(c => c.difficulty === difficulty);
    }
    
    if (language !== 'all') {
        filteredChallenges = filteredChallenges.filter(c => c.language === language);
    }
    
    challengesGrid.innerHTML = filteredChallenges.map(challenge => {
        const isCompleted = userProgress.challengesSolved.includes(challenge.id);
        
        return `
            <div class="challenge-card" onclick="startChallenge('${challenge.id}')">
                <div class="challenge-header">
                    <div class="challenge-title">${challenge.title}</div>
                    <span class="difficulty-badge difficulty-${challenge.difficulty}">${challenge.difficulty}</span>
                </div>
                <div class="challenge-description">${challenge.description}</div>
                <div class="challenge-meta">
                    <span class="language">${challenge.language}</span>
                    <span class="xp-reward">+${challenge.xp} XP</span>
                </div>
                ${isCompleted ? '<div class="completed-badge">✓ Completed</div>' : ''}
            </div>
        `;
    }).join('');
}

function startChallenge(challengeId) {
    const challenge = challengesData.find(c => c.id === challengeId);
    if (!challenge) return;
    
    // Create challenge modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <h2>${challenge.title}</h2>
            <div class="challenge-content">
                <p>${challenge.description}</p>
                <div class="code-editor">
                    <div class="editor-header">
                        <span>Write your solution:</span>
                    </div>
                    <textarea id="challenge-solution" placeholder="Write your code here..." rows="10"></textarea>
                </div>
                <div class="test-cases">
                    <h3>Test Cases</h3>
                    ${challenge.testCases.map((test, index) => `
                        <div class="test-case">
                            <p>Input: ${JSON.stringify(test.input)}</p>
                            <p>Expected: ${JSON.stringify(test.expected)}</p>
                            <div id="test-result-${index}"></div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="runChallenge('${challengeId}')">Run Tests</button>
                <button onclick="closeChallengeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function runChallenge(challengeId) {
    const challenge = challengesData.find(c => c.id === challengeId);
    if (!challenge) return;
    
    const userCode = document.getElementById('challenge-solution').value;
    let allPassed = true;
    
    try {
        // Create a function from user code (simplified approach)
        const userFunction = new Function('return ' + userCode)();
        
        challenge.testCases.forEach((test, index) => {
            try {
                const result = userFunction(...test.input);
                const resultDiv = document.getElementById(`test-result-${index}`);
                
                if (JSON.stringify(result) === JSON.stringify(test.expected)) {
                    resultDiv.innerHTML = `<span style="color: green;">✓ Passed</span>`;
                } else {
                    resultDiv.innerHTML = `<span style="color: red;">✗ Failed. Got: ${JSON.stringify(result)}</span>`;
                    allPassed = false;
                }
            } catch (error) {
                document.getElementById(`test-result-${index}`).innerHTML = `<span style="color: red;">✗ Error: ${error.message}</span>`;
                allPassed = false;
            }
        });
        
        if (allPassed && !userProgress.challengesSolved.includes(challengeId)) {
            userProgress.challengesSolved.push(challengeId);
            addXP(challenge.xp);
            saveUserProgress();
            updateUI();
            showNotification('Challenge completed! +' + challenge.xp + ' XP', 'success');
        }
    } catch (error) {
        showNotification('Code error: ' + error.message, 'error');
    }
}

function closeChallengeModal() {
    const modal = document.querySelector('.modal:not(#loginModal)');
    if (modal) {
        modal.remove();
    }
}

function loadDebugProblem() {
    const problem = debugProblems[0]; // Load first problem for simplicity
    document.getElementById('problemStatement').textContent = problem.problem;
    document.getElementById('codeInput').value = problem.brokenCode;
    document.getElementById('outputDisplay').textContent = '';
    document.getElementById('feedbackDisplay').textContent = 'Try to fix the code and run it!';
}

function runUserCode() {
    const code = document.getElementById('codeInput').value;
    const outputDiv = document.getElementById('outputDisplay');
    const feedbackDiv = document.getElementById('feedbackDisplay');
    
    try {
        // Capture console.log output
        let logs = [];
        const originalLog = console.log;
        console.log = function(...args) {
            logs.push(args.join(' '));
        };
        
        // Execute the code
        eval(code);
        
        // Restore console.log
        console.log = originalLog;
        
        outputDiv.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully!';
        
        // Check if code matches the expected solution
        const problem = debugProblems[0];
        if (code.replace(/\s/g, '') === problem.fixedCode.replace(/\s/g, '')) {
            feedbackDiv.innerHTML = `<span style="color: green;">✓ Perfect! You fixed the code correctly. +15 XP</span>`;
            addXP(15);
            saveUserProgress();
        } else {
            feedbackDiv.innerHTML = `<span style="color: orange;">Code runs, but might not be the optimal solution. Keep trying!</span>`;
        }
    } catch (error) {
        outputDiv.textContent = 'Error: ' + error.message;
        feedbackDiv.innerHTML = `<span style="color: red;">✗ There's an error in your code. Check the console output for details.</span>`;
    }
}

function loadAdminData() {
    if (currentUser.type !== 'admin') return;
    
    // Load all users' progress
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress_')) {
            const username = key.replace('progress_', '');
            const progress = JSON.parse(localStorage.getItem(key));
            allUsers.push({ username, ...progress });
        }
    }
    
    // Update admin stats
    document.getElementById('totalStudents').textContent = allUsers.length;
    
    const avgProgress = allUsers.length > 0 
        ? Math.round(allUsers.reduce((sum, user) => sum + (user.chaptersCompleted.length * 5), 0) / allUsers.length)
        : 0;
    document.getElementById('avgProgress').textContent = avgProgress + '%';
    
    const topPerformer = allUsers.reduce((top, user) => 
        (!top || user.xp > top.xp) ? user : top, null);
    document.getElementById('topPerformer').textContent = topPerformer ? topPerformer.username : '-';
    
    // Calculate total XP earned by all students
    const totalXPAll = allUsers.reduce((sum, user) => sum + user.xp, 0);
    document.getElementById('totalXPAll').textContent = totalXPAll;
    
    // Update student table with actions
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = allUsers.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.level}</td>
            <td>${user.xp}</td>
            <td>${user.chaptersCompleted.length}</td>
            <td>${user.challengesSolved.length}</td>
            <td>${user.lastActive || 'Never'}</td>
            <td>
                <button class="admin-control-btn" onclick="resetStudentProgress('${user.username}')">Reset</button>
                <button class="admin-control-btn" onclick="deleteStudent('${user.username}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function handleQuickAction(action) {
    switch(action) {
        case 'start-chapter':
            showSection('chapters');
            break;
        case 'practice-challenge':
            showSection('challenges');
            break;
        case 'debug-code':
            showSection('debug');
            break;
    }
}

function filterChallenges() {
    loadChallenges();
}

function addXP(amount) {
    userProgress.xp += amount;
    
    // Check for level up
    const newLevel = Math.floor(userProgress.xp / 100) + 1;
    if (newLevel > userProgress.level) {
        userProgress.level = newLevel;
        showNotification(`Level up! You are now level ${newLevel}!`, 'success');
    }
    
    // Update streak
    const today = new Date().toDateString();
    if (userProgress.lastActive !== today) {
        userProgress.currentStreak++;
        userProgress.lastActive = today;
    }
    
    updateUI();
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (body.classList.contains('dark-theme')) {
        // Switch to light theme
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark theme
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on initialization
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .exercise {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
    }
    .exercise textarea {
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
    }
    .exercise button {
        background: #667eea;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 1rem;
    }
    .feedback {
        margin-top: 0.5rem;
        font-weight: 600;
    }
    .completed-badge {
        background: #4CAF50;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: inline-block;
    }
    .test-case {
        background: #f8f9fa;
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// Admin Control Functions
function resetStudentProgress(username) {
    if (confirm(`Are you sure you want to reset ${username}'s progress?`)) {
        localStorage.removeItem(`progress_${username}`);
        showNotification(`${username}'s progress has been reset`, 'success');
        loadAdminData(); // Refresh the admin dashboard
    }
}

function deleteStudent(username) {
    if (confirm(`Are you sure you want to delete ${username} and all their data?`)) {
        // Remove student progress
        localStorage.removeItem(`progress_${username}`);
        
        // Remove student account
        const savedStudents = JSON.parse(localStorage.getItem('studentAccounts') || '{}');
        delete savedStudents[username];
        localStorage.setItem('studentAccounts', JSON.stringify(savedStudents));
        
        showNotification(`${username} has been deleted`, 'success');
        loadAdminData(); // Refresh the admin dashboard
    }
}

function resetAllStudentProgress() {
    if (confirm('Are you sure you want to reset ALL student progress? This cannot be undone!')) {
        // Remove all progress data except admin
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key.startsWith('progress_') && !key.includes('admin')) {
                localStorage.removeItem(key);
            }
        }
        showNotification('All student progress has been reset', 'success');
        loadAdminData(); // Refresh the admin dashboard
    }
}

function exportStudentData() {
    const allUsers = [];
    const savedStudents = JSON.parse(localStorage.getItem('studentAccounts') || '{}');
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress_')) {
            const username = key.replace('progress_', '');
            const progress = JSON.parse(localStorage.getItem(key));
            
            // Add account info
            const accountInfo = savedStudents[username] || {};
            
            allUsers.push({ 
                username, 
                ...progress,
                createdAt: accountInfo.createdAt,
                accountType: 'student'
            });
        }
    }
    
    const dataStr = JSON.stringify(allUsers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Student data exported successfully', 'success');
}

function clearAllStudentData() {
    if (confirm('Are you sure you want to clear ALL student data? This will delete everything except your admin data! This cannot be undone!')) {
        // Remove all progress data except admin
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key.startsWith('progress_') && !key.includes('admin')) {
                localStorage.removeItem(key);
            }
        }
        
        // Remove all student accounts
        localStorage.removeItem('studentAccounts');
        
        showNotification('All student data has been cleared', 'success');
        loadAdminData(); // Refresh the admin dashboard
    }
}

// Owner Functions
function loadOwnerData() {
    if (currentUser.type !== 'owner') return;
    
    // Load all users' progress
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress_')) {
            const username = key.replace('progress_', '');
            const progress = JSON.parse(localStorage.getItem(key));
            allUsers.push({ username, ...progress });
        }
    }
    
    // Update owner stats
    document.getElementById('ownerTotalStudents').textContent = allUsers.length;
    
    const avgProgress = allUsers.length > 0 
        ? Math.round(allUsers.reduce((sum, user) => sum + (user.chaptersCompleted.length * 5), 0) / allUsers.length)
        : 0;
    document.getElementById('ownerAvgProgress').textContent = avgProgress + '%';
    
    const topPerformer = allUsers.reduce((top, user) => 
        (!top || user.xp > top.xp) ? user : top, null);
    document.getElementById('ownerTopPerformer').textContent = topPerformer ? topPerformer.username : '-';
    
    // Count admins (simplified - in real app would track admin users separately)
    const adminCount = 1; // At least the admin user exists
    document.getElementById('totalAdmins').textContent = adminCount;
    
    // Update student table with actions
    const tableBody = document.getElementById('ownerStudentTableBody');
    tableBody.innerHTML = allUsers.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.level}</td>
            <td>${user.xp}</td>
            <td>${user.chaptersCompleted.length}</td>
            <td>${user.challengesSolved.length}</td>
            <td>${user.lastActive || 'Never'}</td>
            <td>
                <button class="owner-btn" onclick="resetStudentProgress('${user.username}')">Reset</button>
                <button class="owner-btn" onclick="deleteStudent('${user.username}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function resetStudentProgress(username) {
    if (confirm(`Are you sure you want to reset ${username}'s progress?`)) {
        localStorage.removeItem(`progress_${username}`);
        showNotification(`${username}'s progress has been reset`, 'success');
        loadOwnerData(); // Refresh the owner dashboard
    }
}

function deleteStudent(username) {
    if (confirm(`Are you sure you want to delete ${username} and all their data?`)) {
        localStorage.removeItem(`progress_${username}`);
        showNotification(`${username} has been deleted`, 'success');
        loadOwnerData(); // Refresh the owner dashboard
    }
}

function resetAllProgress() {
    if (confirm('Are you sure you want to reset ALL student progress? This cannot be undone!')) {
        // Remove all progress data except admin/owner
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key.startsWith('progress_') && 
                !key.includes('admin') && 
                !key.includes('syntax')) {
                localStorage.removeItem(key);
            }
        }
        showNotification('All student progress has been reset', 'success');
        loadOwnerData(); // Refresh the owner dashboard
    }
}

function exportStudentData() {
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress_')) {
            const username = key.replace('progress_', '');
            const progress = JSON.parse(localStorage.getItem(key));
            allUsers.push({ username, ...progress });
        }
    }
    
    const dataStr = JSON.stringify(allUsers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Student data exported successfully', 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This will delete everything including admin and owner data! This cannot be undone!')) {
        localStorage.clear();
        showNotification('All data has been cleared', 'success');
        // Redirect to login
        location.reload();
    }
}

// Check for owner access on page load
function checkOwnerAccess() {
    const ownerAccess = localStorage.getItem('ownerAccess');
    if (ownerAccess === 'enabled') {
        document.body.classList.add('owner-access');
        // Show owner button
        document.querySelectorAll('.owner-btn').forEach(btn => {
            btn.style.display = 'inline-block';
        });
    }
}

// Initialize owner access check
checkOwnerAccess();
let allIssues = [];

// Simulate fetching "All Issues"
const fetchIssues = async () => {
    const grid = document.getElementById('issuesGrid');
    
    // In a real app, replace the below array with: 
    // const response = await fetch('YOUR_API_URL/issues');
    // const result = await response.json();
    // allIssues = result.data;

    // Using the data structure provided in the prompt
    allIssues = [
        { id: 1, title: "Fix navigation menu on mobile devices", description: "The navigation menu doesn't collapse properly on mobile devices.", status: "open", labels: ["bug", "help wanted"], priority: "high", author: "john_doe", createdAt: "2024-01-15T10:30:00Z" },
        { id: 2, title: "Add dark mode support", description: "Users are requesting a dark mode option for better accessibility.", status: "open", labels: ["enhancement", "good first issue"], priority: "medium", author: "sarah_dev", createdAt: "2024-01-14T14:20:00Z" },
        { id: 3, title: "Update README with installation instructions", description: "The README file needs better installation instructions.", status: "closed", labels: ["documentation"], priority: "low", author: "mike_docs", createdAt: "2024-01-10T08:00:00Z" },
        { id: 4, title: "Performance issues with large datasets", description: "Application becomes slow when loading more than 1000 items.", status: "open", labels: ["bug", "enhancement"], priority: "high", author: "alex_perf", createdAt: "2024-01-18T11:00:00Z" },
        // ... adding more items to demonstrate the grid
    ];

    renderIssues(allIssues);
};

const renderIssues = (data) => {
    const grid = document.getElementById('issuesGrid');
    document.getElementById('countText').innerText = data.length;

    grid.innerHTML = data.map(issue => `
        <div onclick="openModal(${issue.id})" class="bg-white rounded-xl border-t-[5px] shadow-sm p-5 cursor-pointer hover:shadow-md transition duration-300 
            ${issue.status === 'open' ? 'border-green-400' : 'border-[#5D2BFF]'}">
            
            <div class="flex justify-between items-start mb-4">
                <img src="assets/${issue.status === 'open' ? 'open-status.png' : 'closed-status.png'}" class="w-5">
                <span class="text-[10px] font-bold uppercase px-2 py-1 bg-gray-50 text-gray-400 rounded border border-gray-100">${issue.priority}</span>
            </div>

            <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-1">${issue.title}</h3>
            <p class="text-[11px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">${issue.description}</p>

            <div class="flex flex-wrap gap-2 mb-6">
                ${issue.labels.map(label => {
                    let colorClass = label === 'bug' ? 'text-red-500 bg-red-50 border-red-100' : 'text-orange-500 bg-orange-50 border-orange-100';
                    if(label === 'enhancement') colorClass = 'text-green-500 bg-green-50 border-green-100';
                    return `<span class="text-[9px] font-bold px-2 py-0.5 rounded-full border ${colorClass}">${label.toUpperCase()}</span>`
                }).join('')}
            </div>

            <div class="pt-4 border-t border-gray-50 text-[10px] text-gray-400 flex justify-between items-center">
                <span>#${issue.id} by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
};

// Handle Tab Switching
const filterByStatus = (status) => {
    document.querySelectorAll('[id^="tab-"]').forEach(btn => btn.classList.remove('active-tab'));
    document.getElementById(`tab-${status}`).classList.add('active-tab');

    if (status === 'all') renderIssues(allIssues);
    else renderIssues(allIssues.filter(i => i.status === status));
};

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allIssues.filter(i => 
        i.title.toLowerCase().includes(term) || i.description.toLowerCase().includes(term)
    );
    renderIssues(filtered);
});

// Modal Logic
const openModal = (id) => {
    const issue = allIssues.find(i => i.id === id);
    const modal = document.getElementById('issueModal');
    const body = document.getElementById('modalBody');

    body.innerHTML = `
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">${issue.title}</h2>
        <div class="flex flex-wrap gap-3 items-center mb-6">
            <span class="${issue.status === 'open' ? 'bg-green-600' : 'bg-[#5D2BFF]'} text-white text-[10px] px-3 py-1 rounded-full font-bold capitalize">
                ${issue.status}
            </span>
            <p class="text-xs text-gray-400">Opened by <strong class="text-gray-700">${issue.author}</strong> • ${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex flex-wrap gap-2 mb-6">
            ${issue.labels.map(l => `<span class="text-[10px] border px-3 py-1 rounded-full text-orange-500 border-orange-100 font-bold bg-orange-50">${l.toUpperCase()}</span>`).join('')}
        </div>
        <p class="text-gray-600 text-sm leading-relaxed border-b border-gray-100 pb-8 mb-8">${issue.description}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p class="text-[10px] text-gray-400 font-bold uppercase mb-1">Assignee</p>
                <p class="font-bold text-gray-800 text-sm">${issue.assignee || 'Unassigned'}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p class="text-[10px] text-gray-400 font-bold uppercase mb-1">Priority</p>
                <p class="font-bold text-red-500 text-sm uppercase">${issue.priority}</p>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
};

const closeModal = () => {
    document.getElementById('issueModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// Check Auth & Start
window.onload = () => {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    } else {
        fetchIssues();
    }
};
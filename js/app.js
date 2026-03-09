// Generate 50 Issues dynamically for display
const generate50Issues = () => {
    const issues = [];
    for (let i = 1; i <= 50; i++) {
        const status = i % 3 === 0 ? "closed" : "open"; // Mix of open/closed
        const priority = i % 4 === 0 ? "high" : (i % 2 === 0 ? "medium" : "low");
        
        issues.push({
            id: i,
            title: `Issue #${i}: Fix navigation menu on mobile devices`,
            description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior and check CSS breakpoints.",
            status: status,
            labels: ["bug", "help wanted"],
            priority: priority,
            author: "john_doe",
            createdAt: new Date(2024, 0, i).toISOString()
        });
    }
    return issues;
};

const allIssues = generate50Issues();

const renderIssues = (data) => {
    const grid = document.getElementById('issuesGrid');
    document.getElementById('countText').innerText = data.length;

    grid.innerHTML = data.map(issue => `
        <div onclick="openModal(${issue.id})" class="bg-white rounded-2xl border-t-[6px] shadow-sm p-6 cursor-pointer hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 
            ${issue.status === 'open' ? 'border-green-400' : 'border-[#5D2BFF]'}">
            
            <div class="flex justify-between items-start mb-5">
                <img src="assets/${issue.status === 'open' ? 'open-status.png' : 'closed-status.png'}" class="w-6">
                <span class="text-[9px] font-black uppercase px-3 py-1 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 tracking-tighter">${issue.priority}</span>
            </div>

            <h3 class="font-extrabold text-gray-900 text-base mb-2 line-clamp-1">${issue.title}</h3>
            <p class="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed font-medium">${issue.description}</p>

            <div class="flex flex-wrap gap-2 mb-8">
                <span class="text-[9px] font-black px-3 py-1 rounded-full border border-red-100 text-red-500 bg-red-50 uppercase">BUG</span>
                <span class="text-[9px] font-black px-3 py-1 rounded-full border border-orange-100 text-orange-500 bg-orange-50 uppercase">HELP WANTED</span>
            </div>

            <div class="pt-5 border-t border-gray-50 text-[10px] text-gray-400 font-bold flex justify-between items-center">
                <span>#${issue.id} by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
};

const openModal = (id) => {
    const issue = allIssues.find(i => i.id === id);
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h2 class="text-3xl font-black text-gray-900 mb-3">${issue.title}</h2>
        <div class="flex gap-4 items-center mb-8">
            <span class="${issue.status === 'open' ? 'bg-green-500' : 'bg-[#5D2BFF]'} text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest">${issue.status}</span>
            <p class="text-xs font-bold text-gray-400 italic">Opened by <span class="text-gray-900 not-italic">${issue.author}</span> • ${new Date(issue.createdAt).toDateString()}</p>
        </div>
        <div class="flex gap-2 mb-8">
             <span class="text-[10px] font-black px-4 py-1.5 rounded-full border border-red-100 text-red-500 bg-red-50 uppercase">BUG</span>
             <span class="text-[10px] font-black px-4 py-1.5 rounded-full border border-orange-100 text-orange-500 bg-orange-50 uppercase">HELP WANTED</span>
        </div>
        <p class="text-gray-500 text-sm leading-8 font-medium border-b border-gray-50 pb-10 mb-10">${issue.description} This is a detailed view of the specific issue where you can see the technical requirements and labels.</p>
        <div class="grid grid-cols-2 gap-6">
            <div class="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Assignee</p>
                <p class="font-extrabold text-gray-900 text-sm">${issue.author}</p>
            </div>
            <div class="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Priority</p>
                <p class="font-extrabold text-red-500 text-sm uppercase">${issue.priority}</p>
            </div>
        </div>
    `;
    document.getElementById('issueModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    document.getElementById('issueModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

const filterByStatus = (status) => {
    document.querySelectorAll('[id^="tab-"]').forEach(btn => btn.classList.remove('active-tab'));
    document.getElementById(`tab-${status}`).classList.add('active-tab');
    if (status === 'all') renderIssues(allIssues);
    else renderIssues(allIssues.filter(i => i.status === status));
};

document.getElementById('searchInput').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    renderIssues(allIssues.filter(i => i.title.toLowerCase().includes(val) || i.description.toLowerCase().includes(val)));
});

// Start the Dashboard
renderIssues(allIssues);
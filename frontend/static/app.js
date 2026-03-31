const API_URL = "";

// State
let currentTotalReward = 0.0;
let isProcessing = false;
let currentMode = "auto"; // "auto" or "manual"
let rewardChartInstance = null;

// DOM Elements
const resetBtn = document.getElementById("reset-btn");
const runNextBtn = document.getElementById("run-next-btn");
const historyBtn = document.getElementById("history-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const historyModal = document.getElementById("history-modal");
const hmContent = document.getElementById("hm-content");

const listHistory = document.getElementById("history-list");
const chartCanvas = document.getElementById("rewardChart");

const taskSelect = document.getElementById("task-select");
const actionLog = document.getElementById("action-log");
const obsFlagsContainer = document.getElementById("obs-flags");
const toolButtonsContainer = document.getElementById("tool-buttons");
const manualToolButtons = document.querySelectorAll(".tool-btn");

const spinner = document.getElementById("run-spinner");
const customCursor = document.getElementById("custom-cursor");

const toggleAutoBtn = document.getElementById("toggle-auto");
const toggleManualBtn = document.getElementById("toggle-manual");
const modeDesc = document.getElementById("mode-desc");

// Elements mapping
const cTaskId = document.getElementById("c-task-id");
const cTaskDesc = document.getElementById("c-task-desc");
const cTaskSteps = document.getElementById("c-task-steps");
const cTotalReward = document.getElementById("c-total-reward");
const cInfoMsg = document.getElementById("c-info-msg");
const cActiveAgent = document.getElementById("c-active-agent");

// --- Custom Cursor ---
document.addEventListener("mousemove", (e) => {
    customCursor.style.left = e.clientX + "px";
    customCursor.style.top = e.clientY + "px";
});

document.querySelectorAll("button, select").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hover-active"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
});

// --- UI Helpers ---

function createToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    
    const colors = {
        success: "text-green-400 border-green-500/30",
        error: "text-red-400 border-red-500/30",
        info: "text-cyan-400 border-cyan-500/30",
        reward: "text-yellow-400 border-yellow-500/30"
    };

    toast.className = `toast glass-panel p-3 rounded-lg border-l-4 font-mono text-sm max-w-xs shadow-lg ${colors[type] || colors.info}`;
    toast.innerHTML = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        gsap.to(toast, {opacity: 0, x: 100, duration: 0.3, onComplete: () => toast.remove()});
    }, 3000);
}

function logAgentAction(stepNum, agentName, toolName, reward, isSuccess) {
    const entry = document.createElement("div");
    const indicator = isSuccess ? "🟩" : "🟥";
    entry.className = "flex flex-col gap-1 p-2 rounded bg-gray-800/40 border border-gray-700/50 mb-1";
    entry.innerHTML = `
        <div class="flex justify-between items-center text-xs">
            <span class="text-cyan-300 font-bold">Step ${stepNum} &mdash; ${agentName}</span>
            <span class="text-yellow-400 font-mono ${reward > 0 ? '' : 'text-gray-500'}">${reward > 0 ? '+'+reward : reward} Rwd</span>
        </div>
        <div class="flex justify-between items-center">
            <div class="text-gray-400 text-[11px] font-mono mt-1 w-full bg-gray-900 px-2 py-1 rounded inline-block">>> ${toolName}</div>
            <div class="ml-2 text-xs">${indicator}</div>
        </div>
    `;
    actionLog.prepend(entry);
}

function renderObservationFlags(obs) {
    obsFlagsContainer.innerHTML = "";
    
    const excludes = ["task_id", "task_description", "step_count"];
    for (const [key, val] of Object.entries(obs)) {
        if (excludes.includes(key)) continue;
        
        const isTrue = val === true;
        
        const item = document.createElement("div");
        item.className = "flex items-center justify-between p-2 rounded bg-slate-800/40 border border-slate-700/50 transition-colors duration-500";
        
        const readableName = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const badgeClass = isTrue ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-gray-700 text-gray-400 border border-gray-600";
        const badgeIcon = isTrue ? "✓" : "✗";
        
        item.innerHTML = `
            <span class="text-sm text-gray-300">${readableName}</span>
            <span class="px-2 py-0.5 rounded text-xs font-bold ${badgeClass}">${badgeIcon}</span>
        `;
        
        if(isTrue) {
            item.style.borderColor = "rgba(34, 211, 238, 0.5)";
        }
        
        obsFlagsContainer.appendChild(item);
    }
}

function animateRewardUpdate(newVal) {
    gsap.to(cTotalReward, {
        innerHTML: newVal,
        duration: 0.5,
        snap: { innerHTML: 0.01 },
        onUpdate: function() {
            cTotalReward.innerText = Number(this.targets()[0].innerHTML).toFixed(2);
        }
    });

    gsap.fromTo(cTotalReward, {scale: 1.5, color: "#fff"}, {scale: 1, color: "#4ade80", duration: 0.5});
}

// --- Mode Toggle Logic ---

function setMode(mode) {
    currentMode = mode;
    if (mode === "auto") {
        toggleAutoBtn.classList.replace("text-gray-400", "text-cyan-300");
        toggleAutoBtn.classList.add("bg-cyan-600/30", "border", "border-cyan-500/50");
        
        toggleManualBtn.classList.replace("text-cyan-300", "text-gray-400");
        toggleManualBtn.classList.remove("bg-cyan-600/30", "border", "border-cyan-500/50");
        
        runNextBtn.style.display = "flex";
        toolButtonsContainer.classList.add("opacity-30", "pointer-events-none");
        modeDesc.innerText = "System executes agents sequentially. Standby orchestrator.";
        cActiveAgent.innerText = "Auto-Pilot";
    } else {
        toggleManualBtn.classList.replace("text-gray-400", "text-cyan-300");
        toggleManualBtn.classList.add("bg-cyan-600/30", "border", "border-cyan-500/50");
        
        toggleAutoBtn.classList.replace("text-cyan-300", "text-gray-400");
        toggleAutoBtn.classList.remove("bg-cyan-600/30", "border", "border-cyan-500/50");
        
        runNextBtn.style.display = "none";
        toolButtonsContainer.classList.remove("opacity-30", "pointer-events-none");
        modeDesc.innerText = "Click tool buttons manually. User operates inputs.";
        cActiveAgent.innerText = "Manual User";
    }
}

toggleAutoBtn.addEventListener("click", () => setMode("auto"));
toggleManualBtn.addEventListener("click", () => setMode("manual"));

// --- History Modal & Charting ---

historyBtn.addEventListener("click", async () => {
    historyModal.classList.remove("hidden");
    historyModal.classList.add("flex");
    setTimeout(() => {
        hmContent.classList.remove("opacity-0", "scale-95");
        hmContent.classList.add("opacity-100", "scale-100");
    }, 10);
    
    await renderHistory();
});

closeModalBtn.addEventListener("click", () => {
    hmContent.classList.remove("opacity-100", "scale-100");
    hmContent.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
        historyModal.classList.remove("flex");
        historyModal.classList.add("hidden");
    }, 300);
});

async function renderHistory() {
    listHistory.innerHTML = "<div class='text-center text-gray-500 py-4'>Loading history...</div>";
    
    try {
        const response = await fetch(`${API_URL}/history`);
        const data = await response.json();
        
        if (!data.steps || data.steps.length === 0) {
            listHistory.innerHTML = "<div class='text-center text-gray-500 py-4'>No actions taken in this episode yet.</div>";
            if(rewardChartInstance) rewardChartInstance.destroy();
            return;
        }

        listHistory.innerHTML = "";
        
        let labels = [0];
        let cumulativeRewards = [0.0];
        let currentCum = 0.0;

        data.steps.forEach(s => {
            const parsedRew = parseFloat(s.reward) || 0.0;
            currentCum += parsedRew;
            labels.push(s.step);
            cumulativeRewards.push(currentCum);

            const div = document.createElement("div");
            div.className = "flex flex-col gap-1 bg-gray-800/50 p-3 rounded-lg border border-gray-700";
            
            const timestampStr = new Date(s.timestamp).toLocaleTimeString();
            
            div.innerHTML = `
                <div class="flex justify-between text-sm">
                    <span class="font-bold text-cyan-300">Step ${s.step}</span>
                    <span class="text-xs text-gray-500">${timestampStr}</span>
                </div>
                <div class="flex justify-between items-center text-gray-300 text-sm mt-1">
                    <span>Agent: <span class="text-gray-100">${s.agent}</span></span>
                    <span class="text-yellow-400 font-mono">${parsedRew > 0 ? '+'+parsedRew : parsedRew} Reward</span>
                </div>
                <div class="text-xs text-gray-500 font-mono mt-1">
                    Action: ${s.action}
                </div>
            `;
            listHistory.appendChild(div);
        });

        // Chart.js rendering
        if (rewardChartInstance) {
            rewardChartInstance.destroy();
        }

        const ctx = chartCanvas.getContext('2d');
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.2)');   
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

        rewardChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cumulative Reward',
                    data: cumulativeRewards,
                    borderColor: '#22d3ee',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#22d3ee',
                    pointRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#9ca3af' },
                        title: { display: true, text: 'Step Count', color: '#6b7280' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#9ca3af' },
                        beginAtZero: true,
                        max: 1.05
                    }
                }
            }
        });

    } catch (e) {
        listHistory.innerHTML = `<div class='text-center text-red-500 py-4'>Failed to load history: ${e.message}</div>`;
    }
}


// --- API Execution Hooks ---

async function handleReset() {
    if (isProcessing) return;
    setProcessing(true);
    
    currentTotalReward = 0.0;
    actionLog.innerHTML = "";
    cTotalReward.innerText = "0.00";
    if(currentMode === "auto") cActiveAgent.innerText = "Auto-Pilot";
    
    const taskName = taskSelect.value;
    
    try {
        const res = await fetch(`${API_URL}/reset`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ task_name: taskName })
        });
        const obs = await res.json();
        
        cTaskId.innerText = obs.task_id;
        cTaskDesc.innerText = obs.task_description;
        cTaskSteps.innerText = obs.step_count;
        cInfoMsg.innerText = `Environment reset to task: ${obs.task_id}`;
        
        renderObservationFlags(obs);
        createToast("Environment Reset Successful", "success");
        runNextBtn.disabled = false;
        
    } catch (e) {
        createToast("Failed to Reset Environment", "error");
    } finally {
        setProcessing(false);
    }
}

async function runNextAgent() {
    if (isProcessing || currentMode !== "auto") return;
    setProcessing(true);

    try {
        const res = await fetch(`${API_URL}/run_next_agent`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
        
        const data = await res.json();
        processStepResult(data, data.info.agent_name || "UnknownOrchestrator", data.info.success);

    } catch (e) {
        createToast(`Network Error: ${e.message}`, "error");
        setProcessing(false);
    }
}

async function handleManualStep(toolName) {
    if (isProcessing || currentMode !== "manual") return;
    setProcessing(true);
    
    // Fallback dictionary map of stub parameters for UI triggered API limits
    const stubParams = {
        "generate_image": { "prompt": "Cinematic visual background" },
        "write_caption": { "tone": "excited" },
        "add_hashtags": { "topic": "marketing_campaign" },
        "schedule_post": { "time": "12:00 PM" }
    };
    
    const payload = {
        tool: toolName,
        parameters: stubParams[toolName] || {}
    };

    try {
        const res = await fetch(`${API_URL}/step`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        processStepResult(data, "Manual User", data.info.success, toolName);

    } catch (e) {
        createToast(`Network Error: ${e.message}`, "error");
        setProcessing(false);
    }
}

function processStepResult(data, agentTitle, isSuccess, manualToolStr = null) {
    const obs = data.observation;
    const reward = data.reward;
    const done = data.done;
    const info = data.info;
    
    currentTotalReward += reward;
    animateRewardUpdate(currentTotalReward);
    
    cTaskSteps.innerText = obs.step_count;
    
    if (currentMode === "auto") {
        cActiveAgent.innerText = agentTitle;
        gsap.fromTo(cActiveAgent, {opacity: 0, x: -10}, {opacity: 1, x: 0, duration: 0.3});
        logAgentAction(obs.step_count, agentTitle, "execute_tool()", reward.toFixed(2), isSuccess);
    } else {
        logAgentAction(obs.step_count, agentTitle, manualToolStr, reward.toFixed(2), isSuccess);
    }
    
    renderObservationFlags(obs);
    cInfoMsg.innerText = info.message || `Execution Completed: +${reward.toFixed(2)}`;
    
    if (window.triggerAvatarAction) window.triggerAvatarAction(isSuccess);
    
    if (reward > 0) createToast(`+${reward.toFixed(2)} Reward!`, "reward");
    else if (!isSuccess) createToast(`Execution Failed`, "error");

    if (done) {
        createToast(`Episode Finished! Final Grade: ${info.grade}`, "success");
        cInfoMsg.innerHTML = `<span class="text-green-400 font-bold">Workflow Complete! Final Grader Score: ${info.grade}</span>`;
        if (currentMode === "auto") cActiveAgent.innerText = "Done";
        runNextBtn.disabled = true;
        
        // Ensure manual tools are disabled on completion
        toolButtonsContainer.classList.add("opacity-30", "pointer-events-none");
        
        if (window.triggerAvatarAction) window.triggerAvatarAction(true);
    }

    setProcessing(false);
}

function setProcessing(status) {
    isProcessing = status;
    spinner.classList.toggle("hidden", !status);
    resetBtn.disabled = status;
    runNextBtn.disabled = status;
    
    if (status) {
        gsap.to(cActiveAgent, {opacity: 0.5, yoyo: true, repeat: -1, duration: 0.3});
    } else {
        gsap.killTweensOf(cActiveAgent);
        cActiveAgent.style.opacity = "1";
    }
}

// Bind Listeners
resetBtn.addEventListener("click", handleReset);
runNextBtn.addEventListener("click", runNextAgent);

manualToolButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Find closest button element just in case click hit the span
        const buttonEl = e.target.closest('button');
        if (buttonEl && buttonEl.dataset.tool) {
            handleManualStep(buttonEl.dataset.tool);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter') && !isProcessing && currentMode === "auto" && !runNextBtn.disabled) {
        if (e.code === 'Space' && e.target === document.body) e.preventDefault();
        runNextAgent();
    }
});

// Init load
document.addEventListener("DOMContentLoaded", () => {
    handleReset();
});

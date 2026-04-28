let clickHistory = [];

const container = document.getElementById('clickContainer');
const logContainer = document.getElementById('clickLog');


function updateLogDisplay() {
    if (clickHistory.length === 0) {
        logContainer.innerHTML = '<p class="log-placeholder">Здесь появится информация о кликах...</p>';
        return;
    }

    const logItems = clickHistory.map(click => {
        return `
            <div class="log-entry">
                <strong>Клик:</strong> 
                <span class="log-text">«${click.textContent}»</span>
                <span class="log-details">
                    id: ${click.id} | 
                    tagName: ${click.tagName} | 
                    className: ${click.className}
                </span>
            </div>
        `;
    }).join('');
    
    logContainer.innerHTML = logItems;
}

function handleBoxClick(event) {
    const target = event.target;

    if (!target.id) return;

    const clickInfo = {
        textContent: target.textContent.trim(),
        id: target.id,
        tagName: target.tagName,
        className: target.className
    };
    clickHistory.push(clickInfo);
    updateLogDisplay();
}
container.addEventListener('click', handleBoxClick);

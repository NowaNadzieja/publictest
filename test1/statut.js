function setTooltipContent() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        const tooltipId = tooltip.getAttribute('data-tooltip-id');
        const paragraph = document.getElementById(tooltipId);
        if (paragraph) {
            tooltip.setAttribute('data-tooltip-text', paragraph.textContent);
        }
    });
}

function adjustTooltipPosition() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipText = window.getComputedStyle(tooltip, '::after');
        const tooltipTextRect = {
            width: tooltipText.getPropertyValue('width'),
            height: tooltipText.getPropertyValue('height')
        };
        
        // Sprawdzanie pozycji tooltipa
        if (tooltipRect.left < parseFloat(tooltipText.width)) {
            tooltip.classList.add('right');
            tooltip.classList.remove('bottom');
        } else if (tooltipRect.right + parseFloat(tooltipText.width) > window.innerWidth) {
            tooltip.classList.add('left');
            tooltip.classList.remove('bottom');
        } else if (tooltipRect.bottom + parseFloat(tooltipText.height) > window.innerHeight) {
            tooltip.classList.add('bottom');
            tooltip.classList.remove('left');
        } else {
            tooltip.classList.remove('left', 'right', 'bottom');
        }
    });
}

function make_level(level, sections) {
    if (level > 5) return document.createElement('p');

    const ul = document.createElement('ul');
    ul.classList.add(name + '-list');

    sections.forEach(section => {
        const li = document.createElement('li');
        if (section.querySelector('h'+level)) {
            const a = document.createElement('a');

            a.href = `#${section.id}`;
            a.textContent = section.querySelector('h'+level).textContent;

            li.appendChild(a);
        }
        // Dodanie sekcji
        const subsections = section.querySelectorAll('.level' + level);
        if (subsections.length > 0) {
            li.appendChild(make_level(level+1, subsections));
        } else {
            li.appendChild(make_level(level+1, sections));
        }

        ul.appendChild(li);
    });
    return ul;
}
function make_sidebar() {
    const sidebar = document.getElementById('sidebar');

    const sections = document.querySelectorAll('.level2');

    sidebar.appendChild(make_level(2, sections));

    sidebar.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.parentElement.querySelector('ul.section-list')) {
            const sectionList = event.target.parentElement.querySelector('ul.section-list');
            sectionList.classList.toggle('expanded');
        }
    });

}
document.addEventListener('DOMContentLoaded', () => {
    make_sidebar();
    setTooltipContent();
    adjustTooltipPosition();
    window.addEventListener('resize', adjustTooltipPosition);
});

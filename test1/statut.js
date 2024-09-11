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

function make_sidebar() {
    const sidebar = document.getElementById('sidebar');
    const chapters = document.querySelectorAll('.chapter');

    const ul = document.createElement('ul');

    chapters.forEach(chapter => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = `#${chapter.id}`;
        a.textContent = chapter.querySelector('h2').textContent;

        li.appendChild(a);

        // Dodanie sekcji
        const sections = chapter.querySelectorAll('.section');
        if (sections.length > 0) {
            const sectionUl = document.createElement('ul');
            sectionUl.classList.add('section-list');
            sections.forEach(section => {
                const sectionLi = document.createElement('li');
                const sectionA = document.createElement('a');

                sectionA.href = `#${section.id}`;
                sectionA.textContent = section.querySelector('h3').textContent;

                sectionLi.appendChild(sectionA);
                sectionUl.appendChild(sectionLi);
            });
            li.appendChild(sectionUl);
        }

        ul.appendChild(li);
    });

    sidebar.appendChild(ul);
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

document.addEventListener('DOMContentLoaded', function() {
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'cursor-container';
    document.body.appendChild(cursorContainer);
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursorContainer.appendChild(cursor);
    
    const numTrails = 5;
    const trailElements = [];
    
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (0.7 - (i * 0.1));
        cursorContainer.appendChild(trail);
        trailElements.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateTrail() {
        for (let i = 0; i < trailElements.length; i++) {
            const trail = trailElements[i];
            
            const targetX = i === 0 ? mouseX : trailElements[i - 1].x;
            const targetY = i === 0 ? mouseY : trailElements[i - 1].y;
            
            trail.x += (targetX - trail.x) / (i * 2 + 5);
            trail.y += (targetY - trail.y) / (i * 2 + 5);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget == null) {
            cursor.style.display = 'none';
            trailElements.forEach(trail => {
                trail.element.style.display = 'none';
            });
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.display = 'block';
        trailElements.forEach(trail => {
            trail.element.style.display = 'block';
        });
    });
});
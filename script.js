function points(marks) {
    marks = Math.floor(marks);
    if(marks>=85 && marks<=100){
        return 4.0;
    }else{
        switch(marks){
            case 84: return 3.94; case 83: return 3.88;
            case 82: return 3.82; case 81: return 3.77;
            case 80: return 3.71; case 79: return 3.65;
            case 78: return 3.60; case 77: return 3.54;
            case 76: return 3.48; case 75: return 3.43;
            case 74: return 3.37; case 73: return 3.31;
            case 72: return 3.25; case 71: return 3.20;
            case 70: return 3.14; case 69: return 3.08;
            case 68: return 3.03; case 67: return 2.97;
            case 66: return 2.91; case 65: return 2.86;
            case 64: return 2.80; case 63: return 2.74;
            case 62: return 2.68; case 61: return 2.63;
            case 60: return 2.57; case 59: return 2.51;
            case 58: return 2.46; case 57: return 2.40;
            case 56: return 2.34; case 55: return 2.29;
            case 54: return 2.23; case 53: return 2.17;
            case 52: return 2.11; case 51: return 2.06;
            case 50: return 2.00; default: return 0.0;
        }   
    }
}

function calGPA(){
    let totalCreditPoints=0;
    let totalCredits=0;
    
    for(let i=1; i<=8; i++){
        let credits = document.getElementById('c' + i).value;
        let marks = document.getElementById('m' + i).value;
        marks = Math.floor(marks);
        if(credits && marks){
            credits=parseFloat(credits);
            marks=parseFloat(marks);
            if(marks>=0 && marks<=100){
                let gradePoint = points(marks);
                totalCreditPoints += credits * gradePoint;
                totalCredits += credits;
            }
        }
    }  
    
    let gpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
    return {
        gpa: gpa.toFixed(2),
        grade: getGrade(gpa),
        totalCredits: totalCredits,
        totalPoints: totalCreditPoints.toFixed(2)
    };
}

function getGrade(gpa){
    gpa = parseFloat(gpa);
    if(gpa >= 3.95 && gpa <= 4.00) return 'A+';
    else if(gpa >= 3.71 && gpa <= 3.94) return 'A';
    else if(gpa >= 2.86 && gpa <= 3.70) return 'B'; 
    else if(gpa >= 2.29 && gpa <= 2.85) return 'C';  
    else if(gpa >= 2.00 && gpa <= 2.28) return 'D';  
    else return 'F';
}

function updateGP(subjectNumber) {
    let marksInput = document.getElementById('m' + subjectNumber);
    let gpDisplay = document.getElementById('gp' + subjectNumber);   
    if (!marksInput || !gpDisplay) return;    
    let marks = marksInput.value; 
    marks=Math.floor(marks);   
    if (marks && marks >= 0 && marks <= 100) {
        let gradePoint = points(parseFloat(marks));
        gpDisplay.textContent = gradePoint.toFixed(2);              
    } else {
        gpDisplay.textContent = '0.00';
    }
}

function updateHalfMeter() {
    let results = calGPA(); 
    let gpa = parseFloat(results.gpa);
    
    document.getElementById('halfGPA').textContent = results.gpa;
    let targetRotation = -90 + (gpa / 4) * 180;
    let needle = document.getElementById('gpaHalfNeedle');
    let currentRotation = -90;
    
    function step() {
        if (currentRotation < targetRotation) {
            currentRotation += 2;
            needle.style.transform = `translateX(-50%) rotate(${currentRotation}deg)`;
            setTimeout(step, 7);
        } else if (currentRotation > targetRotation) {
            currentRotation -= 2;
            needle.style.transform = `translateX(-50%) rotate(${currentRotation}deg)`;
            setTimeout(step, 7);
        }
    }
    step();
}

function updateTopSection() {
    let results = calGPA(); 
    let gpa = parseFloat(results.gpa);
    let percentage = (gpa / 4) * 100;
    
    document.getElementById('liveGPA').textContent = results.gpa;
    document.getElementById('livePercentage').textContent = percentage.toFixed(1) + '%';
    document.getElementById('liveGrade').textContent = results.grade;
}

window.onload = function() {
    for (let i = 1; i <= 8; i++) {
        updateGP(i);
    }
    updateHalfMeter();
    updateTopSection();
};

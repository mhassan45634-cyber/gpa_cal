function points(marks) {
    if(marks>=85 && marks<=100) {
        return 4.0;
    }else{
        switch(marks){
            case 84: return 3.94;
            case 83: return 3.88;
            case 82: return 3.82;
            case 81: return 3.77;
            case 80: return 3.71;
            case 79: return 3.65;
            case 78: return 3.60;
            case 77: return 3.54;
            case 76: return 3.48;
            case 75: return 3.43;
            case 74: return 3.37;
            case 73: return 3.31;
            case 72: return 3.25;
            case 71: return 3.20;
            case 70: return 3.14;
            case 69: return 3.08;
            case 68: return 3.03;
            case 67: return 2.97;
            case 66: return 2.91;
            case 65: return 2.86;
            case 64: return 2.80;
            case 63: return 2.74;
            case 62: return 2.68;
            case 61: return 2.63;
            case 60: return 2.57;
            case 59: return 2.51;
            case 58: return 2.46;
            case 57: return 2.40;
            case 56: return 2.34;
            case 55: return 2.29;
            case 54: return 2.23;
            case 53: return 2.17;
            case 52: return 2.11;
            case 51: return 2.06;
            case 50: return 2.00;
            default: return 0.0;
        }   
    }
}
function calGPA(){
    let totalCreditPoints=0;
    let totalCredits=0;
    let validSubjects=0;
    let subjectResults=[];    
    for(let i=1; i<=8; i++){
        let credits = document.getElementById('c' + i).value;
        let marks = document.getElementById('m' + i).value;
        if (credits && marks && credits > 0) {
            credits = parseFloat(credits);
            marks = parseFloat(marks);
            if (marks >= 0 && marks <= 100) {
                let gradePoint = points(marks);
                totalCreditPoints += credits * gradePoint;
                totalCredits += credits;
                validSubjects++;
                subjectResults.push({
                    subject: i,
                    credits: credits,
                    marks: marks,
                    points: gradePoint
                });
            }
        }
    }  
    let gpa = totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : 0;
    let grade = getLetterGrade(gpa);   
    return {
        gpa: gpa,
        grade: grade,
        totalCredits: totalCredits,
        totalSubjects: validSubjects,
        subjectResults: subjectResults,
        totalPoints: totalCreditPoints.toFixed(2)
    };
}
function getLetterGrade(gpa){
    gpa=parseFloat(gpa);
    if(gpa>=3.95 && gpa<=4.00) return 'A+';
    else if(gpa>=3.71 && gpa<=3.94) return 'A';
    else if(gpa>=2.86 && gpa<=3.65) return 'B';
    else if(gpa>=2.29 && gpa<=2.80) return 'C';
    else if(gpa>=2.00 && gpa<=2.23) return 'D';
    else return 'F';
}
function validateInputs(){
    for (let i=1; i<=8; i++){
        let credits=document.getElementById('c' + i).value;
        let marks=document.getElementById('m' + i).value;
        if(!credits && !marks) continue;
        if((credits && !marks) || (!credits && marks)){
            alert(`Subject ${i}: Please fill both Credit Hours and Marks, or leave both empty`);
            return false;
        }    
        if(credits){
            credits=parseFloat(credits);
            if(credits<0 || credits>6){
                alert(`Subject ${i}: Credit hours should be between 0 and 6`);
                return false;
            }
        }
        if(marks){
            marks=parseFloat(marks);
            if(marks<0 || marks>100){
                alert(`Subject ${i}: Marks should be between 0 and 100`);
                return false;
            }
        }
    }
    return true;
}
function openModal(){
    if(!validateInputs()){
        return;
    }
    let results=calGPA();
    if(results.totalSubjects===0) {
        alert('Please enter at least one subject with credit hours and marks');
        return;
    }
    let resultHTML=`
        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
            <h4 style="margin: 0 0 15px 0; color: #333;">Summary</h4>
            <div class="result-row" style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>📚 Subjects Calculated:</span>
                <strong>${results.totalSubjects}</strong>
            </div>
            <div class="result-row" style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>⏱️ Total Credit Hours:</span>
                <strong>${results.totalCredits}</strong>
            </div>
            <div class="result-row" style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>📊 Total Grade Points:</span>
                <strong>${results.totalPoints}</strong>
            </div>
            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                <div style="font-size: 14px; color: #666;">Your GPA</div>
                <div style="font-size: 36px; font-weight: bold; color: #4CAF50;">${results.gpa}</div>
                <div style="font-size: 18px; color: #2196F3; margin-top: 5px;">Grade: ${results.grade}</div>
            </div>
        </div>
    `;
    document.getElementById('modalBody').innerHTML=resultHTML;
    document.getElementById('resultModal').style.display='block';
}
function closeModal(){
    document.getElementById('resultModal').style.display='none';
}
window.onclick=function(event){
    let modal=document.getElementById('resultModal');
    if(event.target==modal){
        modal.style.display='none';
    }
}
function resetFields(){
    for(let i=1; i<=8; i++){
        document.getElementById('c' + i).value='';
        document.getElementById('m' + i).value='';
    }
}
document.addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        openModal();
    }
});

let currentGrade = 0;

const currentYear = new Date().getFullYear();
const currentMonth = Number(String(new Date().getMonth() + 1).padStart(2, '0'));
const currentDay = Number(String(new Date().getDate()).padStart(2, '0'));
const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

const oneDay = 24 * 60 * 60 * 1000; // hours * mins * secs * millisecs

input = document.getElementById('courseTitle');
input.addEventListener('keyup', function () {
    if (input.value.toLowerCase().includes('advance') || input.value.toLowerCase().includes('accel') || input.value.toLowerCase().includes('honor') || input.value.toLowerCase().includes('ap') || input.value.toLowerCase().includes('ib')) {
        document.getElementById('diffTip').classList.remove('hidden');
        input.classList.remove('mb-4');
    } else {
        document.getElementById('diffTip').classList.add('hidden');
        input.classList.add('mb-4');
    }
});

inputE = document.getElementById('courseTitleEdit');
inputE.addEventListener('keyup', function () {
    if (inputE.value.toLowerCase().includes('advance') || inputE.value.toLowerCase().includes('accel') || inputE.value.toLowerCase().includes('honor') || inputE.value.toLowerCase().includes('ap') || inputE.value.toLowerCase().includes('ib')) {
        document.getElementById('diffTipE').classList.remove('hidden');
        inputE.classList.remove('mb-4');
    } else {
        document.getElementById('diffTipE').classList.add('hidden');
        inputE.classList.add('mb-4');
    }
});

getLists();
saveLists();
getCourses();
getActs();
getTests();
getCD();
calcListDiff();

function toggleMenu() {
    document.getElementById('menuDiv').classList.toggle('hidden');
    document.getElementById('menuDiv').classList.toggle('block');
}

function openAddCourse(num) {
    currentGrade = num;

    document.getElementById('courseModal').classList.remove('fadeIn');
    document.getElementById('courseModal').classList.add('fadeOut');

    document.getElementById('selGradeLev').value = currentGrade;
}

function openAddAct() {
    document.getElementById('actModal').classList.remove('fadeIn');
    document.getElementById('actModal').classList.add('fadeOut');
}

function openAddTest() {
    document.getElementById('testModal').classList.remove('fadeIn');
    document.getElementById('testModal').classList.add('fadeOut');
}

function openDiff() {
    document.getElementById('diffModal').classList.remove('fadeIn');
    document.getElementById('diffModal').classList.add('fadeOut');
}

function openDiffPercent() {
    document.getElementById('diffPercentModal').classList.remove('fadeIn');
    document.getElementById('diffPercentModal').classList.add('fadeOut');
}

function openCD() {
    document.getElementById('countdownModal').classList.remove('fadeIn');
    document.getElementById('countdownModal').classList.add('fadeOut');

    document.getElementById('gradDay').value = gradDay;
    document.getElementById('gradMonth').value = gradMonth;
    document.getElementById('gradYear').value = gradYear;
}

let buttons = document.querySelectorAll('.planBtns');
buttons.forEach((planBtns) => {
    planBtns.addEventListener('click', () => {
        // add/remove classes from all buttons
        buttons.forEach((planBtns) => {
            planBtns.classList.remove('bg-green-600/30');
            planBtns.classList.remove('text-slate-600');
            planBtns.classList.add('text-slate-500');
            planBtns.classList.add('hover:bg-slate-400/30');
        });

        // add/remove classes to the clicked button
        planBtns.classList.add('bg-green-600/30');
        planBtns.classList.add('text-slate-600');
        planBtns.classList.remove('text-slate-500');
        planBtns.classList.remove('hover:bg-slate-400/30');
    });
});

function showPlan() {
    document.getElementById('planDiv').classList.remove('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    toggleMenu();
}

function showExtra() {
    document.getElementById('actsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    toggleMenu();
}

function showTests() {
    document.getElementById('testsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    toggleMenu();
}

function addCourse() {
    let input = document.getElementById('courseTitle').value.trim();

    if (input.length > 60) {
        alert('Course title is too long');
    } else if (input == '') {
        alert('Enter the title of your course');
    } else {
        currentGrade = document.getElementById('selGradeLev').value;

        let course = document.createElement('li');
        course.name = input;

        course.id = 'C' + Math.floor(100000000 + Math.random() * 900000000);

        course.sub = document.getElementById('selSubject').value;
        let i = document.createElement('i');
        i.id = course.id + 'SbjI'
        i.className = getSubjectIcon(course.sub);
        i.ariaLabel = course.sub;
        course.appendChild(i);

        let t = document.createTextNode(course.name);
        course.appendChild(t);
        course.className = 'item course';

        course.gradeLevel = currentGrade;

        course.diff = document.getElementById('selDiff').value;

        let div = document.createElement('div');
        div.id = course.id + 'Diff';
        [diffText, diffClass] = getDiff(course.diff);
        t = document.createTextNode(diffText);
        div.className = diffClass;
        div.appendChild(t);
        course.appendChild(div);

        if (course.sub == 'PE') {
            course.diff = document.getElementById('selDiff').value * 0.05;
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit course';
        btn.name = 'Edit course';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove course';
        btn.name = 'Remove course';
        btn.appendChild(icon);
        div.appendChild(btn);

        course.appendChild(div);

        localStorage.setItem(course.id + 'Name', course.name);
        localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
        localStorage.setItem(course.id + 'Sub', course.sub);
        localStorage.setItem(course.id + 'Diff', course.diff);

        document.getElementById('list' + currentGrade).appendChild(course);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        calcListDiff();
        saveLists();
        hide();
    }
}

function addAct() {
    let input = document.getElementById('actTitle').value.trim();
    let descInput = document.getElementById('actDesc').value.trim();
    let posInput = document.getElementById('actPosition').value.trim();

    if (input.length > 60) {
        alert('Actvity title is too long');
    } else if (descInput.length > 160) {
        alert('Actvity description is too long');
    } else if (posInput.length > 20) {
        alert('Position title is too long');
    } else if (input == '') {
        alert('Enter the title of your activity');
    } else {
        let activity = document.createElement('li');
        activity.name = input;

        activity.id = 'A' + Math.floor(100000000 + Math.random() * 900000000);

        activity.category = document.getElementById('selActCategory').value;
        let i = document.createElement('i');
        i.id = activity.id + 'ActI';
        actClass = getActIcon(activity.category);
        i.className = actClass;
        i.ariaLabel = activity.category;
        activity.appendChild(i);

        let t = document.createTextNode(activity.name);
        activity.appendChild(t);
        activity.className = 'item activity';

        activity.pos = posInput;

        let div = document.createElement('div');
        div.className = 'attr actPos';
        div.id = activity.id + 'Pos';
        t = document.createTextNode(activity.pos);
        div.appendChild(t);
        activity.appendChild(div);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit activity';
        btn.name = 'Edit activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove activity';
        btn.name = 'Remove activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        activity.appendChild(div);

        activity.desc = descInput;

        let h2 = document.createElement('h2');
        h2.className = 'actDesc';
        h2.id = activity.id + 'Desc';
        t = document.createTextNode(activity.desc);
        h2.appendChild(t);
        activity.appendChild(h2);

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Pos', activity.pos);

        document.getElementById('listActs').appendChild(activity);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
}

function addTest() {
    let monthInput = document.getElementById('testMonth').value.trim();
    let yearInput = document.getElementById('testYear').value.trim();
    let scoreInput = document.getElementById('testScore').value.trim();
    let speciesInput = document.getElementById('selTestSpecies').value.trim();

    if (monthInput < 1 || monthInput > 12) {
        alert('Enter a valid month 1-12');
    } else if (yearInput < 1926 || yearInput > currentYear + 4) {
        alert('Enter a valid year');
    } else if ((scoreInput < 0) || (scoreInput > 36 && speciesInput == 'ACT') || (scoreInput > 35 && speciesInput == 'PreACT') || (scoreInput > 2400 && speciesInput == 'SAT') || (scoreInput > 1520 && speciesInput == 'PSAT') || (scoreInput > 5 && speciesInput == 'AP') || (scoreInput > 45 && speciesInput == 'IB')) {
        alert('Score not possible');
    } else if (scoreInput == '') {
        alert('Enter the test score');
    } else {
        let test = document.createElement('li');
        test.id = 'T' + Math.floor(100000000 + Math.random() * 900000000);

        let i = document.createElement('i');
        i.id = test.id + 'TestI';
        i.className = 'testI fa-solid fa-file-lines';
        i.ariaLabel = 'Test icon';
        test.appendChild(i);

        test.species = speciesInput;
        test.year = yearInput;
        if (monthInput.length == 1) {
            test.month = '0' + monthInput;
        } else {
            test.month = monthInput;
        }

        let t = document.createTextNode(`${test.species} — ${test.month}/${test.year}`);
        test.appendChild(t);
        test.className = 'item test';

        test.score = scoreInput;

        let div = document.createElement('div');
        div.className = 'attr testScore';
        div.id = test.id + 'Score';
        t = document.createTextNode(test.score);
        div.appendChild(t);
        test.appendChild(div);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.name = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.name = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);

        document.getElementById('listTests').appendChild(test);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
}

let pen = document.getElementsByClassName('pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        if (this.parentElement.parentElement.id.startsWith('C')) {
            clickPen(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('A')) {
            clickPenAct(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('T')) {
            clickPenTest(this.parentElement.parentElement);
        }
    }
}

let trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

function clickPen(c) {
    getCourses();

    course = c;

    document.getElementById('courseTitleEdit').value = course.name;
    document.getElementById('selGradeLevEdit').value = course.gradeLevel;
    document.getElementById('selSubjectEdit').value = course.sub;
    document.getElementById('selDiffEdit').value = course.diff;

    if (course.sub == 'PE') {
        document.getElementById('selDiffEdit').value = course.diff / 0.05;
    } else {
        document.getElementById('selDiffEdit').value = course.diff;
    }

    document.getElementById('editCourseModal').classList.remove('fadeIn');
    document.getElementById('editCourseModal').classList.add('fadeOut');
}

function clickPenAct(a) {
    getActs();

    activity = a;

    document.getElementById('actTitleEdit').value = activity.name;

    document.getElementById('actDescEdit').value = activity.desc;
    document.getElementById('selActCategoryEdit').value = activity.category;
    document.getElementById('actPositionEdit').value = activity.pos;

    document.getElementById('editActModal').classList.remove('fadeIn');
    document.getElementById('editActModal').classList.add('fadeOut');
}

function clickPenTest(t) {
    getTests();

    test = t;

    document.getElementById('selTestSpeciesEdit').value = test.species;
    document.getElementById('testMonthEdit').value = test.month;
    document.getElementById('testYearEdit').value = test.year;
    document.getElementById('testScoreEdit').value = test.score;

    document.getElementById('editTestModal').classList.remove('fadeIn');
    document.getElementById('editTestModal').classList.add('fadeOut');
}

function clickTrash(el) {
    if (confirm('Are you sure you want to remove \"' + el.name + '\"?')) {
        el.remove();

        calcListDiff();
        saveLists();
    }
}

function saveCourse() {
    if (course.gradeLevel !== document.getElementById('selGradeLevEdit').value) {
        course.gradeLevel = document.getElementById('selGradeLevEdit').value;
        document.getElementById('list' + course.gradeLevel).appendChild(course.cloneNode(true));

        course.remove();
    }

    course.name = document.getElementById('courseTitleEdit').value;
    course.sub = document.getElementById('selSubjectEdit').value;
    course.diff = document.getElementById('selDiffEdit').value;

    course.innerHTML = `<i id='${course.id}SbjI'></i>${course.name}<div id='${course.id}Diff'></div>`;

    div = document.createElement('div');
    div.className = 'optDiv';

    let btn = document.createElement('button');
    icon = document.createElement('i');
    icon.className = 'text-lg fa-solid fa-pen';
    btn.className = 'opt pen';
    btn.ariaLabel = 'Edit course';
    btn.name = 'Edit course';
    btn.appendChild(icon);
    div.appendChild(btn);

    btn = document.createElement('button');
    icon = document.createElement('i');
    icon.className = 'text-lg fa-solid fa-trash';
    btn.className = 'opt trash';
    btn.ariaLabel = 'Remove course';
    btn.name = 'Remove course';
    btn.appendChild(icon);
    div.appendChild(btn);

    course.appendChild(div);

    [diffText, diffClass] = getDiff(course.diff);
    document.getElementById(course.id + 'Diff').className = diffClass;
    document.getElementById(course.id + 'Diff').innerText = diffText;

    document.getElementById(course.id + 'SbjI').className = getSubjectIcon(course.sub);
    document.getElementById(course.id + 'SbjI').ariaLabel = course.sub;

    if (course.sub == 'PE') {
        course.diff = document.getElementById('selDiffEdit').value * 0.1;
    }

    localStorage.setItem(course.id + 'Name', course.name);
    localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
    localStorage.setItem(course.id + 'Sub', course.sub);
    localStorage.setItem(course.id + 'Diff', course.diff);

    saveLists();
    getLists();
    getCourses();
    calcListDiff();

    let pen = document.getElementsByClassName('pen');
    for (i = 0; i < pen.length; i++) {
        pen[i].onclick = function () {
            if (this.parentElement.parentElement.id.startsWith('C')) {
                clickPen(this.parentElement.parentElement);
            } else if (this.parentElement.parentElement.id.startsWith('A')) {
                clickPenAct(this.parentElement.parentElement);
            } else if (this.parentElement.parentElement.id.startsWith('T')) {
                clickPenTest(this.parentElement.parentElement);
            }
        }
    }

    let trash = document.getElementsByClassName('trash');
    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            clickTrash(this.parentElement.parentElement);
        }
    }

    hide();
}

function saveAct() {
    let descInput = document.getElementById('actDescEdit').value.trim();
    let posInput = document.getElementById('actPositionEdit').value.trim();

    if (descInput.length > 160) {
        alert('Actvity description is too long');
    } else if (posInput.length > 20) {
        alert('Position title is too long');
    } else {
        activity.name = document.getElementById('actTitleEdit').value;
        activity.desc = descInput;
        activity.category = document.getElementById('selActCategoryEdit').value;
        activity.pos = posInput;

        activity.innerHTML = `<i id='${activity.id}ActI' aria-label='Activity icon'></i>${activity.name}<div class='attr actPos' id='${activity.id}Pos'>${activity.pos}</div><h2 class='actDesc' id='${activity.id}Desc'></h2>`;

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit activity';
        btn.name = 'Edit activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove activity';
        btn.name = 'Remove activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        activity.appendChild(div);

        document.getElementById(activity.id + 'ActI').className = getActIcon(activity.category);
        document.getElementById(activity.id + 'ActI').ariaLabel = activity.category;

        document.getElementById(activity.id + 'Desc').innerText = activity.desc;
        document.getElementById(activity.id + 'Pos').innerText = activity.pos;

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Pos', activity.pos);

        saveLists();
        getLists();
        getActs();

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
}

function saveTest() {
    let monthInput = document.getElementById('testMonthEdit').value.trim();
    let yearInput = document.getElementById('testYearEdit').value.trim();
    let scoreInput = document.getElementById('testScoreEdit').value.trim();
    let speciesInput = document.getElementById('selTestSpeciesEdit').value.trim();

    if (monthInput < 1 || monthInput > 12) {
        alert('Enter a valid month 1-12');
    } else if (yearInput < 1926 || yearInput > currentYear + 4) {
        alert('Enter a valid year');
    } else if ((scoreInput < 0) || (scoreInput > 36 && speciesInput == 'ACT') || (scoreInput > 35 && speciesInput == 'PreACT') || (scoreInput > 2400 && speciesInput == 'SAT') || (scoreInput > 1520 && speciesInput == 'PSAT') || (scoreInput > 5 && speciesInput == 'AP') || (scoreInput > 45 && speciesInput == 'IB')) {
        alert('Score not possible');
    } else if (scoreInput == '') {
        alert('Enter the test score');
    } else {
        test = document.getElementById(test.id);

        if (monthInput.length == 1) {
            test.month = '0' + monthInput;
        } else {
            test.month = monthInput;
        }
        test.year = yearInput;
        test.score = scoreInput;
        test.species = speciesInput;

        test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='attr testScore' id='${test.id}Score'>${test.score}</div>`;

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.name = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.name = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);

        saveLists();
        getLists();
        getTests();

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
}

function saveCD() {
    gradDay = Number(document.getElementById('gradDay').value);
    gradMonth = Number(document.getElementById('gradMonth').value);
    gradYear = Number(document.getElementById('gradYear').value);
    gradDate = new Date(gradYear, gradMonth - 1, gradDay);

    if (gradDay < 1 || gradDay > 31) {
        alert('Enter a valid day 1-31');
    } else if (gradMonth < 1 || gradMonth > 12) {
        alert('Enter a valid month 1-12');
    } else if (gradYear > currentYear + 8) {
        alert('Enter a valid year');
    } else if (gradDate < currentDate) {
        alert('Enter a date in the future');
    } else if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else {
        localStorage.setItem('gradDate', gradDate);
        localStorage.setItem('gradDay', gradDay);
        localStorage.setItem('gradMonth', gradMonth);
        localStorage.setItem('gradYear', gradYear);

        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;

        hide();
    }
}

function getCD() {
    gradDay = Number(localStorage.getItem('gradDay', gradDay));
    gradMonth = Number(localStorage.getItem('gradMonth', gradMonth));
    gradYear = Number(localStorage.getItem('gradYear', gradYear));
    gradDate = new Date(localStorage.getItem('gradDate'));

    if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else if ((gradDate !== NaN || gradDate !== null) && gradDate > currentDate) {
        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
    }
}

function getCourses() { // gets all stored info of each course
    for (let i = 9; i <= 13; i++) {
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];
            course.name = localStorage.getItem(course.id + 'Name');
            course.gradeLevel = localStorage.getItem(course.id + 'GradeLevel');
            course.sub = localStorage.getItem(course.id + 'Sub');
            course.diff = localStorage.getItem(course.id + 'Diff');
        }
    }
}

function getActs() { // gets all stored info of activities
    let currentItems = document.getElementById('listActs').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        activity = currentItems[j];
        activity.name = localStorage.getItem(activity.id + 'Name');
        activity.desc = localStorage.getItem(activity.id + 'Desc');
        activity.category = localStorage.getItem(activity.id + 'Category');
        activity.pos = localStorage.getItem(activity.id + 'Pos');
    }
}

function getTests() { // gets all stored info of activities
    let currentItems = document.getElementById('listTests').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        test = currentItems[j];
        test.species = localStorage.getItem(test.id + 'Species');
        test.month = localStorage.getItem(test.id + 'Month');
        test.year = localStorage.getItem(test.id + 'Year');
        test.score = localStorage.getItem(test.id + 'Score');
    }
}

function calcListDiff() { // calcs diffs of ALL lists
    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');
        let advItems = document.getElementById('list' + i).getElementsByClassName('adv').length
            + document.getElementById('list' + i).getElementsByClassName('hon').length
            + document.getElementById('list' + i).getElementsByClassName('ap').length
            + document.getElementById('list' + i).getElementsByClassName('ib').length;

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];
            course.diff = localStorage.getItem(course.id + 'Diff');
            sum += +course.diff;
        }

        let glDiff = ((sum) + (1.2 ** currentItems.length)) / 6;
        localStorage.setItem('list' + i + 'Diff', (Math.round((glDiff) * 100)) / 100);

        if (currentItems.length < 1 || localStorage.getItem('list' + i + 'Diff') <= 0) {
            document.getElementById('diff' + i).innerText = '';
        } else if (localStorage.getItem('list' + i + 'Diff') < 1) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Easy';
            document.getElementById('diff' + i).className = 'attr lev1';
        } else if (localStorage.getItem('list' + i + 'Diff') < 2) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Normal';
            document.getElementById('diff' + i).className = 'attr lev2';
        } else if (localStorage.getItem('list' + i + 'Diff') < 3) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Hard';
            document.getElementById('diff' + i).className = 'attr lev3';
        } else if (localStorage.getItem('list' + i + 'Diff') < 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Difficult';
            document.getElementById('diff' + i).className = 'attr lev4';
        } else if (localStorage.getItem('list' + i + 'Diff') < 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Challenging';
            document.getElementById('diff' + i).className = 'attr lev5';
        } else if (localStorage.getItem('list' + i + 'Diff') >= 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Extreme';
            document.getElementById('diff' + i).className = 'attr lev6';
        }

        if (advItems > 0) {
            let advPercent = (advItems / currentItems.length) * 100;
            localStorage.setItem('list' + i + 'DiffPercent', Math.round(advPercent));
            document.getElementById('diffPercent' + i).innerText = localStorage.getItem('list' + i + 'DiffPercent') + '%';
            document.getElementById('diffPercent' + i).classList.remove('hidden');
        } else {
            document.getElementById('diffPercent' + i).classList.add('hidden');
        }
    }
}

function saveLists() {
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
    localStorage.setItem('list13', document.getElementById('list13').innerHTML);
    localStorage.setItem('listActs', document.getElementById('listActs').innerHTML);
    localStorage.setItem('listTests', document.getElementById('listTests').innerHTML);
}

function getLists() {
    document.getElementById('list9').innerHTML = localStorage.getItem('list9');
    document.getElementById('list10').innerHTML = localStorage.getItem('list10');
    document.getElementById('list11').innerHTML = localStorage.getItem('list11');
    document.getElementById('list12').innerHTML = localStorage.getItem('list12');
    document.getElementById('list13').innerHTML = localStorage.getItem('list13');
    document.getElementById('listActs').innerHTML = localStorage.getItem('listActs');
    document.getElementById('listTests').innerHTML = localStorage.getItem('listTests');
}

function getSubjectIcon(sub) {
    if (sub == 'English') {
        return 'sbjI fa-solid fa-pencil';
    } else if (sub == 'History') {
        return 'sbjI fa-solid fa-landmark';
    } else if (sub == 'Math') {
        return 'sbjI fa-solid fa-plus-minus';
    } else if (sub == 'Science') {
        return 'sbjI fa-solid fa-atom';
    } else if (sub == 'Foreign Language') {
        return 'sbjI fa-solid fa-globe';
    } else if (sub == 'Technology') {
        return 'sbjI fa-solid fa-compass-drafting';
    } else if (sub == 'Visual Arts') {
        return 'sbjI fa-solid fa-palette';
    } else if (sub == 'Performing Arts') {
        return 'sbjI fa-solid fa-masks-theater';
    } else if (sub == 'PE') {
        return 'sbjI fa-solid fa-dumbbell';
    } else if (sub == 'Other/Elective') {
        return 'sbjI fa-solid fa-graduation-cap';
    }
}

function getActIcon(act) {
    if (act == 'Athletics') {
        return 'actI fa-solid fa-dumbbell';
    } else if (act == 'Club') {
        return 'actI fa-solid fa-puzzle-piece';
    } else if (act == 'Competition') {
        return 'actI fa-solid fa-ranking-star';
    } else if (act == 'Employment') {
        return 'actI fa-solid fa-briefcase';
    } else if (act == 'Event') {
        return 'actI fa-solid fa-calendar-day';
    } else if (act == 'Literature') {
        return 'actI fa-solid fa-pencil';
    } else if (act == 'Math') {
        return 'actI fa-solid fa-plus-minus';
    } else if (act == 'Music') {
        return 'actI fa-solid fa-music';
    } else if (act == 'Science') {
        return 'actI fa-solid fa-atom';
    } else if (act == 'Technology') {
        return 'actI fa-solid fa-compass-drafting';
    } else if (act == 'Visual Arts') {
        return 'actI fa-solid fa-palette';
    } else if (act == 'Performing Arts') {
        return 'actI fa-solid fa-masks-theater';
    } else if (act == 'Volunteering') {
        return 'actI fa-solid fa-hand-holding-hand';
    } else if (act == 'Other') {
        return 'actI fa-solid fa-graduation-cap';
    }
}

function getDiff(diff) {
    if (diff == '4.75') {
        return ['IB', 'attr ib'];
    } else if (diff == '3.75') {
        return ['AP', 'attr ap'];
    } else if (diff == '2.75') {
        return ['Honors', 'attr hon'];
    } else if (diff == '1.75') {
        return ['Advanced', 'attr adv'];
    } else {
        return ['', 'attr none'];
    }
}

window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal')
        || event.target == document.getElementById('editCourseModal')
        || event.target == document.getElementById('actModal')
        || event.target == document.getElementById('editActModal')
        || event.target == document.getElementById('testModal')
        || event.target == document.getElementById('editTestModal')
        || event.target == document.getElementById('diffModal')
        || event.target == document.getElementById('diffPercentModal')
        || event.target == document.getElementById('countdownModal')
        || event.target == document.getElementById('countdownModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('courseModal').classList.add('fadeIn');
    document.getElementById('courseModal').classList.remove('fadeOut');
    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'History';
    document.getElementById('selDiff').value = '1';
    document.getElementById('diffTip').classList.add('hidden');
    input.classList.add('mb-4');

    document.getElementById('editCourseModal').classList.add('fadeIn');
    document.getElementById('editCourseModal').classList.remove('fadeOut');
    document.getElementById('diffTipE').classList.add('hidden');
    inputE.classList.add('mb-4');

    document.getElementById('actModal').classList.add('fadeIn');
    document.getElementById('actModal').classList.remove('fadeOut');
    document.getElementById('actTitle').value = '';
    document.getElementById('actDesc').value = '';
    document.getElementById('selActCategory').value = 'Athletics';
    document.getElementById('actPosition').value = '';

    document.getElementById('editActModal').classList.add('fadeIn');
    document.getElementById('editActModal').classList.remove('fadeOut');

    document.getElementById('testModal').classList.add('fadeIn');
    document.getElementById('testModal').classList.remove('fadeOut');
    document.getElementById('selTestSpecies').value = 'ACT';
    document.getElementById('testMonth').value = '';
    document.getElementById('testYear').value = '';
    document.getElementById('testScore').value = '';

    document.getElementById('editTestModal').classList.add('fadeIn');
    document.getElementById('editTestModal').classList.remove('fadeOut');

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');

    document.getElementById('diffPercentModal').classList.add('fadeIn');
    document.getElementById('diffPercentModal').classList.remove('fadeOut');

    document.getElementById('countdownModal').classList.add('fadeIn');
    document.getElementById('countdownModal').classList.remove('fadeOut');
}
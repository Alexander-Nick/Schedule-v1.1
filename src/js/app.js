import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

let lessonAmount;

document.querySelector('.lessons__input').addEventListener('focus',function(){
document.querySelector('.lessons .alert').style.display = "none";
}) //сброс алерта о не введённом числе в окошке ввода кол-ва уроков

document.querySelector('.save-settings').addEventListener('click',function(){
   lessonAmount = parseInt(document.querySelector('.lessons__input').value);
   let body = document.querySelector('body');
   let checkedRadio = document.querySelector('.radio.active');
   if (checkedRadio.getAttribute('for') == 'dark' ) {
      body.style.backgroundColor = "rgb(49, 49, 49)";
      body.style.color = 'rgb(233, 236, 245)';
   } else {
      body.style.backgroundColor = 'rgb(242, 243, 232)';
      body.style.color = 'rgb(25, 29, 43)';
   }
   document.querySelector('.header__settings').classList.remove('active');
   document.querySelector('.header__settings-content').classList.remove('active');

   document.querySelectorAll('.schedule__select').forEach(function(item){
      item.remove();
   })

   if (document.querySelector('.lessons__input').value > 0) {
      document.querySelector('.schedule').style.display = 'block';
      let arrOfClassesBlock = document.querySelectorAll('.classes');

      for (let i = 0; i<5; i++){
         for (let j = 0; j < document.querySelector('.lessons__input').value; j++){
            for (let k = 0; k < 11; k++){
               arrOfClassesBlock[i*11 + k].append(makeSelect(k).cloneNode(true));
            }
         }
      }

      function makeSelect(classNumber){
         const sel = document.createElement('select');
         const window = document.createElement('option');
         window.setAttribute('value','');
         sel.classList.add('schedule__select');
         sel.append(window.cloneNode(true));

         document.querySelectorAll('.teacher__record').forEach(function(item){
            item.querySelectorAll('[classes]').forEach(function(rec,index){
               
               if (rec.getAttribute('classes').indexOf(' ' + (classNumber+1)+',')>-1){
                  let option = document.createElement('option');
                  option.setAttribute('value',item.querySelector('.teacher__data').innerHTML);
                  option.innerHTML = rec.getAttribute('subject');
                  sel.append(option.cloneNode(true));
               }
            })
         })
         return sel;
      }

      
   } else {
      document.querySelector('.schedule').style.display = 'none';
   }
}) // клик на "сохранить" в настройках


document.querySelector('.header__settings').addEventListener('click',function(event){
   document.querySelector('.teacher').classList.remove('active');
   document.querySelector('.header__add-teacher').classList.remove('active');
   document.querySelector('.header__settings-content').classList.toggle('active');
   event.target.closest('.header__settings').classList.toggle('active');
})//клик на "настройки"

document.querySelector('.header__add-teacher').addEventListener('click',function(event){
   document.querySelector('.header__settings').classList.remove('active');
   document.querySelector('.header__settings-content').classList.remove('active');
   document.querySelector('.teacher').classList.toggle('active');
   event.target.closest('.header__add-teacher').classList.toggle('active');

}) //клик на Добавить учителя

document.addEventListener("click",function(event){


   if (event.target.closest(".radio")){
      let radioArr = document.querySelectorAll('.radio');
      radioArr.forEach(function(item){
         item.classList.remove('active');
      })
   event.target.closest('.radio').classList.add('active');
   }

   if (event.target.closest('.teacher__del')){
      event.target.closest('.teacher__record').remove();
   }

   if (event.target.closest('.teacher__edit')){
      let dataBody = document.querySelector('.script-for');
      let teacherRecord = event.target.closest('.teacher__record');
      dataBody.querySelector('.teacher__initials').value = teacherRecord.querySelector('.teacher__data').innerHTML;
      
      let lessonElement = document.querySelector('.lesson-element');

      document.querySelectorAll('.lesson-element').forEach(function(item){
         item.remove();
      })

      teacherRecord.querySelectorAll('[subject]').forEach(function(item,index){
         lessonElement.querySelector('.teacher__subject').value = item.getAttribute('subject');
         const delLesson = document.createElement('span');
         delLesson.innerHTML = 'X';
         delLesson.classList.add('teacher__del-subject');
         lessonElement.querySelectorAll('.teacher__checkbox').forEach(function(checkbox){
            if (item.getAttribute('classes').indexOf(' ' + checkbox.getAttribute('name') + ',') != -1) {
               checkbox.checked = true;
            } else {
               checkbox.checked = false;
            }
         })
         
         const clonedLessonElement = lessonElement.cloneNode(true);
         if (index>0){
            clonedLessonElement.querySelector('.teacher__checkboxes').after(delLesson.cloneNode(true));
         }
         document.querySelector('.script-for').append(clonedLessonElement);
      })
      event.target.closest('.teacher__record').remove();
   }
   
   if (event.target.closest('.teacher__del-subject')){
      event.target.closest('.lesson-element').remove();
   }

   if (event.target.closest('.red')){
      event.target.closest('.red').classList.remove('red');
   }
})//делегирование событий 1. клик по радио кнопкам выбора темы 2. удаление записи с учителем 3. редактирование записи с учителем. 4. удаление предмета 5. сброс красного бэка для селекта

document.querySelector('.teacher__initials').addEventListener('focus',function(){
   document.querySelector('.teacher__initials').style.border = '2px solid #fff';
})//убирает красный бордюр с поля учитель при фокусе

document.querySelector('.teacher__checkboxes').addEventListener('click',function(){
   document.querySelector('.teacher__checkboxes').style.border = '2px solid rgb(0, 119, 119)';
}) // сброс красного бордюра чекбоксов

document.querySelector('.teacher__subject').addEventListener('focus',function(){
   document.querySelector('.teacher__subject').style.border = '2px solid #fff';
})

let classesStr = '';
const lessonElement = document.querySelector('.lesson-element');
lessonElement.querySelectorAll('.teacher__checkbox').forEach(function(item){
   item.checked = false;
})



document.querySelector('.teacher__add-subject').addEventListener('click',function(event){

   if (!(document.querySelector('.teacher__initials').value)) {
      document.querySelector('.teacher__initials').style.border = '2px solid red';
   } else if (!(document.querySelector('.teacher__subject').value)) {
      document.querySelector('.teacher__subject').style.border = '2px solid red';
   } else {
      let classesArr = document.querySelectorAll('.teacher__checkbox');
      classesArr.forEach(function(item){
         if (item.checked){
            classesStr += item.getAttribute('name') + ' ';
         }
      })
      if (classesStr.length == 0) {
         document.querySelector('.teacher__checkboxes').style.border = '2px solid red';
      } else {
         
         const cloneLessonElement = lessonElement.cloneNode(true);
         cloneLessonElement.querySelectorAll('.teacher__checkbox').forEach(function(checkbox){
            checkbox.checked = false;
         })
         cloneLessonElement.querySelector('.teacher__subject').value = '';
         const delLesson = document.createElement('span');
         delLesson.innerHTML = 'X';
         delLesson.classList.add('teacher__del-subject');
         cloneLessonElement.querySelector('.teacher__checkboxes').after(delLesson.cloneNode(true));
         document.querySelector('.script-for').append(cloneLessonElement);
      }
   }
}) // кнопка добавить предмет

document.querySelector('.teacher__done').addEventListener('click',function(event){
   const record = document.createElement('div');
   record.classList.add('teacher__record');
   record.innerHTML = `<span class="teacher__data">${document.querySelector('.teacher__initials').value}</span>`;
   let arrOfSubjects = [];
   let arrOfClasses = [];


   let arrOfLessonElements = document.querySelectorAll('.lesson-element');
   arrOfLessonElements.forEach(function(item,index){
      const spanSubject = document.createElement('span');
      arrOfSubjects.push(item.querySelector('.teacher__subject').value);
      function getStrOfClasses(item){
         let str = '';
         let arrayOfCheckboxes = item.querySelectorAll('.teacher__checkbox');
         arrayOfCheckboxes.forEach(function(item){
            if (item.checked) str += ' ' + item.getAttribute('name')  + ',';
         })
         
         
         return str;
      }
      
      arrOfClasses.push(getStrOfClasses(item))
      spanSubject.setAttribute('subject',arrOfSubjects[index]);
      spanSubject.setAttribute('classes',arrOfClasses[index]);
      record.append(spanSubject.cloneNode(true));
   })
   record.innerHTML += '<div class="teacher__set"><span class="teacher__edit">Ред</span><span class="teacher__del">Х</span></div>';
   document.querySelector('.teacher__records').append(record.cloneNode(true));

   document.querySelector('.teacher__initials').value = '';
   document.querySelector('.teacher__subject').value = '';

   document.querySelectorAll('.lesson-element').forEach(function(item,index){
      if (index != 0) item.remove();
   })

   document.querySelectorAll('.teacher__checkbox').forEach(function(checkbox){
      checkbox.checked = false;
   })

}) //Кнопка "Готово" при создании записи об учителе


/*--КНОПКА ПРОВЕРКИ РАСПИСАНИЯ*/

document.querySelector('.header__button').addEventListener('click',function(event){
   const schedule = document.querySelector('.schedule__container');
   const scheduleSelects = schedule.querySelectorAll('.schedule__select');
   scheduleSelects.forEach(function(item){
      item.classList.remove('red');
   })

   for (let i = 0; i < 5; i++){
   }

   for (let d = 0; d < 5; d++){
      for (let k = 0; k < lessonAmount; k++){
         for (let i = d*lessonAmount*11 + k; i < lessonAmount*10*(d+1) + (d*lessonAmount); i+=lessonAmount){
            for (let j = i + lessonAmount; j < lessonAmount*11*(d+1); j += lessonAmount){
               if (scheduleSelects[i].value === scheduleSelects[j].value && scheduleSelects[i].value != '') {
                  scheduleSelects[i].classList.add('red');
                  scheduleSelects[j].classList.add('red');
               }
            }
         }
      }
   }
}) 
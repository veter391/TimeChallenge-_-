"use strict";

document.addEventListener('DOMContentLoaded', () => {
    console.log('... script loading')
    
    // seek form, list and add it to variable
    const form = document.querySelector('.form');
    const list = document.querySelector('.time');

    // new undefined variable for timer *-_-
    let timer;

    const onChagneTime = (state) => {
        // i created on datatime object with hours, minutes, etc..
        const time = {
            // + in the start is convert data to number! =>  +'25' = 25  => +'hello' = NaN
            hours: +form.querySelector('#hours').value,
            minutes: +form.querySelector('#minutes').value,
            seconds: +form.querySelector('#seconds').value + (state ? 0 : 1),
            days: 0
        }

        // this function is render a list with changes
        const render = () => {
            // check seconds
            if (time.seconds >= 60) {
                time.minutes += Math.floor(time.seconds / 60);
                time.seconds %= 60;
            }
            // check minutes
            if (time.minutes >= 60) {
                time.hours += Math.floor(time.minutes / 60);
                time.minutes %= 60;
            }
            // check hours
            if (time.hours >= 24) {
                time.days += Math.floor(time.hours / 24);
                time.hours %= 24;
            }

            // rendering html inside the list
            list.innerHTML = `
                    <li class="time__item">
                        <h2 class="time__title">Days:</h2>
                        <div class="time__data time__data_day">${time.days}</div>
                    </li>
                    <li class="time__item">
                        <h2 class="time__title">Hours:</h2>
                        <div class="time__data time__data_hour">${time.hours}</div>
                    </li>
                    <li class="time__item">
                        <h2 class="time__title">Minutes:</h2>
                        <div class="time__data time__data_minute">${time.minutes}</div>
                    </li>
                    <li class="time__item">
                        <h2 class="time__title">Seconds:</h2>
                        <div class="time__data time__data_second">${time.seconds}</div>
                    </li>
                `     
        }

        if(state === 'run') {
            // run timer
            timer = setInterval(() => { 

                // add step to timer
                time.seconds++;

                // render new changed list
                render();
            }, 1000);
        } else {

            // render list
            render();
        }
    }

    form.addEventListener('input', () => {
        // remove timer when typin inside input
        clearInterval(timer);
        
        // and run function onChangeTime and change time
        onChagneTime();
    });

    form.addEventListener('submit', e => {
        // change default submit
        e.preventDefault();
        
        // remove timer and create new
        // multi-click protection)
        clearInterval(timer);

        // and run function onChangeTime and run timer inside it
        onChagneTime('run');
    });

    console.log('script loaded ...')
});

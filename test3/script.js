let bookings = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-09-30 18:00:00",
        "endTime": "2019-09-30 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
]

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

const todaDate = "2019-09-28";

// ดึงข้อมูลตามเลขห้อง
const fetchBookings = (roomId) => {
    const bookingsForEachRoom = bookings.filter(booking => booking.roomId === roomId);
    return bookingsForEachRoom;
}

const getBookingsForWeek = (roomId) => {
    const bookingsForWeek = fetchBookings(roomId);

    const date = new Date(todaDate)

    // หาวันแรกของสัปดาห์
    const firstDayOfWeek = new Date(date);
    // firstDayOfWeek.setDate(date.getDate() - date.getDay());

    // หาวันสุดท้ายของสัปดาห์
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const bookingsForEachRoom = bookingsForWeek.filter(booking => {
        const bookingStartDate = booking.startTime.split(' ')[0];
        const bookingEndDate = booking.endTime.split(' ')[0];
        return bookingStartDate >= firstDayOfWeek.toISOString().split('T')[0] && bookingEndDate <= lastDayOfWeek.toISOString().split('T')[0];
    });

    return bookingsForEachRoom;
}

const getBookingsForMonth = (roomId) => {
    const bookingsForMonth = fetchBookings(roomId);
    const result = []
    for (let bookings of bookingsForMonth) {
        let StartDate = bookings.startTime.split(" ")[0];
        let month = parseInt(StartDate.split("-")[1]);
        if (month === parseInt(todaDate.split("-")[1])) {
            result.push(bookings)
        }
    }
    return result;
}

const getBookingList = (roomId) => {
    const bookingList =  getBookingsForWeek(roomId)
    bookingList.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const showRoomId = document.getElementById("roomNumber");
    showRoomId.textContent = roomId;
    const leftSchedule = document.getElementById("left-schedule");
    const rightSchedule = document.getElementById('right-schedule');

    const bookingDay = document.getElementById("booking-day");
    const bookingMouth = document.getElementById("booking-month");

    let currentDate = null;
    let currentList = null;

    let currentRoom = null;
    let firstDate = null;
    let isFirstRoom = true;

    for (const booking of bookingList) {

        if (booking.roomId === roomId) {

            const startDate = booking.startTime;

            if (roomId !== currentRoom) {
                currentRoom = roomId;
                firstDate = startDate;
                isFirstRoom = false;
            }

            if (startDate < firstDate) {
                firstDate = startDate;
            }
        }

        if (booking.roomId == roomId) {
            const startTime = new Date(booking.startTime);
            const startDate = startTime.toDateString();

            if (startDate !== currentDate) {
                const scheduleBar = document.createElement('div');
                scheduleBar.classList.add('schedule-bar');
                scheduleBar.innerHTML = `( ${startDate.split(' ')[0]}, ${startDate.split(' ')[2]} ${startDate.split(' ')[1]} )`
                rightSchedule.appendChild(scheduleBar);

                currentList = document.createElement('ul');
                currentList.classList.add('schedule-details');
                rightSchedule.appendChild(currentList);

                currentDate = startDate;
            }
            const time = document.createElement('li');
            time.innerHTML = `<p class="time">${booking.startTime.split(' ')[1].slice(0, 5)} - ${booking.endTime.split(' ')[1].slice(0, 5)}</p>`;
            const title = document.createElement('p');
            title.textContent = `${booking.title}`

            currentList.appendChild(time);
            currentList.appendChild(title);
        }

    }
    if (!isFirstRoom) {
        const calendar = new Date(firstDate);
        bookingDay.textContent = calendar.toDateString().split(' ')[0]
        bookingMouth.textContent = `${calendar.toDateString().split(' ')[2]} ${calendar.toDateString().split(' ')[1]}`
    }


    for (const booking of bookingList) {

        const li = document.createElement("li");
        const bookingTime = document.createElement("p");
        bookingTime.innerHTML = `<p class="time">${booking.startTime.split(' ')[1].slice(0, 5)} - ${booking.endTime.split(' ')[1].slice(0, 5)}</p>`;
        bookingTime.classList.add("time");

        const detailed = document.createElement("p");
        detailed.textContent = booking.title;
        detailed.classList.add("detailed");

        if (booking.roomId === roomId && booking.startTime.split(" ")[0] === firstDate.split(" ")[0]) {
            leftSchedule.appendChild(bookingTime);
            leftSchedule.appendChild(detailed);
        }
    }
}

getBookingList(roomId)


// console.log(getBookingsForWeek(roomId))
// console.log(getBookingsForMonth(roomId))





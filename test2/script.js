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

const fetchBookings = (roomId) => {
    const bookingsForEachRoom = bookings.filter(booking => booking.roomId === roomId);
    return bookingsForEachRoom;
}

const checkAvailability = (roomId, startTime, endTime) => {
    const roomBookings = fetchBookings(roomId);
    let reserve = true;
    for (let i of roomBookings) {
        const bookingStartTime = i.startTime;
        const bookingEndTime = i.endTime;

        if (roomId === i.roomId) {
            if (startTime >= bookingStartTime && startTime < bookingEndTime || endTime > bookingStartTime && endTime <= bookingEndTime || startTime <= bookingStartTime && endTime >= bookingEndTime) {
                return reserve = false;
            } else {
                reserve = true;
            }
        }
    }
    return reserve;
}

const getBookingsForWeek = (roomId,todaDate) => {
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

const getBookingsForMonth = (roomId,todaDate) => {
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

// สมมุติว่าวันนี้เป็นวันที่ 28-9-2019
todaDate = "2019-09-28"

console.log(checkAvailability("A101", "2019-09-28 15:00:00", "2019-09-28 16:00:00"))
console.log(getBookingsForWeek("A101",todaDate))
console.log(getBookingsForMonth("A101", todaDate))



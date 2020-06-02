export default {
    getDateParts() {
        const date = new Date()
        const dateTimeFormat = new Intl.DateTimeFormat
            ('en',
            { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: 'numeric' })
        const [
            { value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }
        ] = dateTimeFormat.formatToParts(date)
        return { year, month, day, hour, minute, second }
    },
    
    getCurrentDate() {
        const { year, month, day, hour, minute, second } = this.getDateParts();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    getDateForId() {
        const { year, month, day, hour, minute, second } = this.getDateParts();
        return `${year}${month}${day}${hour}${minute}${second}`;
    },

    getRandomId() {
        const date = this.getDateForId();
        return `${date}-${Math.floor(Math.random() * 10)}`;
    },
}
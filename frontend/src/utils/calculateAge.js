import dayjs from '../utils/dayjs'

const calculateAge = (date) => {
    const today = dayjs()
    const birthdate = dayjs(date)
    
    return today.diff(birthdate, 'year')
}

export default calculateAge;
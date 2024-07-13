import DateUtil from '@nathan/date-util'

console.log(DateUtil.formatDate(new Date('2021-06-01'), 'dd/mm/yyyy'))
console.log(DateUtil.formatString(new Date('2021-06-01'), 'yyyy-mm-dd','dd-mm-yyyy'))

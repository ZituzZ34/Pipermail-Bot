const logicPassMonthsAndYears = (month : number, monthNow : number, year : number, yearNow : number) : boolean=> {
    return ((month <= monthNow && year == yearNow) || (year < yearNow))
}

export default logicPassMonthsAndYears
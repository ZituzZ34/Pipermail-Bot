function formatDate(date : Date) {;
    // let ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d);
    
    let mo = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
    let da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
    let ho = new Intl.DateTimeFormat('es', { hour: 'numeric' }).format(date);
    let mi = new Intl.DateTimeFormat('es', { minute: 'numeric' }).format(date);

    if (mi.toString().length == 1) {
        mi = '0' + mi.toString()
    }
    if (ho.toString().length == 1) {
        ho = '0' + ho.toString()
    }
    
    return `${da}/${mo} ${ho}:${mi}`
}

export default formatDate
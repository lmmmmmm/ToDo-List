const dateUtils = {
    formartDate(date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        return year + '年' + month + '月' + day + '日'
    }
}

export default dateUtils
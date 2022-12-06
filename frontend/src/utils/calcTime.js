const calculateTime = (releaseDate) => {
    const calc = new Date(new Date() - new Date(releaseDate));

    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();

    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    if (years_passed > 0) {
        if (years_passed === 1) return years_passed + " year ago";
        return years_passed + " years ago";
    }
    else if (months_passed > 0) {
        if (years_passed === 1) return months_passed + " month ago";
        return months_passed + " months ago";
    }
    else if (days_passed > 0) {
        if (days_passed === 1) return days_passed + " day ago";
        return days_passed + " days ago";
    }
    else {
        return "uploaded recently";
    }
}

export default calculateTime;
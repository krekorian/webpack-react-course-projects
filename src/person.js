console.log('person.js is running');

const isAdult = (a) => {
    if (a > 18) {
        return true
    } else {
        return false
    }
}

const canDrink = (a) => {
    if (a >= 21) {
        return true
    } else {
        return false
    }
}

const isSenior = (a) => {
    if (a > 65) {
        return true
    } else {
        return false
    }
}

export { isAdult, canDrink, isSenior as default }
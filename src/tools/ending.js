const ending = (num, one, two, five) => {

  num = num % 100  

  if ((num > 4 && num < 21) || num === 0) {    

    return five

  } else {

    let namString = num.toString(),
      last = parseInt(namString.substr(namString.length - 1))    

    if (last > 1 && last < 5) {

      return two

    } else if (last == 1) {

      return one
    }                      
  }
  
  return five
}

export default ending
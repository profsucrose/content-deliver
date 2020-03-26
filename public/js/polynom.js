function solvePoly() {
    const coeffsRaw = document.querySelector('#coeff-input').value.trim().split(' ')
    const x = document.querySelector('#parameter').value

    
    if (!checkProperPoly(coeffs)) {
        alert('Coefficients must be real numbers separated by spaces')
        return
    }

    const coeffs = coeffsRaw.trim().split(' ').map(Number)


}

function constructPolyStringFromCoeffs(coeffs) {
    const degree = coeffs.length - 1
    return coeffs.reduce((acc, coeff, index) => acc + coeff ? `${getSign(coeff)}${index ? ' ' : ''}${Math.abs(coeff)}x^${(degree - index)} ` : '', "")
}

function getSign(coeff) {
    return coeff > 0 ? '+' : '-'
}

function constructPolyFuncFromCoeffs(coeffs) {
    const degree = coeffs.length - 1
    return (x => 
        coeffs.reduce((acc, coeff, index) => acc + coeff*x**(degree - index), 0)
    )
}

function checkProperPoly(coeffs) {
    return coeffs.every(x => !isNaN(Number(x)))
}
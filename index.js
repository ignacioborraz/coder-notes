const sumar = (n1, n2) => {
    n1 = Number(n1)
    n2 = Number(n2)
    n1 + n2;
}
const restar = (n1, n2) => Number(n1) - Number(n2);
const multiplicar = (n1, n2) => n1 * n2;
const dividir = (n1, n2) => n1 / n2;

export default { sumar, restar, multiplicar, dividir };

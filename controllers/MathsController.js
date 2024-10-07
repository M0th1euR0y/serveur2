import { factorial, isPrime, findPrime } from '../mathUtilities.js';

export default class MathsController  {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }

    async get(params) {
        const { op, x, y, n } = params;

        let result;
        let data;
        try{
            switch (op) {
                case '+':
                case ' ':
                    if (x === undefined || y === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(x)) throw new Error("'x' parameter is not a number");
                    if (isNaN(y)) throw new Error("'y' parameter is not a number");
                    result = parseFloat(x) + parseFloat(y);
                    data = {
                        "op": op,
                        "x": x,
                        "y": y,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case '-':
                    if (x === undefined || y === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(x)) throw new Error("'x' parameter is not a number");
                    if (isNaN(y)) throw new Error("'y' parameter is not a number");
                    result = parseFloat(x) - parseFloat(y);
                    data = {
                        "op": op,
                        "x": x,
                        "y": y,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                // case '*':
                //     result = parseFloat(x) * parseFloat(y);
                //     data = {
                //         "op": op,
                //         "x": x,
                //         "y": y,
                //         "value": result
                //     }
                //     this.HttpContext.response.JSON({ data });
                //     break;
                case '*':
                    if (x === undefined || y === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(x)) throw new Error("'x' parameter is not a number");
                    if (isNaN(y)) throw new Error("'y' parameter is not a number");
                    result = parseFloat(x) * parseFloat(y);
                    data = {
                        "op": op,
                        "x": x,
                        "y": y,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case '/':
                    if (x === undefined || y === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(x)) throw new Error("'x' parameter is not a number");
                    if (isNaN(y)) throw new Error("'y' parameter is not a number");
                    result = parseFloat(x) / parseFloat(y);
                    data = {
                        "op": op,
                        "x": x,
                        "y": y,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case '%':
                    if (x === undefined || y === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(x)) throw new Error("'x' parameter is not a number");
                    if (isNaN(y)) throw new Error("'y' parameter is not a number");
                    result = parseFloat(x) % parseFloat(y);
                    data = {
                        "op": op,
                        "x": x,
                        "y": y,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case '!':
                    if (n === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = factorial(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case 'p':
                    if (n === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = isPrime(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                case 'np':
                    if (n === undefined) throw new Error("Missing 'x' or 'y' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = findPrime(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON({ data });
                    break;
                default:
                    result = 'Invalid operation';
            }
        } catch (error) {
            this.HttpContext.response.statusCode = 422;
            this.HttpContext.response.JSON({ op, x, y, n, error: error.message });        }
    }
}
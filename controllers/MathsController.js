import { factorial, isPrime, findPrime } from '../mathUtilities.js';

export default class MathsController {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }

    async get(params) {
        const { op, x, y, n, z } = params;
        if (op === null || op === undefined) {
            this.HttpContext.response.statusCode = 422;
            this.HttpContext.response.JSON({ ...params, error: "'op' parameter is missing" });
            return;
        }
        
        const paramCount = [x, y, n,z].filter(param => param !== undefined).length;
        const operatorCount = [op].filter(operator => operator !== undefined).length;

        if (op !== '?' && (paramCount > 2 || operatorCount !== 1)) {
            this.HttpContext.response.statusCode = 422;
            this.HttpContext.response.JSON({ ...params, error: "Invalid number of parameters or operators. Expected 2 parameters and 1 operator." });
            return;
        }

        let result;
        let data;
        try {
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
                    this.HttpContext.response.JSON(data);
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
                    this.HttpContext.response.JSON(data);
                    break;
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
                    this.HttpContext.response.JSON(data);
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
                    this.HttpContext.response.JSON(data);
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
                    this.HttpContext.response.JSON(data);
                    break;
                case '!':
                    if (n === undefined) throw new Error("Missing 'n' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = factorial(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON(data);
                    break;
                case 'p':
                    if (n === undefined) throw new Error("Missing 'n' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = isPrime(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON(data);
                    break;
                case 'np':
                    if (n === undefined) throw new Error("Missing 'n' parameter");
                    if (isNaN(n) || !Number.isInteger(parseFloat(n)) || parseInt(n) <= 0) throw new Error("'n' parameter must be a positive integer");
                    result = findPrime(parseInt(n));
                    data = {
                        "n": n,
                        "op": op,
                        "value": result
                    }
                    this.HttpContext.response.JSON(data);
                    break;
                default:
                    result = 'Invalid operation';
                    this.HttpContext.response.JSON({ ...params, error: result });
            }
        } catch (error) {
            this.HttpContext.response.statusCode = 422;
            this.HttpContext.response.JSON({ ...params, error: error.message });
        }
    }
}
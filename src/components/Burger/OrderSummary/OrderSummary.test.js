const OrderSummary = require("./OrderSummary")
// @ponicode
describe("componentDidUpdate", () => {
    let inst

    beforeEach(() => {
        inst = new OrderSummary.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidUpdate()
        }
    
        expect(callFunction).not.toThrow()
    })
})

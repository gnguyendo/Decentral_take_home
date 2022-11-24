const _ = require('lodash');
const {expect} = require('chai')


function compare(input, target) {
    return _.isEqual(input, target);
};

const target = {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {},"validations": []};


describe("compare", function() {
    it("should validate two matching objects", function() {
        const data = {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {},"validations": []};
        const result = compare(data, target);
        expect(result).to.be.equal(true);
    });

    it("should validate two matching objects with keys out of order", function() {
        const data = {"merges": [], "name": "sheet2","styles": [],"rows": {},"validations": [],"freeze": "A1"};
        const result = compare(data, target);
        expect(result).to.be.equal(true);
    });

    it("should validate different objects with fewer properties", function() {
        const data = {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {}}
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate different objects where one contains null", function() {
        const data = {"name": null,"freeze": "A1","styles": [],"rows": {}}
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate different objects with same keys and types with different values", function() {
        const data = {"name": "hundred","freeze": "A1","styles": [],"merges": [],"rows": {},"validations": []};
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate array to object", function() {
        const data = [1, 'abc', true];
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate set to object", function() {
        const data = new Set([1, 2, 3]);
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate string to object", function() {
        const data = "hello world"
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it("should validate integer to object", function() {
        const data = 5;
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    }); 

    it ("should validate null to object", function() {
        const data = null;
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it ("should validate undefined to object", function() {
        const data = undefined;
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it ("should validate boolean to object", function() {
        const data = true;
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it ("should validate Symbol to object", function() {
        const data = Symbol('program');
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it ("should validate typed array to object", function() {
        const buffer = new ArrayBuffer(16);
        const data = new Int32Array(buffer);
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });

    it ("should validate error object to object", function() {
        const data = Error();
        const result = compare(data, target);
        expect(result).to.be.equal(false);
    });
});



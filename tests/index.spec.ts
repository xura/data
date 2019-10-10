import * as typeorm from 'typeorm'
import {createSandbox, SinonSandbox, assert, createStubInstance, SinonStub} from 'sinon'
import {expect} from 'chai';
import {connect} from "../src";

class TypeormMock {
    public readonly sandbox: SinonSandbox;
    public readonly stub: SinonStub;

    constructor(method: any, fakeData: Object) {
        this.sandbox = createSandbox();
        this.stub = this.sandbox.stub(typeorm, method).returns(fakeData)
    }

    public close() {
        this.sandbox.restore()
    }
}

describe('Xura | Data', () => {
    let typeormMock: TypeormMock;

    it('connect function is called and returns connection data', async () => {

        const fakeConnectionData = { connectionData: 1 };
        typeormMock = new TypeormMock('createConnection', fakeConnectionData);

        expect(await connect()).to.equal(fakeConnectionData);
        assert.calledOnce(typeormMock.stub);
    });

    afterEach(() => typeormMock.close())
});
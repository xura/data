import * as typeorm from 'typeorm'
import {createSandbox, SinonSandbox, assert, createStubInstance, SinonStub} from 'sinon'
import {expect} from 'chai';
import {connect, connection, data} from "../src";

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

    it('should return connection data when calling the connect function', async () => {

        const fakeConnectionData = { connectionData: 1 };
        typeormMock = new TypeormMock('createConnection', fakeConnectionData);

        expect(await connect()).to.equal(fakeConnectionData);
        assert.calledOnce(typeormMock.stub);
    });

    it('should return the default connection when calling the connection function', async () => {

        // Arrange
        const fakeConnectionData = { connectionData: 1 };
        const getStub = createStubInstance(typeorm.ConnectionManager);
        getStub.get.resolves(fakeConnectionData);
        typeormMock = new TypeormMock('getConnectionManager', getStub);

        // Act
        const connectionData = await connection();

        // Assert
        expect(connectionData).to.equal(fakeConnectionData);
        // expect(await connection()).to.equal(fakeConnectionData);
        // assert.calledOnce(typeormMock.stub);
        // assert.calledOnce(typeormMock.stub.get);

    });

    it('should return an object when accessing the data object', function() {
        expect(data).to.be.instanceOf(Object);
    })

    afterEach(() => typeormMock.close())
});
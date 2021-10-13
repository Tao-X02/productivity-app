// Import modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

// Configure chai
chai.use(chaiHttp);
chai.should();

// Sample test
describe("Application", () => {
    it('should understand basic mathematical principles', function(done) {
        if (5 == 5) {
            done();
        } else {
            done(new Error("Error in equality"));
        }
    });
});

// Test users REST endpoints
describe("Users", () => {
    describe("GET /", () => {
        // Test to get all users
        it("should get all users record", (done) => {
            chai.request(app)
                .get('/api/v1/users')
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in get all"));
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        // Test to get a user by id
        it("should get a user by id", (done) => {
            const id = '616761ceb22382bd46270c90';
            chai.request(app)
                .get(`/api/v1/users/${id}`)
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in get by id"));
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get a user by wrong id
        it("should return status 400 (error)", (done) => {
            const id = '0';
            chai.request(app)
                .get(`/api/v1/users/${id}`)
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in wrong id"));
                    }
                    res.should.have.status(400);
                    done();
                });
        });
    });
});

// Test tasks REST endpoints
describe("Tasks", () => {
    describe("GET /", () => {
        // Test to get all tasks
        it("should get all tasks record", (done) => {
            chai.request(app)
                .get('/api/v1/tasks')
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in get all"));
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        // Test to get a task by id
        it("should get a task by id", (done) => {
            const id = '616770ddad114eb9da4e2da5';
            chai.request(app)
                .get(`/api/v1/tasks/${id}`)
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in get by id"));
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get a task by wrong id
        it("should return status 400 (error)", (done) => {
            const id = '0';
            chai.request(app)
                .get(`/api/v1/tasks/${id}`)
                .end((err, res) => {
                    if (err) {
                        done(new Error("Error in wrong id"));
                    }
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
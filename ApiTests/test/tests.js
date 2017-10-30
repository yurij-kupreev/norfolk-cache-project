var chakram = require('chakram'),
	expect = chakram.expect;

var urlBase = "http://localhost:60193/api/cache/"

describe("Scenario: clear cache.", function() {
	it("RemoveNamespaces: should return 204 on success", function() {
		var response = chakram.delete(urlBase + "namespaces");
		expect(response).to.have.status(204);
		return chakram.wait();
	});
})

describe("Scenario: not implemented.", function() {
	it("RemoveNamespace: should return 501 on success", function() {
		var response = chakram.delete(urlBase + "namespaces/namespace");
		expect(response).to.have.status(501);
		return chakram.wait();
	});
})

describe("Scenario: using uninitialized cache.", function() {
	it("RemoveNamespaces: should return 204 on success", function() {
		var response = chakram.delete(urlBase + "namespaces");
		expect(response).to.have.status(204);
		return chakram.wait();
	});

	it("GetNamespaces: should return 200 on success", function () {
		var response = chakram.get(urlBase + "namespaces");
		expect(response).to.have.status(200);
		return chakram.wait();
	});

	it("GetNamespace: should return 404", function () {
		var response = chakram.get(urlBase + "namespaces/namespace");
		expect(response).to.have.status(404);
		return chakram.wait();
	});

	it("GetKeyValue: should return 404", function() {
		var response = chakram.get(urlBase + "keys/namespace/key");
		expect(response).to.have.status(404);
		return chakram.wait();
	});

	it("GetNamespaceKeys: should return 404", function() {
		var response = chakram.get(urlBase + "keys/namespace");
		expect(response).to.have.status(404);
		return chakram.wait();
	});

	it("RemoveKey: should return 204", function() {
		var response = chakram.delete(urlBase + "keys/namespace/key");
		expect(response).to.have.status(204);
		return chakram.wait();
	});
});

describe("Scenario: setting new key-value pair and removing it.", function() {
	it("RemoveNamespaces: should return 204 on success", function() {
		var response = chakram.delete(urlBase + "namespaces");
		expect(response).to.have.status(204);
		return chakram.wait();
	});

	it("SetKeyValue: should return 204 on created", function () {
		var response = chakram.post(urlBase + "namespaces/mynamespace/mykey/myvalue");
		expect(response).to.have.status(204);
		return chakram.wait();
	});

	it("RemoveKey: should return 204", function() {
		var response = chakram.delete(urlBase + "keys/mynamespace/mykey");
		expect(response).to.have.status(204);
		return chakram.wait();
	});
});


describe("Scenario: getting information.", function() {
	it("RemoveNamespaces: should return 204 on success", function() {
		var response = chakram.delete(urlBase + "namespaces");
		expect(response).to.have.status(204);
		return chakram.wait();
	});

	it("SetKeyValue: should return 204 on created", function () {
		var response = chakram.post(urlBase + "namespaces/mynamespace2/mykey/myvalue");
		expect(response).to.have.status(204);
		return chakram.wait();
	});

	it("GetNamespaces: should return 200 on success", function () {
		var response = chakram.get(urlBase + "namespaces");
		expect(response).to.have.status(200);
		return chakram.wait();
	});

	it("GetNamespace: should return 404", function () {
		var response = chakram.get(urlBase + "namespaces/mynamespace2");
		expect(response).to.have.status(200);
		return chakram.wait();
	});

	it("GetNamespaceKeys: should return 200 and JSON object on success", function() {
		var response = chakram.get(urlBase + "keys/mynamespace2");
		expect(response).to.have.status(200);
		expect(response).to.comprise.of.json({
			"Namespace" : "mynamespace2",
			"KeyCount" : 1,
			"Keys" : [ "mykey" ]
		});
		return chakram.wait();
	});

	it("GetKeyValue: should return 200 and JSON object on success", function () {
		var response = chakram.get(urlBase + "keys/mynamespace2/mykey");
		expect(response).to.have.status(200);
		expect(response).to.comprise.of.json({
			"Namespace" : "mynamespace2",
			"Key" : "mykey",
			"Values" : [ "myvalue" ]
		});
		return chakram.wait();
	});

	it("RemoveKey: should return 204", function() {
		var response = chakram.delete(urlBase + "keys/mynamespace2/mykey");
		expect(response).to.have.status(204);
		return chakram.wait();
	});
});

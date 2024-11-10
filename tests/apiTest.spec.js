import {test, request, expect} from '@playwright/test'
import * as data from '../testData/apiTestData/apiTestData.js';

const BASE_URL = 'http://localhost:5001/api';

// test (' GET /', async () =>  {
//
//     const apiRequest = await request.newContext();
//
//     const response = await apiRequest.get(`${BASE_URL}/`);
//     // (BASE_URL + "/")
    /*
    APIResponse: 200 OK
  X-Powered-By: Express
  Content-Type: text/html; charset=utf-8
  Content-Length: 23
  ETag: W/"17-e7men0TKiMdRQRNwnNNj2O/Tllw"
  Date: Sun, 22 Sep 2024 16:48:09 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5
     */

//     console.log((response));
//     console.log(await response.text());
//
//    // await expect(actualResult).assertWord.(expectedResult);
//     //await expect(response).toBe(BASE_URL);
//     await expect(await response.text()).toEqual("Node Express API Server")
// });

test('GET /users/empty DB message', async () =>  {

    const expectedResponseText = "There are no users.";
    const expectedContentTypeValue = "text/html; charset=utf-8";
    const expectedContentLength = expectedResponseText.length.toString();

    const apiRequest = await request.newContext();
    await expect(
        await  apiRequest.delete(`${BASE_URL}/users/`)
    ).toBeOK();

    const response = await apiRequest.get(`${BASE_URL}/users/`);

    const statusCode = response.status();

    await expect(response).toBeOK();
    await expect(statusCode).toBe(200);

    // header
    const contentTypeHeaderValue = response
        .headersArray()
        .find((header)=>
            header.name === 'Content-Type')
        .value;

    const contentLengthHeaderValue = response
        .headersArray()
        .find((header) => header
            .name === 'Content-Length')
        .value;

    const responseText = await response.text();

    await expect(contentTypeHeaderValue).toBe(expectedContentTypeValue);
    await expect(contentLengthHeaderValue).toBe(expectedContentLength);
    await expect(responseText).toBe(expectedResponseText);

    await apiRequest.dispose();  // closed clean

    });


test('GET /users/ response data', async() => {

    const expectedContentTypeHeaderValue = "application/json; charset=utf-8";
    const expectedResponseStatusCode = 200;
    const expectedIdLength = 36;

    const userData = {
        "firstName": "John",
        "lastName": "Doe",
        "age": 35
    }

    const apiRequest = await request.newContext();

    //precondition  `${data.USERS_ENDPOINT}/`
    await expect(
        await  apiRequest.delete(`${data.USERS_ENDPOINT}/`)
    ).toBeOK();

    await expect(
        await apiRequest.post(
            `${data.USERS_ENDPOINT}/`, {
                data: userData,
            })
    ).toBeOK();

    const response = await apiRequest.get(`${data.USERS_ENDPOINT}/`);

    const statusCode = response.status();

    await expect(response).toBeOK();
    await expect(statusCode).toBe(expectedResponseStatusCode);

    const contentTypeHeaderValue =
        response
            .headersArray()
            .find((header) => header.name === 'Content-Type')
            .value;

    const responseBody = await response.json();
    console.info(responseBody);

    await expect(contentTypeHeaderValue).toBe(expectedContentTypeHeaderValue);
    await expect(Array.isArray(responseBody)).toBeTruthy();
    await expect(responseBody).toHaveLength(1);
    await expect(responseBody[0].firstName).toBe(userData.firstName);
    await expect(responseBody[0].lastName).toBe(userData.lastName);
    await expect(responseBody[0].age).toBe(userData.age);
    await expect(responseBody[0].id.length).toBe(expectedIdLength);

    await apiRequest.dispose();
})

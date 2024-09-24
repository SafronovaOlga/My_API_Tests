import {test, request, expect} from '@playwright/test'
const BASE_URL = 'http://localhost:5001';

test (' GET /', async () =>  {

    const apiRequest = await request.newContext();

    const response = await apiRequest.get(`${BASE_URL}/`);
    // (BASE_URL + "/")
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

    console.log((response));
    console.log(await response.text());

   // await expect(actualResult).assertWord.(expectedResult);
    //await expect(response).toBe(BASE_URL);
    await expect(await response.text()).toEqual("Node Express API Server")
});
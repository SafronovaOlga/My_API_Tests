import { test, expect, request } from '@playwright/test';
import { users } from "../testData/functionalTestData/usersTestData.js";
import { data } from "../testData/functionalTestData/searchFuncTestData.js";
import { HOME_PAGE_URL } from "../testData/functionalTestData/baseTestData.js";
import * as precondition from "../utils/preconditions.js";


/*
TC-SearchFun-1:
Preconditions:
1. DB is empty
2. User is on Home page
3. UsersDB contains at least 3 users

Steps:
1. Click on Search Tab
2. Fill search criteria in corresponding fields
3. Click Search button

Expected result:

*/

[
    {tcName: data._1.tcName, searchCriteria: data._1.searchCriteria, expectedCount: data._1.expectedCount, expectedUsers: data._1.expectedUsers},
    {tcName: data._2.tcName, searchCriteria: data._2.searchCriteria, expectedCount: data._2.expectedCount, expectedUsers: data._2.expectedUsers},
    {tcName: data._3.tcName, searchCriteria: data._3.searchCriteria, expectedCount: data._3.expectedCount, expectedUsers: data._3.expectedUsers},
    {tcName: data._4.tcName, searchCriteria: data._4.searchCriteria, expectedCount: data._4.expectedCount, expectedUsers: data._4.expectedUsers},
    {tcName: data._5.tcName, searchCriteria: data._5.searchCriteria, expectedCount: data._5.expectedCount, expectedUsers: data._5.expectedUsers},
    {tcName: data._6.tcName, searchCriteria: data._6.searchCriteria, expectedCount: data._6.expectedCount, expectedUsers: data._6.expectedUsers},
].forEach(({ tcName, searchCriteria, expectedCount,  expectedUsers }) => {
    console.log("!!!!!", tcName);
    test.describe('Search User Functionality', async() => {
        let apiRequest;

        test.beforeEach('Delete DB, Land on Home page, Create DB via UI', async ({ page }) => {
            //1. DB is empty via api request
            apiRequest = await request.newContext();
            await precondition.setPrecondition_DeleteUsers(apiRequest);

            //2. User is on Home page
            await page.goto(HOME_PAGE_URL);

            //3. Create UsersDB contains 4 users

        })

        test(`TC-SearchFun-1: ${tcName}`, async({ page }) => {
            console.log("Test");

        })

        test.afterEach('Close API request context', async() => {
            await apiRequest.dispose();
        })
    })
})

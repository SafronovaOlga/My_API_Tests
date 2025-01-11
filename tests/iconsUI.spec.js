import { test, expect, request } from '@playwright/test';
import * as precondition from "../utils/preconditions.js";
import { HOME_PAGE_URL } from "../testData/functionalTestData/baseTestData";
import { users } from "../testData/functionalTestData/usersTestData.js";

test.describe('Icons created when user created.', async() => {
    let apiRequest;

    test.beforeEach('ClearDB, Open HOME_URL', async ({page}) => {
        //1. DB is empty via api request
        apiRequest = await request.newContext();
        await precondition.setPrecondition_DeleteUsers(apiRequest);

        await page.goto(HOME_PAGE_URL);
    })

})
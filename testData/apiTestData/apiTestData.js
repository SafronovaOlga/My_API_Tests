export const BASE_URL = 'http://localhost:5001/api';
export const USERS_ENDPOINT = `${BASE_URL}/users`;

export const expectedHeaders = {
    ContentTypeValue: "application/json; charset=utf-8",
}

export const expectedResponseStatusCode = {
    _200: 200,

} ;
const expectedIdLength = 36;

export const expectedResponseObjectsCount = {
    _1: 1,

};

export const user = {
        firstName: "John",
        lastName: "Doe",
        age: 35
}
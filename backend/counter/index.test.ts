
import { Context, HttpRequest } from "@azure/functions"


import  httpFunction  from './index';
const con = require('../testing/defaultContext')

test('Http trigger should return known text', async () => {


    let context = ({ log: jest.fn(),bindings:{inputDocument:{id:"1",visitors:1 },outputDocument:{}}} as unknown) as Context;

        const request = {
      query: {},
      body: { name: "John" },
    };

    // Action
    await httpFunction(context, request);

    // Assertion
    expect(context.log).toBeCalledTimes(1);


});

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { CosmosClient }  from  '@azure/cosmos';

interface ContextExtended extends Context {
    bindings: {
        visitorDocument: any
    }

    Response: {
        status?: number
        body: string
    }
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));


    console.log(JSON.stringify(context.bindings.inputDocument));

    context.bindings.outputDocument=JSON.stringify({
    id:"1",
    visitors:context.bindings.inputDocument.visitors+1

    });


    context.res = {
    headers: {
      "Content-Type":"application/json"
    },	    
    body:context.bindings.outputDocument
    }

};

export default httpTrigger;

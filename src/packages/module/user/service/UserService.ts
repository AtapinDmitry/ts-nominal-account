import { Injectable } from '@nestjs/common';
import { Logger, LoggerWrapper, Transport } from '@ts-core/common';
import { Info, InfoList } from '../dto';
import fetch, { Headers, HeadersInit, Request, RequestInfo, RequestInit } from 'node-fetch';

@Injectable()
export class UserService extends LoggerWrapper {
    constructor(logger: Logger, private transport: Transport) {
        super(logger);
    }


    public async createInfo(infoData: Info): Promise<number> {
        const headers: HeadersInit = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            'X-Custom-Header': 'CustomValue'   
        });

        const request: RequestInfo = new Request (
            'http://localhost:5005/user/info',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(infoData)
            }
        );

        console.log(`Request: "${request}"`)
        const response = await fetch(request);

        const data = await response.json();
        if (response.ok) {
            const id = data as number;
            return Promise.resolve(id);
        } else {
            //const error = new Error (
            //    errors?.map((e) => e.message).join('\n') ?? 'unknown',
            //)
            const error: Error = data as Error
            return Promise.reject(error)
        }
    }

    public async getInfos(): Promise<InfoList> {
        const headers: HeadersInit = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            'X-Custom-Header': 'CustomValue'   
        });

        // Add a few headers
        //headers.set('Content-Type', 'application/json')
        //headers.set('Accept', 'application/json')
        // Add a custom header, which we can use to check
        //headers.set('X-Custom-Header', 'CustomValue')

        const request: RequestInit = new Request (
            'http://localhost:5005/user/info',
            {
                method: 'GET',
                headers: headers
            }
        );

        const response = await fetch(
            'http://localhost:5005/user/info',
            request
        );

        //const fetch = require("node-fetch");

        //const response = await fetch('http://localhost:5005/user/info',
        //    {
        //        method: 'GET',
        //        headers: {
        //            'Content-Type': 'application/json;charset=UTF-8',
        //            'Accept': 'application/json',    
        //        }
        //    }            
        //);

        console.log(response.status)

        const data = await response.json();
        if (response.ok) {
            const infoList: InfoList = data as InfoList;
            return Promise.resolve(infoList);
        } else {
            //const error = new Error (
            //    errors?.map((e) => e.message).join('\n') ?? 'unknown',
            //)
            const error: Error = data as Error;
            return Promise.reject(error)
        }
    }
}
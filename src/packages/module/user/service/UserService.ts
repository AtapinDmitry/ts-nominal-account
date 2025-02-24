import { Injectable } from '@nestjs/common';
import { Logger, LoggerWrapper, Transport } from '@ts-core/common';
import { Info, InfoList } from '../dto';

@Injectable()
export class UserService extends LoggerWrapper {
    constructor(logger: Logger, private transport: Transport) {
        super(logger);
    }

    declare infos: Map<number, Info>;
    declare key: number; 

    public createInfo(infoData: Info): number {
        this.key += 1;
        this.infos.set(this.key, infoData);
        return this.key;
    }

    public getInfos(): InfoList {
        let key: number = 0;
        let resultInfos: InfoList;
        while (key <= this.key) {
            var info: Info;
            info = this.infos.get(key);
            resultInfos.list.push(info);
        }
        
        return resultInfos;
    }
}
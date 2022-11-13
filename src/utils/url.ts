/*
 * url関連のユーティリティ
 */
import { parseDomain, ParseResultType } from "parse-domain";


function getHostName(url: string){
    const target_url = new URL(url);
    return target_url.host
}

export function getDomainNameIgnoreSubDomain(url: string){
    const hostname = getHostName(url);
    const parseResult = parseDomain(hostname);
    let domainName = undefined
    if (parseResult.type === ParseResultType.Listed) {
        const { subDomains, domain, topLevelDomains } = parseResult;
        domainName = domain
    }
    return domainName
}
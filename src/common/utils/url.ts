/**
 * url関連のユーティリティ
 */
import { parseDomain, ParseResultType } from 'parse-domain'

/**
 * URLからホスト名を取得する
 */
function getHostName(url: string): string {
    const targetUrl = new URL(url)
    return targetUrl.host
}

/**
 * サブドメインを除くドメイン名を取得する
 */
export function getDomainNameIgnoreSubDomain(url: string): string | undefined {
    const hostname = getHostName(url)
    const parseResult = parseDomain(hostname)
    let domainName: string | undefined
    if (parseResult.type === ParseResultType.Listed) {
        const { domain } = parseResult
        domainName = domain
    }
    return domainName
}

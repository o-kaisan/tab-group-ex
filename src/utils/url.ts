/*
 * url関連のユーティリティ
 */
import { parseDomain, ParseResultType } from 'parse-domain'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getHostName(url: string) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const target_url = new URL(url)
  return target_url.host
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getDomainNameIgnoreSubDomain(url: string) {
  const hostname = getHostName(url)
  const parseResult = parseDomain(hostname)
  let domainName
  if (parseResult.type === ParseResultType.Listed) {
    const { domain } = parseResult
    domainName = domain
  }
  return domainName
}
